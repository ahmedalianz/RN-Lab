import {useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CatalogRow, Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {labDomains} from '../../data/catalog';
import {colors, radii, spacing} from '../../theme';
import type {RootStackParamList} from '../../navigation/types';

type Hit = {
  title: string;
  subtitle: string;
  route: string;
  accent: string;
  moduleId?: string;
};

export function GlobalSearchScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all: Hit[] = labDomains.flatMap(domain =>
      domain.items.map(item => ({
        title: item.title,
        subtitle: `${domain.title} · ${item.subtitle}`,
        route: item.route,
        accent: domain.accent,
        moduleId:
          item.route === 'NativeModuleDetails' ? item.id : undefined,
      })),
    );

    if (!q) {
      return all.slice(0, 12);
    }

    return all.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <Screen>
      <Text variant="headlineSm">Global Search</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search labs, modules, experiments…"
        placeholderTextColor={colors.outline}
        autoFocus
        style={styles.input}
      />
      <View style={styles.list}>
        {hits.map(hit => (
          <CatalogRow
            key={`${hit.route}-${hit.moduleId ?? hit.title}`}
            title={hit.title}
            subtitle={hit.subtitle}
            accentColor={hit.accent}
            onPress={() => {
              navigation.navigate('Main', {
                screen: 'LabsTab',
                params: {
                  screen: hit.route,
                  params: hit.moduleId
                    ? {moduleId: hit.moduleId}
                    : undefined,
                } as never,
              });
            }}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    backgroundColor: colors.surfaceContainer,
    color: colors.onSurface,
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.sm,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  list: {
    gap: spacing.sm,
  },
});
