# Deep Linking (Phase 3 — not implemented yet)

## What this module will cover

Custom URL scheme, iOS Universal Links, Android App Links, nested routes,
query/path params, auth gates, and a queue for links that arrive before
navigation is ready.

## Status

Scaffold only. Shared resolver and buffering are not implemented yet.

## Planned pipeline

```text
Incoming URL
  → normalize
  → validate
  → parse
  → authorize
  → navigation resolution
  → navigate (or queue)
```

Notification payloads will reuse the same resolver.

## Example URLs (planned)

- `myapp://home`
- `myapp://orders/123`
- `myapp://orders/123?source=email`
- `myapp://profile/456`

## Failure lab (planned)

| Scenario | How to reproduce (planned) |
|----------|----------------------------|
| Navigation not ready | Emit URL before `onReady` |
| Malformed URL | `myapp://%%%` |
| Duplicate URL | Fire same Linking event twice |
| Auth failure | Open protected route while logged out |
| Unsupported route | `myapp://nope` |
