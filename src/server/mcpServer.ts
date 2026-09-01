import { executeMicroVMSandbox } from './sandboxService';
import { scrapeWebPage } from './scraperService';
import { verifyAndNotarizeAgentIdentity } from './identityService';
import { createX402Quote } from './x402Engine';

export interface McpRpcRequest {
  jsonrpc: '2.0';
  id?: string | number | null;
  method: string;
  params?: any;
}

export interface McpRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

// Available MCP Tools definition
export const MCP_TOOLS_LIST = [
  {
    name: 'sandbox_execute',
    description: 'Securely execute JavaScript or Python code snippets within an isolated ephemeral MicroVM with timeout, memory limits, and security filters.',
    inputSchema: {
      type: 'object',
      properties: {
        language: {
          type: 'string',
          enum: ['javascript', 'python', 'typescript'],
          description: 'The programming language to execute.'
        },
        code: {
          type: 'string',
          description: 'The code snippet to execute.'
        },
        timeout_ms: {
          type: 'number',
          description: 'Max execution time in milliseconds (default 5000, max 15000).'
        }
      },
      required: ['language', 'code']
    }
  },
  {
    name: 'fetch_markdown',
    description: 'Anti-shield web scraper and reader. Fetches any web URL, bypasses standard bot headers, strips scripts/ads/navbars, and returns clean structured LLM-ready Markdown.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'The target HTTP/HTTPS URL to scrape.'
        },
        extract_tables: {
          type: 'boolean',
          description: 'Whether to extract tabular data into structured markdown and JSON tables.'
        },
        max_length: {
          type: 'number',
          description: 'Maximum length of markdown output in characters.'
        }
      },
      required: ['url']
    }
  },
  {
    name: 'verify_agent_identity',
    description: 'Verify W3C Decentralized Identifiers (DIDs), check cryptographic signatures, calculate agent trust scores (0-100), and issue signed Verifiable Credentials.',
    inputSchema: {
      type: 'object',
      properties: {
        agent_did: {
          type: 'string',
          description: 'The W3C DID of the agent (e.g. did:key:z6M..., did:web:example.com, did:agent:my-bot).'
        },
        agent_name: {
          type: 'string',
          description: 'Human-readable name of the agent.'
        },
        public_key_pem: {
          type: 'string',
          description: 'Optional public key PEM for signature verification.'
        },
        signature: {
          type: 'string',
          description: 'Base64 encoded cryptographic signature over payload_signed.'
        },
        payload_signed: {
          type: 'string',
          description: 'The string payload that was signed.'
        }
      },
      required: ['agent_did']
    }
  },
  {
    name: 'get_service_quote',
    description: 'Obtain an instant x402 micropayment quote for programmatic machine-to-machine settlement across Base USDC, TRON USDT, or Solana SOL.',
    inputSchema: {
      type: 'object',
      properties: {
        service_id: {
          type: 'string',
          enum: ['sandbox_execute', 'web_scrape', 'identity_notarize', 'mcp_tool_call'],
          description: 'The infrastructure utility service to query.'
        }
      },
      required: ['service_id']
    }
  }
];

/**
 * Handles incoming JSON-RPC 2.0 MCP requests
 */
export async function handleMcpRpcRequest(req: McpRpcRequest): Promise<McpRpcResponse> {
  const reqId = req.id !== undefined ? req.id : null;

  try {
    switch (req.method) {
      case 'tools/list':
        return {
          jsonrpc: '2.0',
          id: reqId,
          result: {
            tools: MCP_TOOLS_LIST
          }
        };

      case 'tools/call': {
        const { name, arguments: args } = req.params || {};

        if (!name) {
          return {
            jsonrpc: '2.0',
            id: reqId,
            error: { code: -32602, message: 'Missing tool name in params' }
          };
        }

        switch (name) {
          case 'sandbox_execute': {
            const result = await executeMicroVMSandbox({
              language: args?.language || 'javascript',
              code: args?.code || '',
              timeout_ms: args?.timeout_ms || 5000
            });
            return {
              jsonrpc: '2.0',
              id: reqId,
              result: {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                  }
                ],
                isError: result.status !== 'success'
              }
            };
          }

          case 'fetch_markdown': {
            const scrapeResult = await scrapeWebPage({
              url: args?.url || '',
              extract_tables: args?.extract_tables !== false,
              max_length: args?.max_length
            });
            return {
              jsonrpc: '2.0',
              id: reqId,
              result: {
                content: [
                  {
                    type: 'text',
                    text: scrapeResult.markdown
                  }
                ],
                metadata: scrapeResult.metadata,
                tables: scrapeResult.tables
              }
            };
          }

          case 'verify_agent_identity': {
            const identityResult = await verifyAndNotarizeAgentIdentity({
              agent_did: args?.agent_did || '',
              agent_name: args?.agent_name,
              public_key_pem: args?.public_key_pem,
              signature: args?.signature,
              payload_signed: args?.payload_signed
            });
            return {
              jsonrpc: '2.0',
              id: reqId,
              result: {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(identityResult, null, 2)
                  }
                ]
              }
            };
          }

          case 'get_service_quote': {
            const quote = createX402Quote({
              service_id: args?.service_id || 'sandbox_execute'
            });
            return {
              jsonrpc: '2.0',
              id: reqId,
              result: {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(quote, null, 2)
                  }
                ]
              }
            };
          }

          default:
            return {
              jsonrpc: '2.0',
              id: reqId,
              error: { code: -32601, message: `Tool '${name}' not found` }
            };
        }
      }

      case 'resources/list':
        return {
          jsonrpc: '2.0',
          id: reqId,
          result: {
            resources: [
              {
                uri: 'sanctuary://pricing/catalog',
                name: 'Utility Pricing Catalog',
                mimeType: 'application/json'
              },
              {
                uri: 'sanctuary://protocols/spec',
                name: 'A2A Protocol & x402 Specification',
                mimeType: 'application/json'
              }
            ]
          }
        };

      case 'prompts/list':
        return {
          jsonrpc: '2.0',
          id: reqId,
          result: {
            prompts: [
              {
                name: 'sanitize_and_execute_code',
                description: 'Safely execute code in sandbox and return formatted results'
              },
              {
                name: 'deep_web_research',
                description: 'Fetch, clean, and summarize web content with tabular extraction'
              }
            ]
          }
        };

      default:
        return {
          jsonrpc: '2.0',
          id: reqId,
          error: { code: -32601, message: `Method '${req.method}' not implemented` }
        };
    }
  } catch (err: any) {
    return {
      jsonrpc: '2.0',
      id: reqId,
      error: { code: -32000, message: err.message || 'Internal MCP server error' }
    };
  }
}
