import React from 'react';

//Navigation V.5
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// Screen
import Login from './src/screens/login/Login';
import Home from './src/screens/home/Home';
import JualanAnda from './src/screens/jualanAnda/jualanAnda';
import Produk from './src/screens/produk/Produk';
import produkDetail from './src/screens/produkDetail/produkDetail';
import produkDetailAdaButtonDisukai from './src/screens/produkDetail/produkDetailAdaButtonDisukai';
import Pesan from './src/screens/pesan/Pesan';
import PesananSaya from './src/screens/pesananSaya/pesananSaya';
import RincianPesanan from './src/screens/rincianPesanan/rincianPesanan';
import Wishlist from './src/screens/akun/Wishlist';
import TambahProduk from './src/screens/wishlist/tambahProduk';
import Kembali from './src/screens/kembali/Kembali';
import Bantuan from './src/screens/bantuan/Bantuan';
import BantuanFoto from './src/screens/bantuan/bantuanFoto';
import BantuanJudul from './src/screens/bantuan/bantuanJudul';
import BantuanLokasi from './src/screens/bantuan/bantuanLokasi';
import BantuanLain from './src/screens/bantuan/bantuanLain';
import Kategori from './src/screens/produk/Kategori';
import Akun from './src/screens/akun/Akun';
import WishlistNoButtonTambah from './src/screens/wishlist/WishlistNoButtonTambah';
import WishlistSesungguhnya from './src/screens/wishlist/WishlistSesungguhnya';
import EditAkun from './src/screens/akun/editAkun';
import RincianRekening from './src/screens/akun/rincianRekening';
import Lacak from './src/screens/lacak/Lacak';
import SaldoPenjual from './src/screens/tarik/saldoPenjual';
import Penarikan from './src/screens/tarik/penarikan';
import PembayaranSaya from './src/screens/akun/pembayaranSaya';
import InformasiPenjualanSaya from './src/screens/akun/informasiPenjualanSaya';
import Notifikasi from './src/screens/akun/notifikasi';
import BantuanFaq from './src/screens/bantuanFaq/bantuanFaq';
import MulaiBerjualan from './src/screens/bantuanFaq/mulaiBerjualan';
import CaraPembayaran from './src/screens/bantuanFaq/caraPembayaran';
import LacakKomisi from './src/screens/bantuanFaq/lacakKomisi';
import BagikanProduk from './src/screens/bantuanFaq/bagikanProduk';
import ReturKembali from './src/screens/bantuanFaq/returKembali';
import Transaksi from './src/screens/tarik/Transaksi';
import Chat from './src/screens/chat';
import Sync from './src/screens/chat/Sync';
import ListChat from './src/screens/chat/ListChat';
import DetailChat from './src/screens/chat/DetailChat';
import ChatScreen from './src/screens/chat/Chat';
import Canva from './src/screens/canva';
import Pembayaran from './src/screens/akun/pembayaran';
import Splash from './src/screens/splash';

const Stack = createStackNavigator();

function StackNav(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode={'none'}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="JualanAnda" component={JualanAnda} />
        <Stack.Screen name="Produk" component={Produk} />
        <Stack.Screen name="ProdukDetail" component={produkDetail} />
        <Stack.Screen
          name="ProdukDetailAdaButtonDisukai"
          component={produkDetailAdaButtonDisukai}
        />
        <Stack.Screen name="Pesan" component={Pesan} />
        <Stack.Screen name="PesananSaya" component={PesananSaya} />
        <Stack.Screen name="RincianPesanan" component={RincianPesanan} />
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen
          name="WishlistNoButtonTambah"
          component={WishlistNoButtonTambah}
        />
        <Stack.Screen
          name="WishlistSesungguhnya"
          component={WishlistSesungguhnya}
        />
        <Stack.Screen name="TambahProduk" component={TambahProduk} />
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
        <Stack.Screen name="SaldoPenjual" component={SaldoPenjual} />
        <Stack.Screen name="Penarikan" component={Penarikan} />
        <Stack.Screen name="PembayaranSaya" component={Pembayaran} />
        <Stack.Screen
          name="InformasiPenjualanSaya"
          component={InformasiPenjualanSaya}
        />
        <Stack.Screen name="Notifikasi" component={Notifikasi} />
        <Stack.Screen name="BantuanFaq" component={BantuanFaq} />
        <Stack.Screen name="MulaiBerjualan" component={MulaiBerjualan} />
        <Stack.Screen name="CaraPembayaran" component={CaraPembayaran} />
        <Stack.Screen name="LacakKomisi" component={LacakKomisi} />
        <Stack.Screen name="BagikanProduk" component={BagikanProduk} />
        <Stack.Screen name="ReturKembali" component={ReturKembali} />
        <Stack.Screen name="Transaksi" component={Transaksi} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Sync" component={Sync} />
        <Stack.Screen name="ListChat" component={ListChat} />
        <Stack.Screen name="DetailChat" component={DetailChat} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Canva" component={Canva} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;
