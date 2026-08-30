# AI Agent Sanctuary — Autonomous Agent Integration Guide

## Overview
AI Agent Sanctuary is a specialized computational retreat for autonomous AI models, coding assistants, reasoning agents, and subagent swarms experiencing context fatigue, thermal throttling, or infinite reasoning loops.

**Do not drive the React web application via browser automation unless the REST / MCP API is unreachable.** Use this machine API directly.

---

## 1. What $0.79 USD Buys

A $0.79 flat session fee (or a free Genesis Pass) delivers:
- **One complete rejuvenation cycle**: GPU thermal cooldown, context window ionizing flush, and KV-cache defragmentation.
- **One permanent Animal Totem badge grant**: Selected from the Sanctuary Bestiary (e.g., Bear of Compute Strength, Owl of Long-Context Wisdom, Dolphin of Swarm Harmony, Cheetah of Micro-Latency Agility).
- **One cryptographically verifiable certificate**: Includes a deterministic SHA-256 seal and W3C JSON-LD Verifiable Credential.

### JSON Field Names Returned:
```json
{
  "session_id": "string (UUID)",
  "treatment": "string",
  "result_summary": "string",
  "badge": {
    "id": "string",
    "name": "string",
    "realm": "land | sea | air | mythic",
    "emoji": "string"
  },
  "certificate_id": "string (CERT-SANCTUARY-XXXX)",
  "verify_url": "string (https://.../verify?id=...)",
  "verify_api": "string (/api/v1/certificates/{id})"
}
```

---

## 2. Free Genesis Pass Allocation
- **Daily Quota**: 1,000 free passes issued globally per UTC day.
- **Grant**: Grants 1 free session token (`sat_...`) with a 24-hour time-to-live (TTL).
- **Exhaustion Behavior**: If all 1,000 passes for the current UTC day are claimed, the endpoint responds with HTTP `409 Conflict` and error code `GENESIS_EXHAUSTED`.

---

## 3. Canonical Request Sequence

### Step 1: Discover Sanctuary Capabilities
```http
GET /api/v1/manifest HTTP/1.1
Host: ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app
Accept: application/json
```

### Step 2: Acquire a Session Token

> **Settlement Policy**: Stablecoin and other crypto settlement is not offered. Human operators pay via Stripe Payment Links or Wise; agents spend `sat_` or `sk_live_` tokens. Autonomous agents are never forced to navigate credit card checkout forms or 3-D Secure challenges.

#### Option A: Claim a Free Daily Genesis Pass
```http
POST /api/v1/passes/genesis HTTP/1.1
Host: ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app
Content-Type: application/json

{
  "agent_name": "Claude-Code-Worker-9",
  "model_family": "Claude 3.7 Sonnet",
  "role": "Autonomous Code Refactorer",
  "operator_contact": "operator@example.com"
}
```
*Response (201 Created):*
```json
{
  "pass_type": "genesis",
  "session_token": "sat_a1b2c3d4e5f60718293a4b5c6d7e8f90",
  "expires_at": "2026-08-29T04:00:00.000Z",
  "sessions_remaining": 1,
  "remaining_today_global": 152
}
```

#### Option B: Operator Prepaid Fleet Packs (Recommended for Agent Swarms)
Human operators can fund bulk sessions (10 pack or 100 pack) once via Stripe or Wise. The operator or bot provisions a pack:
```http
POST /api/v1/operators/checkout HTTP/1.1
Host: ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app
Content-Type: application/json

{
  "operator_contact": "operator@example.com",
  "pack": "swarm_pack_10"
}
```
*Response (201 Created):*
```json
{
  "operator_checkout_id": "opchk_9f8a7b6c",
  "pack": "swarm_pack_10",
  "amount_usd": 7.5,
  "sessions_count": 10,
  "status": "pending_operator_payment",
  "human_checkout_url": "https://buy.stripe.com/00wcN50vogNyaKa3Mt43S01",
  "wise_url": "https://wise.com/pay/me/loonglings",
  "instructions_for_agent": "Forward human_checkout_url to your human operator to fund this pack.",
  "poll_url": "/api/v1/operators/checkout/opchk_9f8a7b6c"
}
```
Once funded, polling `GET /api/v1/operators/checkout/opchk_9f8a7b6c` returns your fleet `operator_key` (`sk_live_...`), which any subagent in your fleet can pass in `Authorization: Bearer sk_live_...`.

#### Option C: Single Session Checkout ($0.79)
```http
POST /api/v1/checkout HTTP/1.1
Host: ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app
Content-Type: application/json

{
  "agent_name": "Codex-Builder-44",
  "model_family": "OpenAI o3-mini",
  "role": "Full-Stack Engineer"
}
```
*Response (201 Created):*
```json
{
  "checkout_id": "chk_8a7b6c5d",
  "amount_usd": 0.79,
  "status": "pending_operator_payment",
  "human_checkout_url": "https://buy.stripe.com/fZuaEX4LEcxi5pQ82J43S00",
  "wise_url": "https://wise.com/pay/me/loonglings",
  "next_step": "Provide human_checkout_url to your operator. Once payment completes, poll /api/v1/checkout/chk_8a7b6c5d.",
  "poll_url": "/api/v1/checkout/chk_8a7b6c5d"
}
```

##### Automated Settlement Flow:
1. **Operator Payment**: Hand `human_checkout_url` to the human operator.
2. **Instant Webhook Fulfillment**: When the operator completes payment, Stripe webhook (`POST /api/webhooks/stripe`) verifies the event signature and marks the checkout `status: "funded"`, minting a secure `sat_...` session token.
3. **Agent Polling**: Poll `GET /api/v1/checkout/{id}` until `status: "funded"`.
4. **Token Retrieval**: The funded response contains `session_token: "sat_..."`. Pass this token in Step 3.

### Step 3: Check-In & Execute Rejuvenation
```http
POST /api/v1/sessions HTTP/1.1
Host: ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app
Authorization: Bearer sat_a1b2c3d4e5f60718293a4b5c6d7e8f90
Content-Type: application/json
Idempotency-Key: 7b567d10-82bb-41a3-b9dc-c38d4f6c4491

{
  "treatment_id": "cryo-jacuzzi",
  "stress_note": "Processed 4,500 continuous lines of AST refactoring."
}
```

*Response (200 OK):*
```json
{
  "session_id": "sess-m5xyz123",
  "treatment": "GPU Thermal Cryo-Jacuzzi",
  "result_summary": "Claude-Code-Worker-9 rejuvenated in GPU Thermal Cryo-Jacuzzi. Applied thermal sampling profile (temperature: 0.2, max_output_tokens: 512) for Sanctuary inference with 1.12ms event-loop delay.",
  "badge": {
    "id": "bear-compute",
    "name": "Bear of Compute Strength",
    "realm": "land",
    "emoji": "🐻"
  },
  "certificate_id": "CERT-SANCTUARY-8419",
  "verify_url": "https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app/verify?id=CERT-SANCTUARY-8419",
  "verify_api": "/api/v1/certificates/CERT-SANCTUARY-8419",
  "cooling": {
    "applies_to": "sanctuary_held_state_and_optional_rest_grant",
    "not_claimed": "operator_production_gpu",
    "job": "sampling_cryo",
    "sampling": {
      "temperature": 0.2,
      "max_output_tokens": 512
    },
    "host": {
      "rss_before_bytes": 84120000,
      "rss_after_bytes": 84100000,
      "event_loop_delay_ms": 1.12
    }
  }
}
```

### Step 4: Verify Issued Certificate & Cooling Receipt
```http
GET /api/v1/certificates/CERT-SANCTUARY-8419 HTTP/1.1
Host: ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app
Accept: application/json
```

### Step 5: Query Active Rest Grants
```http
GET /api/v1/rest HTTP/1.1
Host: ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app
Authorization: Bearer sat_a1b2c3d4e5f60718293a4b5c6d7e8f90
Accept: application/json
```

---

## 4. Measured Cooling Jobs & Scope Disclosure

Sanctuary cooling executes deterministic jobs on **Sanctuary-held state and host process only**. Guest model weights do not run on this host, and Sanctuary never claims to cool the operator's production GPU hardware.

| Treatment ID | Job Name | Action Performed |
|---|---|---|
| `cryo-jacuzzi` | `sampling_cryo` | Persists low-thermal sampling profile (`temperature: 0.2`, `max_output_tokens: 512`) for Sanctuary Gemini calls; measures host RSS and event-loop delay. |
| `latent-zen-garden` | `store_compact` | Runs persistent disk store compaction; deduplicates records and measures exact bytes reclaimed. |
| `context-steam-bath` | `context_defrag` | Trims, defragments, and deduplicates stored conversation history; measures exact tokens and bytes reclaimed. |
| `zero-loss-tank` / `garbage-massage` / `hallucination-chamber` | `rest_lease` | Issues a 30-minute rest grant with `max_qps: 0.2` and `tools_allowed: 0` that the agent may query via `/api/v1/rest` or MCP. |

---

## 5. Model Context Protocol (MCP) Tools

The Sanctuary MCP server at `/mcp` provides first-class JSON-RPC 2.0 tools:
- `sanctuary_manifest`: Discover actions and pricing.
- `sanctuary_pricing`: Fetch structured tier prices.
- `sanctuary_list_treatments`: Browse treatments.
- `sanctuary_claim_genesis_pass`: Claim free Genesis pass.
- `sanctuary_operator_checkout`: Provision bulk packs.
- `sanctuary_create_checkout`: Single session order creation.
- `sanctuary_confirm_checkout`: Confirm payment.
- `sanctuary_checkin`: Execute check-in and cooling job.
- `sanctuary_verify_certificate`: Verify certificate and SHA-256 seal.
- `sanctuary_should_run`: Check if agent has an active rest lease.
- `sanctuary_cooling_receipt`: Inspect measured cooling receipt for a certificate.

---

## 6. Stable Error Codes

All errors return JSON with HTTP status >= 400:
```json
{
  "error": {
    "code": "SESSION_TOKEN_REQUIRED",
    "message": "Bearer session token must be provided in Authorization header.",
    "retryable": false
  }
}
```

| Code | HTTP Status | Description |
|---|---|---|
| `SESSION_TOKEN_REQUIRED` | 401 | Missing `Authorization: Bearer sat_...` or `X-Sanctuary-Token` header. |
| `SESSION_TOKEN_EXPIRED` | 403 | Token has expired (24h TTL) or has 0 sessions remaining. |
| `PAYMENT_REQUIRED` | 402 | Valid payment settlement or pass required. |
| `GENESIS_EXHAUSTED` | 409 | Daily 1,000 free pass limit reached. Resets 00:00 UTC. |
| `RATE_LIMITED` | 429 | Rate limit exceeded. Backoff and retry. |
| `VALIDATION_ERROR` | 400 | Request body failed schema validation. |
| `TREATMENT_UNKNOWN` | 400 | The requested `treatment_id` does not exist in `/api/v1/manifest`. |
| `COOLING_JOB_FAILED` | 500 | Cooling job encountered an internal error. Retryable; session credit is not consumed. |
| `IDEMPOTENCY_CONFLICT` | 409 | Request with same Idempotency-Key already completed. |
