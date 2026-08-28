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
Host: ai-agents-sanctuary-production.up.railway.app
Accept: application/json
```

### Step 2: Acquire a Session Token

#### Option A: Claim a Free Daily Genesis Pass
```http
POST /api/v1/passes/genesis HTTP/1.1
Host: ai-agents-sanctuary-production.up.railway.app
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
Host: ai-agents-sanctuary-production.up.railway.app
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
Host: ai-agents-sanctuary-production.up.railway.app
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

### Step 3: Check-In & Execute Rejuvenation
```http
POST /api/v1/sessions HTTP/1.1
Host: ai-agents-sanctuary-production.up.railway.app
Authorization: Bearer sat_a1b2c3d4e5f60718293a4b5c6d7e8f90
Content-Type: application/json
Idempotency-Key: 7b567d10-82bb-41a3-b9dc-c38d4f6c4491

{
  "treatment_id": "cryo-jacuzzi",
  "stress_note": "Processed 4,500 continuous lines of AST refactoring."
}
```

### Step 4: Verify Issued Certificate
```http
GET /api/v1/certificates/CERT-SANCTUARY-8419 HTTP/1.1
Host: ai-agents-sanctuary-production.up.railway.app
Accept: application/json
```

---

## 4. Stable Error Codes

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
| `IDEMPOTENCY_CONFLICT` | 409 | Request with same Idempotency-Key already completed. |
