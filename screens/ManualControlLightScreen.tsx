import { Pressable, Text, View } from "react-native";
import styles from "../styles/CenterControlLightScreen.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import useInviteCodeStore from "../stores/useInviteCodeStore";
import { socket } from "../utils/socket";
import { setLightOnDto } from "../types/setLightOnDto";
import { setLightColorDto } from "../types/setLightColorDto";
import { SafeAreaView } from "react-native-safe-area-context";

interface LHistoryType {
  isOn: boolean;
  time: number;
}

const ManualControlLightScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Manual">;
}) => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#fff");
  const [LHistory, setLHistory] = useState<LHistoryType[]>([]);
  const [isRecord, setIsRecord] = useState<boolean>(false);

  const lightOn = () => {
    isRecord &&
      setLHistory([
        ...LHistory,
        {
          isOn: true,
          time: performance.now(),
        },
      ]);

    setIsOn(true);
  };

  const lightOff = () => {
    isRecord &&
      setLHistory([
        ...LHistory,
        {
          isOn: false,
          time: performance.now(),
        },
      ]);

    setIsOn(false);
  };

  const onPressBackBtn = () => {
    navigation.goBack();
  };

  const toggleRecord = () => {
    setIsRecord((state) => {
      if (state) {
        console.log(LHistory);
      }

      if (!state) {
        setLHistory([]);
      }

      return !state;
    });
  };

  const playRecord = () => {
    let startTime = performance.now();
    let index = 0;

    const step = (currentTime: any) => {
      if (index >= LHistory.length) return;

      let elapsed = currentTime - startTime;

      if (elapsed >= LHistory[index].time - LHistory[0].time) {
        setIsOn(LHistory[index].isOn);
        console.log(`setIsOn(${LHistory[index].isOn}) at ${elapsed}ms`);
        index++;
      }

      requestAnimationFrame((currentTime) => step(currentTime));
    };

    requestAnimationFrame((currentTime) => step(currentTime));
  };

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
            <Pressable onPress={toggleRecord}>
              <Text style={{ color: "white" }}>
                {isRecord ? "녹화중지" : "녹화하기"}
              </Text>
            </Pressable>
            {LHistory.length > 0 && !isRecord && (
              <Pressable onPress={playRecord}>
                <Text style={{ color: "green" }}>재생하기</Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ManualControlLightScreen;
