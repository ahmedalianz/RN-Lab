import type {LucideIcon, LucideProps} from 'lucide-react-native';
import {colors} from '../theme';

type Props = LucideProps & {
  icon: LucideIcon;
  size?: number;
  color?: string;
};

export function Icon({
  icon: Lucide,
  size = 18,
  color = colors.onSurface,
  strokeWidth = 1.75,
  ...rest
}: Props) {
  return (
    <Lucide
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      {...rest}
    />
  );
}
