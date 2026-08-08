import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppHeader} from '../../components/AppHeader';
import {CatalogRow, Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {referenceArticles} from '../../data/catalog';
import type {ReferenceStackParamList} from '../../navigation/types';
import {colors, spacing} from '../../theme';

export function ReferenceLibraryScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ReferenceStackParamList>>();

  return (
    <View style={styles.root}>
      <AppHeader
        showSearch={false}
        onSettingsPress={() =>
          navigation.getParent()?.getParent()?.navigate('Settings' as never)
        }
      />
      <Screen contentStyle={styles.content}>
        <Text variant="headlineMd">Reference</Text>
        <Text variant="bodyMd" color={colors.onSurfaceVariant}>
          Short primers you can open while running experiments.
        </Text>
        {referenceArticles.map(article => (
          <CatalogRow
            key={article.id}
            title={article.title}
            subtitle={article.subtitle}
            accentColor={colors.tertiaryContainer}
            onPress={() =>
              navigation.navigate('ReferenceArticle', {articleId: article.id})
            }
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
  },
});
