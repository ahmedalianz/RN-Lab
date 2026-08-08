import {Text as RNText, type TextProps, type TextStyle} from 'react-native';
import {colors, typography, type TypographyToken} from '../theme';

type Props = TextProps & {
  variant?: TypographyToken;
  color?: string;
};

export function Text({
  variant = 'bodyMd',
  color = colors.onSurface,
  style,
  ...rest
}: Props) {
  const variantStyle = typography[variant] as TextStyle;

  return <RNText style={[variantStyle, {color}, style]} {...rest} />;
}
