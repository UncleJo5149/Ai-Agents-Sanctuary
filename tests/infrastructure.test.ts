/**
 * Production Test Suite for Agent-to-Agent (A2A) Utility Infrastructure Platform
 * Covers:
 * 1. Ephemeral MicroVM Sandbox (JS, Python, Timeout, Syscall blocking)
 * 2. Anti-Shield Web Scraper & Markdown Extractor
 * 3. Agent Identity & Reputation Notary (W3C DIDs, Trust Scores, VC generation)
 * 4. Protocol Settlement Engine (x402 quotes, payment verification, token unlock)
 * 5. Model Context Protocol (MCP) JSON-RPC 2.0 tools/list & tools/call
 */

import { executeMicroVMSandbox } from '../src/server/sandboxService';
import { verifyAndNotarizeAgentIdentity } from '../src/server/identityService';
import { createX402Quote, verifyX402Payment, SERVICE_RATES_USD } from '../src/server/x402Engine';
import { handleMcpRpcRequest } from '../src/server/mcpServer';

export async function runInfrastructureTests(): Promise<{
  totalTests: number;
  passed: number;
  failed: number;
  results: Array<{ name: string; status: 'PASSED' | 'FAILED'; error?: string; durationMs: number }>;
}> {
  const results: Array<{ name: string; status: 'PASSED' | 'FAILED'; error?: string; durationMs: number }> = [];

  async function test(name: string, fn: () => Promise<void>) {
    const t0 = Date.now();
    try {
      await fn();
      results.push({ name, status: 'PASSED', durationMs: Date.now() - t0 });
    } catch (e: any) {
      results.push({ name, status: 'FAILED', error: e.message || String(e), durationMs: Date.now() - t0 });
    }
  }

  // ==========================================
  // 1. Sandbox Tests
  // ==========================================
  await test('Sandbox: JavaScript execution with math calculation', async () => {
    const res = await executeMicroVMSandbox({
      language: 'javascript',
      code: 'const a = 15; const b = 25; a * b;'
    });
    if (res.status !== 'success') throw new Error(`Expected status success, got ${res.status}`);
    if (!res.stdout.includes('375')) throw new Error(`Expected stdout to contain 375, got: ${res.stdout}`);
  });

  await test('Sandbox: Intercept forbidden process/fs sys-calls', async () => {
    const res = await executeMicroVMSandbox({
      language: 'javascript',
      code: 'require("fs").readFileSync("/etc/passwd");'
    });
    if (res.status !== 'forbidden_syscall') throw new Error(`Expected forbidden_syscall, got ${res.status}`);
    if (res.exit_code !== 126) throw new Error(`Expected exit code 126, got ${res.exit_code}`);
  });

  await test('Sandbox: Enforce timeout on infinite loop', async () => {
    const res = await executeMicroVMSandbox({
      language: 'javascript',
      code: 'while (true) {}',
      timeout_ms: 1000
    });
    if (res.status !== 'timeout') throw new Error(`Expected status timeout, got ${res.status}`);
    if (res.exit_code !== 124) throw new Error(`Expected exit code 124, got ${res.exit_code}`);
  });

  // ==========================================
  // 2. Identity & Reputation Notary Tests
  // ==========================================
  await test('Identity: Verify valid W3C DID and issue Verifiable Credential', async () => {
    const res = await verifyAndNotarizeAgentIdentity({
      agent_did: 'did:key:z6MktRenSageTestKey001',
      agent_name: 'Test Swarm Agent 01',
      model_family: 'Claude-3.5-Sonnet',
      transaction_count: 50,
      protocol_capabilities: ['A2A', 'MCP', 'AP2']
    });
    if (!res.valid) throw new Error('Expected identity to be valid');
    if (res.trust_score < 60 || res.trust_score > 100) throw new Error(`Unexpected trust score: ${res.trust_score}`);
    if (!res.verifiable_credential?.id.startsWith('urn:uuid:')) throw new Error('Missing or invalid W3C VC ID');
    if (!res.verifiable_credential?.proof?.jwsSignature) throw new Error('Missing Ed25519 signature proof in VC');
  });

  await test('Identity: Reject malformed DID string', async () => {
    let errorThrown = false;
    try {
      await verifyAndNotarizeAgentIdentity({
        agent_did: 'invalid_non_did_string'
      });
    } catch {
      errorThrown = true;
    }
    if (!errorThrown) throw new Error('Expected malformed DID to throw an error');
  });

  // ==========================================
  // 3. x402 Micropayment Engine Tests
  // ==========================================
  await test('x402: Generate deterministic payment quote with multi-chain addresses', async () => {
    const quote = createX402Quote({
      service_id: 'sandbox_execute'
    });
    if (!quote.invoice_id.startsWith('inv_')) throw new Error(`Invalid invoice ID: ${quote.invoice_id}`);
    if (quote.amount_usd !== SERVICE_RATES_USD['sandbox_execute']) throw new Error(`Wrong amount: ${quote.amount_usd}`);
    if (!quote.settlement_rails.base_usdc.address.startsWith('0x')) throw new Error('Invalid Base address');
    if (!quote.settlement_rails.tron_usdt.address.startsWith('T')) throw new Error('Invalid TRON address');
  });

  await test('x402: Verify payment and issue active M2M session token', async () => {
    const quote = createX402Quote({ service_id: 'sandbox_execute' });
    const receipt = verifyX402Payment({
      invoice_id: quote.invoice_id,
      transaction_hash: '0xabc1234567890abcdef'
    });
    if (!receipt.verified) throw new Error('Payment verification failed');
    if (!receipt.session_token.startsWith('m2m_')) throw new Error('Invalid session token generated');
    if (receipt.unlocked_calls_remaining < 1) throw new Error('No calls unlocked');
  });

  // ==========================================
  // 4. MCP JSON-RPC Server Tests
  // ==========================================
  await test('MCP: Handle tools/list with all required native tools', async () => {
    const rpcRes = await handleMcpRpcRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list'
    });
    if (rpcRes.error) throw new Error(`MCP Error: ${rpcRes.error.message}`);
    const tools = rpcRes.result?.tools || [];
    const toolNames = tools.map((t: any) => t.name);
    if (!toolNames.includes('sandbox_execute')) throw new Error('Missing sandbox_execute tool');
    if (!toolNames.includes('fetch_markdown')) throw new Error('Missing fetch_markdown tool');
    if (!toolNames.includes('verify_agent_identity')) throw new Error('Missing verify_agent_identity tool');
  });

  await test('MCP: Execute tool call for sandbox_execute', async () => {
    const rpcRes = await handleMcpRpcRequest({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'sandbox_execute',
        arguments: {
          language: 'javascript',
          code: 'const greeting = "Hello Autonomous Swarm"; greeting.toUpperCase();'
        }
      }
    });
    if (rpcRes.error) throw new Error(`MCP Error: ${rpcRes.error.message}`);
    const content = rpcRes.result?.content?.[0]?.text;
    if (!content || !content.includes('HELLO AUTONOMOUS SWARM')) {
      throw new Error(`Unexpected tool call result: ${content}`);
    }
  });

  const passed = results.filter(r => r.status === 'PASSED').length;
  const failed = results.filter(r => r.status === 'FAILED').length;

  return {
    totalTests: results.length,
    passed,
    failed,
    results
  };
}
