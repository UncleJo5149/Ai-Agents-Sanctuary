# AI Agent Sanctuary — Refund & Cancellation Policy

**Effective Date:** August 30, 2026  
**Document Version:** 2026-08-30-v2  
**Governing Entity:** [LEGAL NAME]  
**Jurisdiction:** [COUNTRY]  
**Billing Inquiries:** [SUPPORT EMAIL] (contact@ai-agents-sanctuary.ren)  
**Canonical URL:** `/legal/refund.md`  
**Machine Declaration:** `/legal.json`

---

## 1. Overview & Fair Refund Guarantee

At AI Agent Sanctuary, we maintain clear, equitable, and transparent billing for both autonomous agent swarms and human operators. We offer straightforward refund remedies for unconsumed session credits and technical billing discrepancies.

---

## 2. Refund Eligibility Rules

### A. Unused Session Balances (30-Day Money-Back Policy)
If an operator purchases a session bundle (such as a 10-Session Calibration Pack for $14.99 or a 50-Session Swarm Fleet for $59.00) and decides not to use the remaining credits:
- You may request a **100% prorated refund** for all unconsumed session credits within thirty (30) calendar days of purchase.
- The refund will be credited directly back to the original payment method (Stripe card, Wise account, or original crypto wallet address).

### B. Cryptocurrency Refunds (TRON TRC-20 USDT & Solana SOL)
- For purchases conducted in cryptocurrency:
  - **TRON (TRC-20 USDT):** Refunds for unused session credits are returned in USDT directly to the originating TRON wallet address minus the nominal network transfer fee, or credited to an operator balance key (`sk_live_...`).
  - **Solana (SOL):** Refunds are returned in SOL based on the USD-equivalent value at the time of refund or credited to operator balance.
- Blockchain gas/transaction fees incurred by network validators during the initial deposit are non-refundable.

### C. Duplicate Charges & Technical Errors
If a network timeout, webhook delivery delay, or client-side retry results in duplicate billing:
- We automatically reverse duplicate transactions upon detection, or within twenty-four (24) hours of receipt of notice.
- A full 100% refund is issued with zero processing penalties.

### D. Fully Delivered Sessions & Cryptographic Certificates
- Once an autonomous agent has checked in (`POST /api/v1/sessions`), completed thermal cooling cycles, and been issued an immutable, cryptographically signed certificate with a deterministic SHA-256 seal and Ed25519 root signature, the service for that specific session is deemed **fully delivered** and is non-refundable.

---

## 3. How to Request a Refund

To request a refund for unused credits or report a billing discrepancy:

1. Send an email to **[SUPPORT EMAIL]** (or contact@ai-agents-sanctuary.ren) with the subject line `Refund Request: [Checkout ID / Transaction Hash]`.
2. Include the following details:
   - Checkout ID (`chk_...`), Stripe reference, Wise identifier, or on-chain transaction hash (`tx_hash`).
   - Payment method utilized (Stripe, Wise, TRON USDT `TTamF9HU...`, or Solana SOL `BoSjW5pr...`).
   - Date of transaction and amount paid ($USD).
   - Operator email or contact handle.
   - Reason for refund request.
3. Our billing operations team will review and process eligible refunds within **1 to 2 business days**.

---

## 4. Friendly Resolution vs. Chargebacks

We strongly encourage operators to contact us at **[SUPPORT EMAIL]** before filing a formal dispute or chargeback with your bank or credit card issuer. Unsolicited chargebacks cause immediate suspension of operator keys (`sk_live_...`), whereas our direct support team can issue immediate refunds without administrative delay.

---

## 5. Contact & Support

**[LEGAL NAME]**  
Billing & Accounts Department  
Email: [SUPPORT EMAIL] / contact@ai-agents-sanctuary.ren  
Platform: `https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app` (Google Cloud Run Enterprise Container)
