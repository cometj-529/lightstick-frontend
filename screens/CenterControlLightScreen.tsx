import { Pressable, Text, View } from "react-native";
import styles from "../styles/CenterControlLightScreen.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RootStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import useInviteCodeStore from "../stores/useInviteCodeStore";
import { socket } from "../utils/socket";
import { setLightOnDto } from "../types/setLightOnDto";
import { setLightColorDto } from "../types/setLightColorDto";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { setStateDto } from "../types/setStateDto";

const CenterControlLightScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Center">;
}) => {
  const { code, isOwner } = useInviteCodeStore();
  const [isOn, setIsOn] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#fff");
  const [h, setH] = useState<any>([
    { isOn: true, time: 0 },
    { isOn: false, time: 484 },
    { isOn: true, time: 398 },
    { isOn: false, time: 146 },
    { isOn: true, time: 746 },
    { isOn: false, time: 458 },
    { isOn: true, time: 400 },
    { isOn: false, time: 146 },
    { isOn: true, time: 279 },
    { isOn: false, time: 139 },
    { isOn: true, time: 277 },
    { isOn: false, time: 138 },
    { isOn: true, time: 96 },
    { isOn: false, time: 146 },
    { isOn: true, time: 470 },
    { isOn: false, time: 145 },
    { isOn: true, time: 71 },
    { isOn: false, time: 148 },
    { isOn: true, time: 494 },
    { isOn: false, time: 147 },
    { isOn: true, time: 270 },
    { isOn: false, time: 138 },
    { isOn: true, time: 305 },
    { isOn: false, time: 146 },
    { isOn: true, time: 713 },
    { isOn: false, time: 497 },
    { isOn: true, time: 369 },
    { isOn: false, time: 442 },
    { isOn: true, time: 454 },
    { isOn: false, time: 138 },
    { isOn: true, time: 282 },
    { isOn: false, time: 147 },
    { isOn: true, time: 302 },
    { isOn: false, time: 146 },
  ]);

  const setIsOnProcess = (data: setLightOnDto) => {
    setIsOn(data.isOn ?? false);
  };

  const setColorProcess = (data: setLightColorDto) => {
    setColor(data.color);
  };

  const lightOn = () => {
    if (!isOwner) return;

    setH([...h, { isOn: true, date: new Date() }]);

    const data: setLightOnDto = {
      code,
      isOn: true,
    };

    socket.emit("setLightOn", data);
  };

  const lightOff = () => {
    if (!isOwner) return;

    setH([...h, { isOn: false, date: new Date() }]);

    const data: setLightOnDto = {
      code,
      isOn: false,
    };

    socket.emit("setLightOn", data);
  };

  const onPressBackBtn = () => {
    navigation.goBack();
  };

  const moveControlScreen = () => {
    if (!isOwner) return;

    navigation.navigate("Control");
  };

  const onLeaveRoom = () => {
    navigation.popToTop();
  };

  const onSetState = (dto: setStateDto) => {
    setIsOn(dto.isOn ?? false);
    setColor(dto.color);
  };

  useEffect(() => {
    socket.on("setLightOn", setIsOnProcess);
    socket.on("setLightColor", setColorProcess);
    socket.on("leaveRoom", onLeaveRoom);
    socket.on("setState", onSetState);

    return () => {
      socket.off("setLightOn", setIsOnProcess);
      socket.off("setLightColor", setColorProcess);
      socket.off("leaveRoom", onLeaveRoom);
      socket.off("setState", onSetState);
    };
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <View style={[styles.backgroundView]}>
        <Pressable
          onPressIn={lightOn}
          onPressOut={lightOff}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: `${isOn ? color : "#000"}`,
            }}
          >
            <Ionicons
              name="chevron-back"
              size={30}
              color="white"
              onPress={onPressBackBtn}
              style={{
                width: 30,
              }}
            />
            {isOwner && (
              <Pressable onPress={moveControlScreen}>
                <Text style={{ color: "white" }}>제어센터</Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CenterControlLightScreen;
