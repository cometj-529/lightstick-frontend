import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, TextInput, View } from "react-native";
import styles from "../styles/HomeScren.style";
import Toast from "react-native-toast-message";
import useInviteCodeStore from "../stores/useInviteCodeStore";
import { socket } from "../utils/socket";
import { joinRoom } from "../utils/RoomAxios";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect } from "react";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}) => {
  const { code, setInviteCode, setIsOwner } = useInviteCodeStore();
  const isFocused = useIsFocused();

  const onChangeInviteCodeInput = (text: string) => {
    setInviteCode(text);
  };

  const connectProcess = async () => {
    if (!socket.id) return;

    try {
      await joinRoom({ code, socketId: socket.id });

      navigation.navigate("Center");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: String(err.response.data.message),
      });
    }
  };

  const onPressConnectBtn = () => {
    if (code === "") {
      Toast.show({
        type: "error",
        text1: "초대코드를 입력해주세요.",
      });

      return;
    }

    connectProcess();
  };

  const moveCreate = () => {
    navigation.navigate("Create");
  };

  const moveManual = () => {
    navigation.navigate("Manual");
  };

  useEffect(() => {
    if (isFocused && code) {
      setIsOwner(false);
      socket.emit("leaveRoom", { code });
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.title}>초대코드 입력하고 연결하기</Text>
      <TextInput
        style={styles.codeInput}
        placeholder="초대코드"
        value={code}
        onChangeText={onChangeInviteCodeInput}
      />
      <Pressable onPress={onPressConnectBtn}>
        <View style={styles.connectBtn}>
          <Text style={styles.connectBtnText}>연결</Text>
        </View>
      </Pressable>
      <Pressable onPress={moveCreate}>
        <Text style={styles.manualMoveBtn}>방 생성하기</Text>
      </Pressable>
      <Pressable onPress={moveManual}>
        <Text style={styles.manualMoveBtn}>수동제어 모드로 사용하기</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;
