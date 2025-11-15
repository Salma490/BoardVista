import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BoardingDetail from "./screens/BoardingDetail";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import NearbyServices from "./screens/NearbyServices";
import OwnerDashboard from "./screens/OwnerDashboard";
import OwnerInquiries from "./screens/OwnerInquiries";
import PostBoarding from "./screens/PostBoarding";
import Recommendations from "./screens/Recommendations";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: "Register" }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Home" }} />
        <Stack.Screen name="BoardingDetail" component={BoardingDetail} options={{ title: "Boarding Details" }} />
        <Stack.Screen name="PostBoarding" component={PostBoarding} options={{ title: "Post Boarding" }} />
        <Stack.Screen name="OwnerDashboard" component={OwnerDashboard} options={{ title: "Owner Dashboard" }} />
        <Stack.Screen name="OwnerInquiries" component={OwnerInquiries} options={{ title: "Owner Inquiries" }} />
        <Stack.Screen name="Recommendations" component={Recommendations} options={{ title: "Recommendations" }} />
        <Stack.Screen name="NearbyServices" component={NearbyServices} options={{ title: "Nearby Services" }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: "Chat" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
