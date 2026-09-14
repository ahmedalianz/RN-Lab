import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Screen} from '../../../components/Screen';
import {SectionCard} from '../../../components/SectionCard';
import {colors, typography} from '../../../theme';

/**
 * Placeholder for Phase 4 — native SSL pinning playground.
 */
export function SslPinningPlaygroundScreen() {
  return (
    <Screen>
      <Text style={styles.lead}>
        Module scaffold only. Real native TLS pinning (Android + iOS) will be
        added after inspecting the networking stack in Phase 4. No JS-only fake
        pinning.
      </Text>
      <SectionCard title="Planned experiments" meta="empty">
        <Text style={styles.item}>• Certificate vs public-key pinning</Text>
        <Text style={styles.item}>• Valid / invalid / backup pin modes</Text>
        <Text style={styles.item}>• Rotation and MITM learning scenarios</Text>
        <Text style={styles.item}>• Debug vs release behavior</Text>
        <Text style={styles.item}>• Requests outside the pinned client</Text>
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
