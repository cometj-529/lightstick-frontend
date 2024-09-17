import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import { setLightOnDto } from "../types/setLightOnDto";
import useInviteCodeStore from "../stores/useInviteCodeStore";
import { socket } from "../utils/socket";
import ColorShortcut from "../components/ColorShortcut";
import styles from "./../styles/OwnerControlScreen.style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

const shortcutData = {
  colors: ["red", "blue", "yellow", "white"],
};

const OwnerControlScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Control">;
}) => {
  const { code, isOwner } = useInviteCodeStore();
  const [isOn, setIsOn] = useState<boolean>(false);
  const [beforeColor, setBeforeColor] = useState<string>("#ffffff");

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

  const setState = (color: string, isOn: boolean) => {
    const data = {
      code,
      color,
      isOn,
    };

    socket.emit("setState", data);
  };

  const onPressInColor = (color: string) => {
    setState(color, true);
  };

  const onPressOutColor = () => {
    setState(beforeColor, false);
  };

  const toggleOnOff = () => {
    if (isOn) {
      lightOff();
      setIsOn(false);
    } else {
      lightOn();
      setIsOn(true);
    }
  };

  const onPressBackBtn = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons
        name="chevron-back"
        size={30}
        color="black"
        onPress={onPressBackBtn}
        style={{
          width: 30,
        }}
      />
      <Pressable style={styles.toggleBtn} onPress={toggleOnOff}>
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
              onPressIn={() => {
                onPressInColor(color);
              }}
              onPressOut={onPressOutColor}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OwnerControlScreen;
