import { ReactNode } from "react";
import {
    ImageBackground,
    ImageSourcePropType,
    StyleProp,
    View,
    ViewStyle,
} from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

type CoverImageProps = {
  source?: ImageSourcePropType;
  style: StyleProp<ViewStyle>;
  fallbackColor?: string;
  children?: ReactNode;
};

export function CoverImage({
  source,
  style,
  fallbackColor = colors.primarySoft,
  children,
}: CoverImageProps) {
  if (source) {
    return (
      <ImageBackground source={source} style={style}>
        {children}
      </ImageBackground>
    );
  }

  return (
    <View style={[style, { backgroundColor: fallbackColor }]}>{children}</View>
  );
}
