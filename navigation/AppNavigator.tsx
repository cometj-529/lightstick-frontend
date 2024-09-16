import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CenterControlLightScreen from "../screens/CenterControlLightScreen";
import { RootStackParamList } from "../types/navigation";
import Toast from "react-native-toast-message";
import RoomCreateScreen from "../screens/RoomCreateScreen";
import OwnerControlScreen from "../screens/OwnerControlScreen";
import ManualControlLightScreen from "../screens/ManualControlLightScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
          <Stack.Screen
            name="Center"
            component={CenterControlLightScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Create"
            component={RoomCreateScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Control"
            component={OwnerControlScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Manual"
            component={ManualControlLightScreen}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default AppNavigator;
