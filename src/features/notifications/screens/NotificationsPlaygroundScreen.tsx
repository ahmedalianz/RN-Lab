import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Screen} from '../../../components/Screen';
import {SectionCard} from '../../../components/SectionCard';
import {colors, typography} from '../../../theme';

/**
 * Placeholder for Phase 2 — Push Notifications playground.
 * Implementation intentionally deferred until the shell is verified.
 */
export function NotificationsPlaygroundScreen() {
  return (
    <Screen>
      <Text style={styles.lead}>
        Module scaffold only. Permissions, token lifecycle, delivery states,
        and the Notification Event Log land in Phase 2.
      </Text>
      <SectionCard title="Planned experiments" meta="empty">
        <Text style={styles.item}>• Permission request / denied / provisional</Text>
        <Text style={styles.item}>• APNs vs FCM token lifecycle</Text>
        <Text style={styles.item}>• Foreground / background / killed</Text>
        <Text style={styles.item}>• Data + deep-link payloads</Text>
        <Text style={styles.item}>• Duplicate / cold-start race labs</Text>
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
