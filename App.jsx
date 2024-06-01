import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator , TransitionPresets } from '@react-navigation/stack'

import Dashboard from './src/views/Dashboard'
import Home from './src/views/Home'
import Cart from './src/views/Cart'
import Account from './src/views/Account'
import Connect from './src/views/Connect'
import Login from './src/views/Login'
import Register from './src/views/Register'
import DrawerScreen from './src/views/DrawerScreen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={({ route, navigation }) => ({...TransitionPresets.SlideFromRightIOS,})} options={{headerShown: false}}>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Cart" component={Cart} options={{headerShown:false}}/>
        <Stack.Screen name="Account" component={Account} options={{headerShown:false}}/>
        <Stack.Screen name="Connect" component={Connect} options={{headerShown:false}}/>
        
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Drawer" component={DrawerScreen}
          options={{headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App