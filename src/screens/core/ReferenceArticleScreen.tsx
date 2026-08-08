import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Panel} from '../../components/Panel';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {referenceArticles} from '../../data/catalog';
import {colors, spacing} from '../../theme';
import type {ReferenceStackParamList} from '../../navigation/types';
import {StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<
  ReferenceStackParamList,
  'ReferenceArticle'
>;

export function ReferenceArticleScreen({route}: Props) {
  const article = referenceArticles.find(a => a.id === route.params.articleId);

  if (!article) {
    return (
      <Screen>
        <Text variant="headlineSm">Article not found</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text variant="labelCaps" color={colors.tertiaryContainer}>
        Reference
      </Text>
      <Text variant="headlineSm">{article.title}</Text>
      <Text variant="bodyMd" color={colors.onSurfaceVariant}>
        {article.subtitle}
      </Text>
      <Panel style={styles.body}>
        <Text variant="bodyLg">
          Placeholder article body. Replace with diagrams, checklists, and deep
          links into related workbenches as each lab lands.
        </Text>
        <Text variant="codeSm" color={colors.outline}>
          id → {article.id}
        </Text>
      </Panel>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    gap: spacing.sm,
  },
});
