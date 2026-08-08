import {useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Search} from 'lucide-react-native';
import {AppHeader} from '../../components/AppHeader';
import {Icon} from '../../components/Icon';
import {ExperimentCard, FilterChip} from '../../components/LabUI';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {
  buildExperimentRows,
  EXPERIMENT_FILTERS,
  filterExperimentRows,
  type ExperimentFilterId,
} from '../../data/experimentList';
import type {ExperimentsStackParamList} from '../../navigation/types';
import {colors, radii, spacing} from '../../theme';

export function ExperimentsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ExperimentsStackParamList>>();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ExperimentFilterId>('all');
  const allRows = useMemo(() => buildExperimentRows(), []);

  const rows = useMemo(
    () => filterExperimentRows(allRows, filter, query),
    [allRows, filter, query],
  );

  return (
    <View style={styles.root}>
      <AppHeader
        showSearch={false}
        onSettingsPress={() =>
          navigation.getParent()?.getParent()?.navigate('Settings' as never)
        }
      />
      <Screen contentStyle={styles.content}>
        <Text variant="headlineMd">Experiments</Text>

        <View style={styles.search}>
          <Icon icon={Search} size={16} color={colors.outline} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search experiments..."
            placeholderTextColor={colors.outline}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.chips}>
          {EXPERIMENT_FILTERS.map(item => (
            <FilterChip
              key={item.id}
              label={item.label}
              active={filter === item.id}
              onPress={() => setFilter(item.id)}
            />
          ))}
        </View>

        {rows.map(row => (
          <ExperimentCard
            key={row.id}
            category={row.category}
            title={row.title}
            description={row.description}
            accentColor={row.accent}
            status={row.status}
            footer={row.footer}
            onPress={() => {
              if (row.filter === 'javascript' || row.filter === 'react') {
                navigation.navigate('ExperimentDetails', {
                  experimentId: row.id,
                });
                return;
              }
              navigation.getParent()?.navigate('LabsTab', {
                screen: row.route,
              } as never);
            }}
          />
        ))}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.containerPadding,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: colors.onSurface,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    padding: 0,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
