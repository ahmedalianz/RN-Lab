import type {LucideIcon} from 'lucide-react-native';
import {
  BookOpen,
  FlaskConical,
  LayoutGrid,
  Terminal,
} from 'lucide-react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from '../components/Icon';
import {colors} from '../theme';
import {ExperimentsNavigator} from './ExperimentsNavigator';
import {HomeNavigator} from './HomeNavigator';
import {LabsNavigator} from './LabsNavigator';
import {ReferenceNavigator} from './ReferenceNavigator';
import type {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({
  icon,
  label,
  focused,
}: {
  icon: LucideIcon;
  label: string;
  focused: boolean;
}) {
  const color = focused ? colors.primaryFixedDim : colors.outline;

  return (
    <View style={styles.tabItem}>
      <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
        <Icon icon={icon} size={18} color={color} />
      </View>
      <Text style={[styles.label, {color}]}>{label}</Text>
    </View>
  );
}

function HomeTabIcon({focused}: {focused: boolean}) {
  return <TabIcon icon={LayoutGrid} label="Home" focused={focused} />;
}

function ExperimentsTabIcon({focused}: {focused: boolean}) {
  return <TabIcon icon={FlaskConical} label="Experiments" focused={focused} />;
}

function LabsTabIcon({focused}: {focused: boolean}) {
  return <TabIcon icon={Terminal} label="Lab" focused={focused} />;
}

function ReferenceTabIcon({focused}: {focused: boolean}) {
  return <TabIcon icon={BookOpen} label="Reference" focused={focused} />;
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="ExperimentsTab"
        component={ExperimentsNavigator}
        options={{
          tabBarIcon: ExperimentsTabIcon,
        }}
      />
      <Tab.Screen
        name="LabsTab"
        component={LabsNavigator}
        options={{
          tabBarIcon: LabsTabIcon,
        }}
      />
      <Tab.Screen
        name="ReferenceTab"
        component={ReferenceNavigator}
        options={{
          tabBarIcon: ReferenceTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surfaceContainer,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 64,
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    minWidth: 72,
  },
  iconWrap: {
    width: 36,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(92, 213, 246, 0.16)',
  },
  label: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 9,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
