import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import BoardingDetail from "./screens/BoardingDetail";
import ChatScreen from "./screens/ChatScreen";
import HomePage from "./screens/HomePage";
//import NearbyServices from "./screens/NearbyServices";
import Dashboard from "./screens/Dashboard";
//import OwnerInquiries from "./screens/OwnerInquiries";
import OwnerLoginPage from "./screens/OwnerLoginPage";
//import PostBoarding from "./screens/PostBoarding";
//import Recommendations from "./screens/Recommendations";
import BoardingDetailsAdding from "./screens/BoardingDetailsAdding";
import RegistrationPage from "./screens/RegistrationPage";
import SplashScreen from "./screens/SplashScreen";
import UserDashboard from "./screens/UserDashboard";
import UserLoginPage from "./screens/UserLoginPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{title:"HomePage"}}/>
        <Stack.Screen name="UserLoginPage" component={UserLoginPage} options={{ title: "LoginUser" }} />
        <Stack.Screen name="OwnerLoginPage" component={OwnerLoginPage} options={{ title: "LoginOwner" }} />
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} options={{ title: "Registration" }} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ title: "UserDashboard" }} />
        <Stack.Screen name="BoardingDetailsAdding" component={BoardingDetailsAdding} options={{ title: "BoardingDetailsAdding" }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: "Dashboard" }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: "ChatScreen" }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
