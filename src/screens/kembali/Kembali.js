import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { RadioButton, TextInput, Checkbox, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'

import Appbar from '../../components/appbarHome';
import InputNormal from '../../components/inputNormal'

function Kembali(props) {
    const [checked, setChecked] = React.useState('first');
    const [check, setCheck] = React.useState(false);
    const [alasan, setAlasan] = React.useState("");
    const [alasanDetail, setAlasanDetail] = React.useState("");
    const [qty, setQty] = React.useState("0");


    const { height, width } = Dimensions.get("window");


    const changeQty = (simbol) => {
        // let hargaProduk = parseInt(dataDetail.price_basic)
        // let totalOngkirNow = parseInt(totalOngkir)

        if(simbol === "+"){
            let qtynow = parseInt(qty)+1
            // setQty(qtynow, setTotalHarga((hargaProduk*qtynow)+totalOngkirNow),setTotalKomisi(dataDetail.price_commission*qtynow))
            setQty(qtynow)
        }else if(simbol === "-"){
            let qtynow = parseInt(qty)-1
            setQty(qtynow)
            // setQty(qtynow, setTotalHarga((hargaProduk*qtynow)+totalOngkirNow),setTotalKomisi(dataDetail.price_commission*qtynow))
        }
    }

    return (
        <View style={{backgroundColor:'white', flex:1}}>
            <Appbar params={props}/>

            <ScrollView>
                <View style={{padding:10, justifyContent:'space-around', alignItems:'center', flexDirection:'row', backgroundColor:'#F8F8F8'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <RadioButton
                            value="penukaran"
                            status={ checked === 'first' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('first')}
                        />
                        <Text> Penukaran</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <RadioButton
                            value="pengembalian"
                            status={ checked === 'second' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('second')}
                        />
                        <Text>Pengembalian</Text>
                    </View>
                </View>

                <View style={{width:'90%', alignSelf:'center'}}>
                    <View style={{padding:10, marginBottom:height*0.02}}>

                        <TextInput
                            label='Alasan Barang ditukar/dikembalikan'
                            value={alasan}
                            mode = "outlined"
                            onChangeText={(val)=> setAlasan(val)}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10}}
                            
                        />  

                        <TextInput
                            label='Alasan Detail'
                            value={alasanDetail}
                            mode = "outlined"
                            onChangeText={(val)=> setAlasanDetail(val)}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white', marginTop:height*0.005}}
                            multiline={true}
                            numberOfLines={4}
                        />  

                        <View style={{flexDirection:'row', width:'90%', alignSelf:'center', marginVertical:height*0.01, justifyContent:'space-between', alignItems:'center'}}>
                            <View style={{borderStyle:'dashed', padding:10, width:'45%', borderRadius:10, borderWidth:1, borderColor:'gray', justifyContent:'center', alignItems:'center'}}>
                                <Icon name="cloud-upload" size={32} color="gray"/>
                                <Text style={{fontSize:14, textAlign:'center', color:'gray'}}>
                                    Tambahkan Gambar
                                </Text>
                            </View>

                            <View style={{borderStyle:'dashed', padding:10, width:'45%', borderRadius:10, borderWidth:1, borderColor:'gray', justifyContent:'center', alignItems:'center'}}>
                                <Icon name="cloud-upload" size={32} color="gray"/>
                                <Text style={{fontSize:14, textAlign:'center', color:'gray'}}>
                                    Tambahkan Video 
                                </Text>
                            </View>
                        </View>

                        <View style={{backgroundColor:'#F8F8F8', padding:10}}>
                            <Text>*Mohon unggah gambar yang jelas dan asli dari produk yang dikirim untuk menghindari penolakan permintaan pengembalian Anda.</Text>
                        </View>

                    </View>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>

                <View style={{alignSelf:'center', flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:height*0.01, alignItems:'center'}}>
                    <Title>Jumlah</Title>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', width:'50%'}}>
                        <TouchableOpacity  onPress={() => changeQty("-")}>
                            <View style={{height:height*0.045, backgroundColor:'#D5D5D5', justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                                <Text style={{fontSize:20}}>-</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{borderWidth:1, borderColor:'#D5D5D5', width:'20%'}}>
                            <InputNormal
                                style={{borderColor:'rgb(18, 48, 92)',height:height*0.045, fontSize:10}}
                                value={qty.toString()}
                                disabled
                                editable={false}
                            />
                        </View>

                        <TouchableOpacity onPress={() => changeQty("+")}>
                            <View style={{height:height*0.045, backgroundColor:'#D5D5D5', justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                                <Text style={{fontSize:20}}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>

                <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01}}>
                    <View style={{padding:5}}>
                        <Title>Alamat Pengiriman</Title>

                        <View style={{marginTop:height*0.02}}>
                            <Text style={{fontSize:16}}>Nama</Text>
                            <Text style={{fontSize:14}}>Alamat</Text>
                            <Text style={{fontSize:16}}>081234123</Text>
                        </View>
                    </View>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>

                <View style={{flexDirection:'row', justifyContent:'flex-start', width:'90%', alignSelf:'center', alignItems:'center'}}>
                    <Checkbox
                        status={check ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setCheck(!check);
                        }}
                    />
                    <Text> Saya Setuju untuk Mengembalikan Sesuai Kondisi Semula.</Text>
                </View>

            </ScrollView>

            <TouchableOpacity>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                    style={{padding:15, flexDirection:"row", justifyContent:'center', alignItems:'center'}}
                >
                    <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                        Kirim
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
}

export default Kembali;