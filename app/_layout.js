import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./Screens/SignInScreen";
import LandingScreen from "./Screens/LandingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Navigator
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Sign In">
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Landing Page" component={LandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
