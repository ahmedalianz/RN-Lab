import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CatalogRow, Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {getDomain, STATUS_LABEL, type LabDomainId} from '../../data/catalog';
import {navigateToRoute} from '../../navigation/navigate';
import type {LabsStackParamList} from '../../navigation/types';

type Props = {
  domainId: LabDomainId;
};

export function DomainDashboardScreen({domainId}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<LabsStackParamList>>();
  const domain = getDomain(domainId);

  return (
    <Screen>
      <Text variant="labelCaps" color={domain.accent}>
        {domain.emoji}  {domain.title}
      </Text>
      <Text variant="headlineSm">{domain.title} Dashboard</Text>
      <Text variant="bodyMd" color="#bcc8cd">
        {domain.description}
      </Text>
      {domain.items
        .filter(item => item.route !== domain.dashboardRoute)
        .map(item => (
          <CatalogRow
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            meta={STATUS_LABEL[item.status]}
            accentColor={domain.accent}
            onPress={() => {
              if (item.route === 'NativeModuleDetails') {
                navigation.navigate('NativeModuleDetails', {
                  moduleId: item.id,
                });
                return;
              }
              navigateToRoute(navigation, item.route);
            }}
          />
        ))}
    </Screen>
  );
}
