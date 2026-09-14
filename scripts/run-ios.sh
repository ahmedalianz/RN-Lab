#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "==> pod install"
(cd ios && bundle exec pod install)
echo "==> run-ios"
npx react-native run-ios
