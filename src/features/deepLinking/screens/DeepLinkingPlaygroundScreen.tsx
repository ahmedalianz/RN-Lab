import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Screen} from '../../../components/Screen';
import {SectionCard} from '../../../components/SectionCard';
import {colors, typography} from '../../../theme';

/**
 * Placeholder for Phase 3 — Deep Linking playground.
 */
export function DeepLinkingPlaygroundScreen() {
  return (
    <Screen>
      <Text style={styles.lead}>
        Module scaffold only. Centralized URL normalize → validate → parse →
        authorize → navigate pipeline lands in Phase 3.
      </Text>
      <SectionCard title="Planned experiments" meta="empty">
        <Text style={styles.item}>• Custom scheme / Universal Links / App Links</Text>
        <Text style={styles.item}>• Cold start + navigation-not-ready queue</Text>
        <Text style={styles.item}>• Nested routes + query/path params</Text>
        <Text style={styles.item}>• Unauthorized / not-found / malformed</Text>
        <Text style={styles.item}>• Shared resolver for notification payloads</Text>
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  lead: {
    ...typography.body,
    color: colors.text.secondary,
  },
  item: {
    ...typography.body,
    color: colors.text.primary,
  },
});
