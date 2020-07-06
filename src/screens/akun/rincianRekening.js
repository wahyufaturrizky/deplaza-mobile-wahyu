import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput, HelperText} from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

import Appbar from '../../components/appbarHome'

function rincianRekening(props) {
    const [noRek,setNoRek] = useState("")
    const [konfnoRek,setKonfNoRek] = useState("")
    const [namaRekening,setNamaRekening] = useState("")
    const [bank,setBank] = useState("")

    const { height, width } = Dimensions.get("window");
    return (
        <View style={{backgroundColor:'white', flex:1}}>
            <Appbar params={props} />

            <View style={{justifyContent:"center", alignItems:'center', backgroundColor:'#9FB4BE', padding:20, marginBottom:height*0.02}}>
                <Icon name="cloud-upload" size={32} color="gray"/>
                <Text style={{color:'white'}}>Tambahkan Foto Buku Tabungan/Cek</Text>
            </View>

            <View style={{width:'90%', alignSelf:'center', marginBottom:height*0.01 }}>
                <Text>Nomor Rekening</Text>
                <TextInput
                    value={noRek}
                    onChangeText={text => setNoRek(text)}
                    style={{backgroundColor:'white'}}
                    underlineColor={"#07A9F0"}
                    underlineColorAndroid={"#07A9F0"}
                    selectionColor={"#07A9F0"}
                    keyboardType={"numeric"}
                />
                <HelperText style={{color:'#93DCFC', paddingLeft:0}}>
                   Wajib Isi
                </HelperText>
            </View>

            <View style={{width:'90%', alignSelf:'center', marginBottom:height*0.01 }}>
                <Text>Konfirmasi Nomor Rekening</Text>
                <TextInput
                    value={konfnoRek}
                    onChangeText={text => setKonfNoRek(text)}
                    style={{backgroundColor:'white'}}
                    underlineColor={"#07A9F0"}
                    underlineColorAndroid={"#07A9F0"}
                    selectionColor={"#07A9F0"}
                    keyboardType={"numeric"}
                />
                <HelperText style={{color:'#93DCFC', paddingLeft:0}}>
                   Wajib Isi
                </HelperText>
            </View>

            <View style={{width:'90%', alignSelf:'center', marginBottom:height*0.01}}>
                <Text>Nama Pemilik Rekening</Text>
                <TextInput
                    value={namaRekening}
                    onChangeText={text => setNamaRekening(text)}
                    style={{backgroundColor:'white'}}
                    underlineColor={"#07A9F0"}
                    underlineColorAndroid={"#07A9F0"}
                    selectionColor={"#07A9F0"}
                    keyboardType={"numeric"}
                />
                <HelperText style={{color:'#93DCFC', paddingLeft:0}}>
                   Wajib Isi
                </HelperText>
            </View>

            <View style={{width:'90%', alignSelf:'center', marginBottom:height*0.01}}>
                <Text>Nama Bank</Text>
                <TextInput
                    value={bank}
                    onChangeText={text => setBank(text)}
                    style={{backgroundColor:'white'}}
                    underlineColor={"#07A9F0"}
                    underlineColorAndroid={"#07A9F0"}
                    selectionColor={"#07A9F0"}
                    keyboardType={"numeric"}
                />
                <HelperText style={{color:'#93DCFC', paddingLeft:0}}>
                   Wajib Isi
                </HelperText>
            </View>

            <TouchableOpacity>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                    style={{padding:20, borderRadius:10, width:'90%', marginBottom:height*0.02, alignSelf:'center', flexDirection:"row", justifyContent:'center', alignItems:'center'}}
                >
                    <Text style={{fontSize:18, textAlign:'center', color:'white'}}>
                        Simpan
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

            <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

            <View style={{width:'90%', alignSelf:'center', flexDirection:'row', alignItems:'center'}}>
                <Icon name="cloud-upload" size={32} color="gray" style={{marginRight:width*0.04}}/>
                <Text style={{width:'90%'}}>Masukan rincian Bank Anda dengan teliti. Rincian ini akan digunakan untuk pembayaran refund dan komisi.</Text>
            </View>

        </View>
    );
}

export default rincianRekening;