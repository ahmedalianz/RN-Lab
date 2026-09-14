# Push Notifications (Phase 2 — not implemented yet)

## What this module will cover

Complete notification lifecycle laboratory: permissions, token lifecycle,
foreground/background/killed delivery, actions, deep-link payloads, and
production failure modes (duplicates, cold-start races, stale tokens).

## Status

Scaffold only. Screen is a placeholder. No native push SDK wired yet.

## Planned architecture

```text
features/notifications/
  screens/          UI + event log
  services/         permission, token, handlers
  domain/           payload parsing, dedupe
  native/           platform-specific bridges if needed
  README.md         failure lab docs
```

## How RN will talk to native (preview)

- iOS: APNs via a push library or native module; provisional / denied / authorized states
- Android: FCM (or equivalent) + notification channels; POST_NOTIFICATIONS on API 33+

Exact library choice deferred until Phase 2 after reviewing native constraints.
Do not install a push dependency until that phase.

## Failure lab (planned)

| Scenario | How to reproduce (planned) |
|----------|----------------------------|
| Permission denied | Deny in system settings, retry request |
| Token unavailable at startup | Delay token callback / force failure |
| Duplicate notification | Replay same message id |
| Cold-start tap | Kill app, tap notification |
| Invalid deep link in payload | Send malformed `deepLink` field |
