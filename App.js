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
import Kembali from './src/screens/kembali/Kembali';
import Bantuan from './src/screens/bantuan/Bantuan';
import BantuanFoto from './src/screens/bantuan/bantuanFoto';
import BantuanJudul from './src/screens/bantuan/bantuanJudul';
import BantuanLokasi from './src/screens/bantuan/bantuanLokasi';
import BantuanLain from './src/screens/bantuan/bantuanLain';
import Kategori from './src/screens/produk/Kategori';
import Akun from './src/screens/akun/Akun';
import EditAkun from './src/screens/akun/editAkun';
import RincianRekening from './src/screens/akun/rincianRekening';
import Lacak from './src/screens/lacak/Lacak';

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
        <Stack.Screen name="Kembali" component={Kembali} />
        <Stack.Screen name="Bantuan" component={Bantuan} />
        <Stack.Screen name="BantuanFoto" component={BantuanFoto} />
        <Stack.Screen name="BantuanJudul" component={BantuanJudul} />
        <Stack.Screen name="BantuanLokasi" component={BantuanLokasi} />
        <Stack.Screen name="BantuanLain" component={BantuanLain} />
        <Stack.Screen name="Kategori" component={Kategori} />
        <Stack.Screen name="Akun" component={Akun} />
        <Stack.Screen name="RincianRekening" component={RincianRekening} />
        <Stack.Screen name="EditAkun" component={EditAkun} />
        <Stack.Screen name="Lacak" component={Lacak} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;