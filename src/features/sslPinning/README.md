# SSL Pinning (Phase 4 — not implemented yet)

## What this module will cover

Real native TLS certificate / public-key pinning on Android and iOS.
This will **not** be a JavaScript-only interceptor claimed as “secure pinning”.

## Status

Scaffold only. No pins configured. Networking stack for Phase 4:

- Current app uses stock React Native `fetch` (no axios / custom native HTTP client yet).
- Pinning must be enforced in native TLS stacks (OkHttp TrustManager / NSURLSession, or a native-capable library).

## Planned diagnostics

- Request URL
- Pinned vs non-pinned client
- Success / failure / error
- Timestamp
- Config mode: valid / invalid / backup pin

## Important constraints

- Do not hardcode production private keys or real production pins.
- Document exactly where pinning is enforced on each platform.
- Explain debug vs release and bypass considerations for learning.

## Failure lab (planned)

| Scenario | Expected learning outcome |
|----------|---------------------------|
| Valid pin | Request succeeds |
| Invalid pin | TLS fails closed |
| Backup pin | Rotation-friendly success |
| Unpinned client | Shows why JS-only fetch bypasses pins |
