import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './components/AddChatScreen';
import ChattingScreen from './screens/ChattingScreen';

const Stack = createNativeStackNavigator();
const globalScreenOptions = {

    headerStyle: {
      backgroundColor: '#529ef3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center'
}

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen 
          name="Login Screen" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="Register Screen" 
          component={RegisterScreen} 
        />
        <Stack.Screen 
          name="Home Screen" 
          component={HomeScreen}
        />
        <Stack.Screen 
          name="Add Chat Screen"
          component={AddChatScreen}
        />
        <Stack.Screen 
          name="Chatting Screen"
          component={ChattingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;