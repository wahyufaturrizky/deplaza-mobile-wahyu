import React from 'react';

//Navigation V.5
import { createStackNavigator, } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/screens/login/Login'
import Home from './src/screens/home/Home'
import JualanAnda from './src/screens/jualanAnda/jualanAnda'
import Produk from './src/screens/produk/Produk'
import produkDetail from './src/screens/produkDetail/produkDetail';
import Pesan from './src/screens/pesan/Pesan';
import PesananSaya from './src/screens/pesananSaya/pesananSaya';
import RincianPesanan from './src/screens/rincianPesanan/rincianPesanan';
import Wishlist from './src/screens/wishlist/Wishlist';

const Stack = createStackNavigator();

function StackNav(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode={"none"}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="JualanAnda" component={JualanAnda} />
        <Stack.Screen name="Produk" component={Produk} />
        <Stack.Screen name="ProdukDetail" component={produkDetail} />
        <Stack.Screen name="Pesan" component={Pesan} />
        <Stack.Screen name="PesananSaya" component={PesananSaya} />
        <Stack.Screen name="RincianPesanan" component={RincianPesanan} />
        <Stack.Screen name="Wishlist" component={Wishlist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;