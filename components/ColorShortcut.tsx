import { Pressable, Text } from "react-native";
import styles from "../styles/ColorShortcut.style";

interface Props {
  color: string;
  setColor: () => void;
}

const ColorShortcut = ({ color, setColor }: Props) => {
  return (
    <Pressable
      key={color}
      onPress={setColor}
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
