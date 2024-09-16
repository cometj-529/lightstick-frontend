import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import { setLightOnDto } from "../types/setLightOnDto";
import useInviteCodeStore from "../stores/useInviteCodeStore";
import { socket } from "../utils/socket";
import { setLightColorDto } from "../types/setLightColorDto";
import ColorShortcut from "../components/ColorShortcut";
import styles from "./../styles/OwnerControlScreen.style";

const shortcutData = {
  colors: ["red", "blue", "yellow", "white"],
};

const OwnerControlScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Control">;
}) => {
  const { code, isOwner } = useInviteCodeStore();

  const lightOn = () => {
    if (!isOwner) return;

    const data: setLightOnDto = {
      code,
      isOn: true,
    };

    socket.emit("setLightOn", data);
  };

  const lightOff = () => {
    if (!isOwner) return;

    const data: setLightOnDto = {
      code,
      isOn: false,
    };

    socket.emit("setLightOn", data);
  };

  const setColor = (color: string) => {
    if (!isOwner) return;

    const data: setLightColorDto = {
      code,
      color,
    };

    console.log(color);

    socket.emit("setLightColor", data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.toggleBtn}>
        <Text style={styles.toggleText}>토글</Text>
      </Pressable>
      <Pressable
        onPressIn={lightOn}
        onPressOut={lightOff}
        style={({ pressed }) => [
          styles.hoverBtn,
          pressed ? styles.hover : null,
        ]}
      >
        <Text>ON</Text>
      </Pressable>
      <View style={styles.colorContainer}>
        <Text style={styles.colorAddBtn}>+</Text>
        <View style={styles.colors}>
          {shortcutData.colors.map((color) => (
            <ColorShortcut
              key={color}
              color={color}
              setColor={() => setColor(color)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OwnerControlScreen;
