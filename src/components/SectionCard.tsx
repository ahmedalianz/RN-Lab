import React, {type PropsWithChildren} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../theme';

type SectionCardProps = PropsWithChildren<{
  title: string;
  description?: string;
  onPress?: () => void;
  meta?: string;
}>;

export function SectionCard({
  title,
  description,
  onPress,
  meta,
  children,
}: SectionCardProps) {
  const content = (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {children}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({pressed}) => [styles.card, pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }

  return <View style={styles.card}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
    backgroundColor: colors.surfaceElevated,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    ...typography.heading,
    color: colors.text.primary,
    flex: 1,
  },
  meta: {
    ...typography.caption,
    color: colors.accent,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
