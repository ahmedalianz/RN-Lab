# Diagnostics

## What this module does

Central runtime snapshot and structured event log for the playground.

Shows:

- React Native version, platform, OS version
- App state
- Navigation readiness
- Push / deep-link / SSL stubs (filled in by later phases)
- Ring-buffered structured logs from `src/services/logging`

## Log shape

```json
{
  "timestamp": "2026-09-14T18:00:00.000Z",
  "module": "deep-linking",
  "event": "INITIAL_URL_RECEIVED",
  "payload": "myapp://orders/123",
  "appState": "background",
  "result": "queued"
}
```

## How modules should integrate

1. Call `logEvent(...)` for every meaningful lifecycle event.
2. Update `diagnosticsStore` for durable status fields (token, pin mode, queue size).
3. Keep UI free of business logic — screens only subscribe and render.
