
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from './Screens/home';
import Chat from './Screens/chat';

const Stack =createStackNavigator();

function App(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home}/>
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
