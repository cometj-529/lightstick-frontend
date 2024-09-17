import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Pressable, Text, TextInput, View } from "react-native";
import styles from "../styles/HomeScren.style";
import Toast from "react-native-toast-message";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { socket } from "../utils/socket";
import { createRoom } from "../utils/RoomAxios";
import useInviteCodeStore from "../stores/useInviteCodeStore";
import { SafeAreaView } from "react-native-safe-area-context";

const RoomCreateScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Create">;
}) => {
  const [codeInputValue, setCodeInputValue] = useState<string>("");
  const { code, setInviteCode, setIsOwner } = useInviteCodeStore();

  const onChangeInviteCodeInput = (text: string) => {
    setCodeInputValue(text);
  };

  const onPressCreateBtn = () => {
    if (codeInputValue === "") {
      Toast.show({
        type: "error",
        text1: "초대코드를 입력해주세요.",
      });

      return;
    }

    createRoomProcess();
  };

  const createRoomProcess = async () => {
    if (!socket.id) return;

    try {
      await createRoom({ code: codeInputValue, socketId: socket.id });

      setInviteCode(codeInputValue);
      setIsOwner(true);
      navigation.navigate("Center");
    } catch (err: any) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: String(err.response.data.message),
      });
    }
  };

  const onPressBackBtn = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.view}>
      <Ionicons
        name="chevron-back"
        size={30}
        color="black"
        onPress={onPressBackBtn}
      />
      <Text style={styles.title}>방 생성하기</Text>
      <TextInput
        style={styles.codeInput}
        placeholder="초대코드"
        value={codeInputValue}
        onChangeText={onChangeInviteCodeInput}
      />
      <Pressable onPress={onPressCreateBtn}>
        <View style={styles.connectBtn}>
          <Text style={styles.connectBtnText}>생성</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default RoomCreateScreen;
