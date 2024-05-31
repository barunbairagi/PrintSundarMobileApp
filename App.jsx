import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator , TransitionPresets } from '@react-navigation/stack'

import Login from './src/views/Login'
import Register from './src/views/Register'
import Dashboard from './src/views/Dashboard'
import DrawerScreen from './src/views/DrawerScreen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={({ route, navigation }) => ({...TransitionPresets.SlideFromRightIOS,})} options={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
        <Stack.Screen name="Drawer" component={DrawerScreen}
          options={{headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App