import React from 'react';
import { createStackNavigator, } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


import Login from './src/screens/login/Login'
import Home from './src/screens/home/Home'
import JualanAnda from './src/screens/jualanAnda/jualanAnda'
import Produk from './src/screens/produk/Produk'

const Stack = createStackNavigator();

function StackNav(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode={"none"}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="JualanAnda" component={JualanAnda} />
        <Stack.Screen name="Produk" component={Produk} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;