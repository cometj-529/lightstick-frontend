import { Pressable, Text } from "react-native";
import styles from "../styles/ColorShortcut.style";

interface Props {
  color: string;
  onPressIn: () => void;
  onPressOut: () => void;
}

const ColorShortcut = ({ color, onPressIn, onPressOut }: Props) => {
  return (
    <Pressable
      key={color}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: color, opacity: pressed ? 0.6 : 1 },
      ]}
    >
      <Text>{color}</Text>
    </Pressable>
  );
};

export default ColorShortcut;
