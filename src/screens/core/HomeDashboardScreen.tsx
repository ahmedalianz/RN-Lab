import {StyleSheet, View} from 'react-native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {LucideIcon} from 'lucide-react-native';
import {
  Gauge,
  Play,
  Search,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react-native';
import {AppHeader} from '../../components/AppHeader';
import {Icon} from '../../components/Icon';
import {
  ExperimentCard,
  LabButton,
  MetricCard,
  TerminalLog,
} from '../../components/LabUI';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {navigateToRoute} from '../../navigation/navigate';
import type {
  HomeStackParamList,
  MainTabParamList,
  RootStackParamList,
} from '../../navigation/types';
import {categoryColors, colors, fonts, radii, spacing} from '../../theme';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'HomeDashboard'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

type KnowledgeItem = {
  title: string;
  items: string;
  color: string;
  icon?: LucideIcon;
  label?: string;
};

const KNOWLEDGE: KnowledgeItem[] = [
  {
    title: 'React Core',
    items: '12 items',
    color: categoryColors.knowledge.reactCore,
    label: 'JS',
  },
  {
    title: 'Native',
    items: '18 items',
    color: categoryColors.knowledge.native,
    icon: Smartphone,
  },
  {
    title: 'Security',
    items: '6 items',
    color: categoryColors.knowledge.security,
    icon: Shield,
  },
  {
    title: 'Performance',
    items: '4 items',
    color: categoryColors.knowledge.performance,
    icon: Gauge,
  },
];

export function HomeDashboardScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.root}>
      <AppHeader
        onSearchPress={() => navigation.navigate('GlobalSearch')}
        onSettingsPress={() => navigateToRoute(navigation, 'Settings')}
      />
      <Screen contentStyle={styles.content}>
        <View style={styles.hero}>
          <Text variant="headlineMd">Understand what happens underneath.</Text>
          <Text variant="bodyMd" color={colors.onSurfaceVariant}>
            Mobile Engineering Lab Dashboard
          </Text>
        </View>

        <View style={styles.grid}>
          <MetricCard
            label="Experiments"
            value="42"
            accent={categoryColors.experiments}
            onPress={() => navigateToRoute(navigation, 'ExperimentsTab')}
          />
          <MetricCard
            label="Native Modules"
            value="18"
            accent={categoryColors.native}
            valueColor={categoryColors.native}
            onPress={() => navigateToRoute(navigation, 'LabsTab')}
          />
          <MetricCard
            label="Hardware APIs"
            value="7"
            accent={categoryColors.hardware}
            valueColor={categoryColors.hardware}
            onPress={() => navigateToRoute(navigation, 'LabsTab')}
          />
          <MetricCard
            label="Security Labs"
            value="6"
            accent={categoryColors.security}
            valueColor={categoryColors.security}
            onPress={() => navigateToRoute(navigation, 'LabsTab')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Icon icon={Zap} size={16} color={colors.primaryFixedDim} />
          <Text variant="bodyLg">Active Sessions</Text>
        </View>

        <ExperimentCard
          variant="session"
          category="SECURITY"
          title="SSL Certificate Pinning"
          accentColor={categoryColors.security}
          status="practicing"
          progress={65}
          onPress={() => navigateToRoute(navigation, 'LabsTab')}
        />
        <ExperimentCard
          variant="session"
          category="ARCHITECTURE"
          title="TurboModules"
          accentColor={categoryColors.architecture}
          status="not_started"
          progress={30}
          onPress={() => navigateToRoute(navigation, 'LabsTab')}
        />

        <Text variant="bodyLg" color={colors.onSurfaceVariant}>
          Knowledge Base
        </Text>
        <View style={styles.grid}>
          {KNOWLEDGE.map(item => (
            <View key={item.title} style={styles.knowledgeCard}>
              <View style={styles.knowledgeHeader}>
                {item.label ? (
                  <Text
                    variant="headlineSm"
                    color={item.color}
                    style={styles.jsGlyph}>
                    {item.label}
                  </Text>
                ) : item.icon ? (
                  <Icon icon={item.icon} size={22} color={item.color} />
                ) : null}
                <Text variant="labelCaps" color={colors.outline}>
                  {item.title}
                </Text>
              </View>
              <Text variant="metricDisplay" color={item.color} style={styles.knowledgeCount}>
                {item.items.replace(' items', '')}
              </Text>
              <View style={[styles.accentBar, {backgroundColor: item.color}]} />
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <View style={styles.actionSlot}>
            <LabButton
              label="Run Experiment"
              icon={<Icon icon={Play} size={14} color={colors.onPrimary} />}
              onPress={() => navigateToRoute(navigation, 'ExperimentsTab')}
            />
          </View>
          <View style={styles.actionSlot}>
            <LabButton
              label="Search Reference"
              icon={
                <Icon icon={Search} size={14} color={colors.onSurfaceVariant} />
              }
              variant="secondary"
              onPress={() => navigateToRoute(navigation, 'ReferenceTab')}
            />
          </View>
        </View>

        <TerminalLog
          title="// SYSTEM LOG"
          lines={[
            {
              time: '14:02:45',
              level: 'INFO',
              message: 'System diagnostic complete. All modules loaded.',
            },
            {
              time: '14:02:48',
              level: 'WARN',
              message: 'JSI binding overhead detected in rendering loop.',
            },
          ]}
        />
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
  hero: {
    gap: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  knowledgeCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
    overflow: 'hidden',
    minHeight: 100,
  },
  knowledgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  knowledgeCount: {
    fontSize: 28,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 3,
  },
  jsGlyph: {
    fontFamily: fonts.sans.bold,
    fontSize: 18,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionSlot: {
    flex: 1,
  },
});
