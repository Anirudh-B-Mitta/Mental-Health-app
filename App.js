import { TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from './Screens/home';
import Chat from './Screens/chat';
import SignupPage from "./Screens/signup";
import Login from "./Screens/login";

const Stack =createStackNavigator();

function App(){
  return(
    <Stack.Navigator>
    <Stack.Screen name="login" component={Login} options={{ headerLeft: null }}/>
      <Stack.Screen name="signup" component={SignupPage} options={{ headerLeft: null }}/>
      <Stack.Screen name="home" component={Home} options={({ navigation }) => ({
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                // Handle logout logic here
                // For example, navigate to the login screen
                navigation.navigate('login');
              }}
            >
              <Text style={{ color: 'blue' }}>Logout</Text>
            </TouchableOpacity>
          ),
        })}/>
      <Stack.Screen name="chat" component={Chat}/>
    </Stack.Navigator>
  )
}
export default()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}
