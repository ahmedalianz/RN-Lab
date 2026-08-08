import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CatalogRow, Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {getDomain, STATUS_LABEL} from '../../data/catalog';
import type {LabsStackParamList} from '../../navigation/types';

type Props = NativeStackScreenProps<LabsStackParamList, 'NativeModulesCatalog'>;

export function NativeModulesCatalogScreen(_props: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<LabsStackParamList>>();
  const domain = getDomain('native-modules');
  const modules = domain.items.filter(
    item => item.route === 'NativeModuleDetails',
  );

  return (
    <Screen>
      <Text variant="labelCaps" color={domain.accent}>
        {domain.emoji}  Native Modules
      </Text>
      <Text variant="headlineSm">Native Modules Catalog</Text>
      <Text variant="bodyMd" color="#bcc8cd">
        Small modules open as Details — no dedicated screen per module.
      </Text>
      {modules.map(item => (
        <CatalogRow
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          meta={STATUS_LABEL[item.status]}
          accentColor={domain.accent}
          onPress={() =>
            navigation.navigate('NativeModuleDetails', {moduleId: item.id})
          }
        />
      ))}
    </Screen>
  );
}
