import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { colors } from '../Styles/estilosComuns';

export function HeaderBack() {
  const navigation = useNavigation();
  if (!navigation.canGoBack()) return null;
  return (
    <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={{ paddingRight: 10, paddingLeft: 0 }}>
      <Entypo name="chevron-small-left" size={30} color={colors.text} />
    </Pressable>
  );
}