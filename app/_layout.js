import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./Screens/SignInScreen";
import LandingScreen from "./Screens/LandingScreen";
import DictionaryScreen from "./Screens/DictionaryScreen";
import RecentScreen from "./Screens/RecentScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Navigator
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Landing Page">
        <Stack.Screen
          name="Sign In"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing Page"
          component={LandingScreen}
          options={{ headerShown: false }} 
        />
      <Stack.Screen
          name="Dictionary Page"
          component={DictionaryScreen}
          options={{ headerShown: false }} 
        />  
      <Stack.Screen
          name="Recent Page"
          component={RecentScreen}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
