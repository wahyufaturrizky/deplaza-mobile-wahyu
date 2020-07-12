import React,{useState} from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient'

import Appbar from '../../components/appbarHome'

function penarikan(props) {
    const [check, setCheck] = useState(false);


    const { height, width } = Dimensions.get("window");

    return (
        <View>
            <Appbar params={props}/>

            <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01}}>
                <Text>Tarik Saldo dari Saldo Penjual Ke</Text>
            </View>

            <View style={{backgroundColor:'white'}}>
                <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01, justifyContent:'space-between', flexDirection:'row'}}>
                    <View>
                        <Image 
                            source={require('../../assets/images/Logo_BCA.png')}
                            style={{width:width*0.12, height:width*0.05, resizeMode:'stretch'}}
                            width={width*0.12}
                            height={width*0.05}
                        />
                        <Text>Bank BCA</Text>
                    </View>
                    <Text>20202033</Text>
                </View>
            </View>

            <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01}}>
                <Text>Jumlah Penarikan Dana</Text>
            </View>

            <View style={{backgroundColor:'white'}}>
                <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01}}>
                    <Text style={{fontSize:24}}>Rp. 0,00</Text>
                </View>
                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>
                <View style={{width:'90%', alignSelf:'center', flexDirection:'row', alignItems:'center', marginVertical:height*0.01}}>
                    <Checkbox
                        status={check ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setCheck(!check);
                        }}
                    />
                    <Text> Saya Setuju untuk Mengembalikan Sesuai Kondisi Semula.</Text>
                </View>
            </View>

            <View style={{backgroundColor:'white', marginTop:height*0.01}}>
                <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01, flexDirection:'row', justifyContent:'space-between'}}>
                    <View>
                        <Text>Biaya Penarikan Dana</Text>
                        <Text style={{fontSize:10, color:'gray'}}>Diterapkan ke Penarikan Dana yang Sukses</Text>
                    </View>
                    <Text>Tanpa Biaya</Text>
                </View>
                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>
            </View>

            <View style={{width:'90%', alignSelf:'center', marginTop:height*0.01}}>
                <Text>Jumlah Transfer ke Bank</Text>
            </View>
            
            <View style={{backgroundColor:'#E0F5FE',}}>
                <View style={{width:'90%', alignSelf:'center', flexDirection:'row', flexWrap:'wrap', alignItems:'center', marginVertical:height*0.01}}>
                    <Icon name="alert" size={20} color="#07A9F0" />
                    <Text> Kamu hanya dapat melakukan penarikan 1x/hari</Text>
                </View> 
            </View>

            <TouchableOpacity  onPress={() => postWishlist(dataDetail.id)}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                    style={{padding:15, flexDirection:"row", justifyContent:'center', alignItems:'center'}}
                >
                    <Icon name="heart" size={20} color="#fff"/>
                    <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                        Tandai Produk Ini
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
}

export default penarikan;