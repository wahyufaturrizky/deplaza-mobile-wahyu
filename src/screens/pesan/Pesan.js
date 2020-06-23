import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Picker, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Appbar from '../../components/appbarHome';

function Pesan(props) {
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [provinsi, setProvinsi] = useState("=Provinsi=");
    const [kota, setKota] = useState("=Kota=");
    const [pos, setPos] = useState("");
    const [alamat, setAlamat] = useState("");
    const [metode, setMetode] = useState(true); //True = Metode Bank

    const indonesia = "../../assets/images/indonesia.png"
    const { height, width } = Dimensions.get("window");

    const ubahPembayaran = () => {
        setMetode(!metode)
    }

    return (
        <View style={{backgroundColor:'white', flex:1}}>
            <Appbar params={props}/>

            <ScrollView>

                <View style={{backgroundColor:'#F8F8F8', padding:10}}>
                    <Text style={{fontSize:18}}>Metode Pembayaran</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        {metode ?
                            <View>
                                <Text style={{fontWeight:'bold', fontSize:18}}>Transfer Bank</Text>
                                <Text>DePlaza</Text>
                                <Text>BCA / 20202033</Text>
                            </View>
                        :
                            <Text style={{fontWeight:'bold', fontSize:18}}>COD</Text>
                        }
                        <TouchableOpacity style={{backgroundColor:'#E6E6E6', padding:10}} onPress={ubahPembayaran}>
                            <Text>Ubah Metode Pembayaran</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{padding:10}}>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                        <View>
                            <Text>Biaya Produk</Text>
                            <Text style={{color:'gray', fontSize:12}}>*Harga Sudah Termasuk Ongkir</Text>
                        </View>
                        <Text>Rp. 67.000</Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View>
                            <Text>Tambahan Margin Jika Ada</Text>
                            <Text style={{color:'gray', fontSize:12}}>*Boleh Tidak Diisi</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderBottomWidth:1, borderBottomColor:'gray'}}>
                            <Text>Rp. </Text>
                            <TextInput
                                placeholder="Isi di Sini"
                                mode="outlined"
                            />
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                        <View>
                            <Text>Total Pesanan</Text>
                            <Text style={{color:'gray', fontSize:12}}>(Tunai yang Dikumpulkan dari Pelanggan)</Text>
                        </View>
                        <Text>Rp. 67.000</Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                        <View>
                            <Text>Saldo yang Anda Terima</Text>
                            <Text style={{color:'gray', fontSize:12}}>(Komisi + Tambahan Margin)</Text>
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <Text style={{fontSize:12}}>Rp. 5.000 + Rp. 3.000</Text>
                            <Text>Rp. 8.000</Text>
                        </View>
                    </View>

                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>
                    
                {metode &&
                    <TouchableOpacity style={{width:'90%', alignSelf:'center'}}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                            style={{padding:15, justifyContent:'center', alignItems:'center', borderRadius:10, flexDirection:'row'}}
                        >
                            <Icon name="cloud-upload" size={32} color="#fff"/>
                            <Text style={{fontSize:20, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                                Upload Bukti Transfer
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }

                <View style={{backgroundColor:'#F8F8F8', padding:10, marginVertical:height*0.02}}>
                    <Text style={{fontSize:18}}>Alamat Pengiriman</Text>
                </View>

                <View style={{padding:10, marginBottom:height*0.02}}>

                        <TextInput
                            label='Nama Lengkap'
                            value={fullname}
                            mode = "outlined"
                            onChangeText={(val)=> setFullname(val)}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white'}}
                            
                        />             

                        <View style={{width:"90%", alignSelf:'center', justifyContent:'space-between', flexDirection:'row', marginTop:height*0.005}}>
                            <View style={{height:57, width:'25%', marginTop:7, borderRadius: 5, borderColor: 'grey', borderWidth: 1,}}>

                                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', flex:1}}>
                                    <Image
                                        source={require(indonesia)}
                                        style={{ width: 40, height: 40, alignSelf: 'center'}}
                                        resizeMode='cover'
                                        width={40}
                                        height={40} />
                                    <Text style={{fontSize:14}}> +62</Text>
                                </View>
                            
                            </View>

                            <TextInput
                                label='No. Telepon'
                                value={phone}
                                onChangeText={(val)=> setPhone(val)}
                                mode="outlined"
                                style={{width:'70%', backgroundColor:'white'}}
                            />
                        </View>

                        <View style={{width:"90%", alignSelf:'center', justifyContent:'space-between', alignItems:'center', flexDirection:'row', marginTop:height*0.01}}>
                            <View style={{borderWidth:1, borderColor:'gray', width:'30%', borderRadius:10, height:height*0.055}}>
                                <Picker
                                    selectedValue={provinsi}
                                    onValueChange={(itemValue, itemIndex) => setProvinsi(itemValue)}
                                    
                                >
                                    <Picker.Item label="= Provinsi =" value="=Provinsi=" />
                                    <Picker.Item label="Jawa Barat" value="jawa barat" />
                                </Picker>
                            </View>

                            <View style={{borderWidth:1, borderColor:'gray', width:'30%', borderRadius:10 , height:height*0.055}}>
                                <Picker
                                    selectedValue={kota}
                                    onValueChange={(itemValue, itemIndex) => setKota(itemValue)}
                                >
                                    <Picker.Item label="= Kota =" value="=Provinsi=" />
                                    <Picker.Item label="Jawa Barat" value="jawa barat" />
                                </Picker>
                            </View>

                            <View style={{borderWidth:1, borderColor:'gray', paddingTop:height*0.003, width:'30%', borderRadius:10 , height:height*0.055}}>
                                <TextInput
                                    placeholder="Kode Pos"
                                    value={pos}
                                    onChangeText={(val)=> setPos(val)}
                                    style={{backgroundColor:'white',borderRadius:10, height:height*0.05}}
                                />
                            </View>
                        </View>

                        <TextInput
                            label='Alamat Lengkap'
                            value={alamat}
                            mode = "outlined"
                            onChangeText={(val)=> setAlamat(val)}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white', marginTop:height*0.005}}
                            multiline={true}
                            numberOfLines={4}
                        />  
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'flex-start'}}>
                        <View style={{width:'30%'}}>
                            <Image
                                source={require('../../assets/images/ex-produk.png')}
                                style={{width:'100%', height:height*0.2 , resizeMode:'cover'}}
                            />
                        </View>
                        <View style={{width:'60%'}}>
                            <Text style={{fontSize:18}}>Pelindung Wajah</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <View style={{width:'50%'}}>
                                    <Text>Rp. 67.000</Text>
                                    <Text style={{fontSize:14, color:'gray'}}>Ukuran: XL</Text>
                                    <Text style={{fontSize:14, color:'gray'}}>Warna: Merah</Text>
                                </View>
                                <View style={{width:'50%', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                                    <Text style={{fontSize:14, color:'gray'}}>Jumlah: </Text>
                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', width:'60%'}}>
                                        <View style={{paddingVertical:height*0.005, paddingHorizontal:10, marginRight:width*0.005, backgroundColor:'#D5D5D5'}}>
                                            <Text style={{fontSize:16}}>-</Text>
                                        </View>
                                        <TextInput
                                            mode="outlined"
                                            style={{width:'50%',  marginTop:height*-0.005}}
                                        />
                                        <View style={{paddingVertical:height*0.005, paddingHorizontal:10, marginLeft:width*0.005, backgroundColor:'#D5D5D5'}}>
                                            <Text style={{fontSize:16}}>+</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                </View>

            </ScrollView>

            <TouchableOpacity>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                    style={{padding:15, justifyContent:'center', alignItems:'center'}}
                >
                    <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                        Masukkan Pesanan
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

export default Pesan;