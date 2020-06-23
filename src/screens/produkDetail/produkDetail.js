import React, {useState,useEffect} from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import Clipboard from "@react-native-community/clipboard";
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/native';

import { ScrollView } from 'react-native-gesture-handler';
import { Title, TextInput, Snackbar  } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Appbar from '../../components/appbarHome';


function produkDetail(props) {
    const [dataDetail, setDataDetail] = useState([])
    const [copy, setCopy] = useState(false)

    const likeProduk = true
    const urlProdukDetail = 'http://rest-api.deplaza.id/v1/product/'
    const { height, width } = Dimensions.get("window");
    let id = props.route.params.id
    

    useEffect(() => {
        getDetailProduct()
    }, [])
    
    const copyToClipboard = async() => {
        const copyText = "Harga : Rp. 67.100 \n Deskripsi : \n Warna : Black \n Bahan : Cotton \n Ukuran : M, L, XL, XXL"
        Clipboard.setString(copyText)
        setCopy(true)
    }

    const goToHome = () => {
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                        { name: 'JualanAnda', params:{title:'Jualan Anda'} },
                    ]
        }));  
    }

    const gotoPesan = () => {
        props.navigation.navigate("Pesan", {title:"Pesan & Kirim"})
    }

    const getDetailProduct = async() => {

        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        console.log(data.token)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProdukDetail+id, {headers})
            .then(response => console.log(response))
            // .then(responseData => {
                // setProducts(responseData.data)
                // let image = responseData.data[0]
                // console.log(responseData.data)
            // })
    }

    const _onDismissSnackBar = () => setCopy(false);

    return (
        <View style={{backgroundColor:'white', flex:1}}>
                <Appbar params={props}/>
            
                <ScrollView >
                    <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.02 ,flex:1}}>
                        <Image
                            source={require('../../assets/images/ex-produk.png')}
                            style={{width:'100%', height:height*0.5 , resizeMode:'cover'}}
                        />

                        <Title>Topi Anti Corona/Pelindung Wajah</Title>

                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                            <TextInput
                                mode="outlined"
                                style={{width:'60%'}}
                            />

                            <TouchableOpacity style={{width:'30%'}}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                    style={{padding:15}}
                                >
                                    <Text style={{fontSize:16, textAlign:'center', color:'white'}}>
                                        Cek Harga
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={{padding:10, width:'100%', backgroundColor:'#93DCFC', flexDirection:'row', justifyContent:'space-around'}}>
                            <Icon name="help-circle-outline" size={20} color="#949494" />
                            <Text>Metode Pembayaran COD tidak tersedia di lokasi ini</Text>
                        </View>

                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:height*0.01}}>
                            <View>
                                <Text style={{fontSize:24}}>Rp. 67.100</Text>
                                <Text style={{fontSize:12}}>*Harga Sudah Termasuk Ongkir</Text>
                            </View>
                            <View style={{backgroundColor:'#D5D5D5', paddingVertical:5, paddingHorizontal:20, justifyContent:'center'}}>
                                <Text style={{fontSize:14}}>Komisi Rp. 5.000</Text>
                            </View>
                        </View>

                        <View style={{backgroundColor:'#D5D5D5', paddingVertical:5, width:'30%', paddingHorizontal:20, marginTop:height*0.01, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontSize:14}}>Stok {'>'} 50</Text>
                        </View>

                        <View style={{backgroundColor:'#D5D5D5', paddingVertical:5, width:'60%', flexDirection:'row', alignItems:'center', paddingHorizontal:20, marginTop:height*0.01, justifyContent:'flex-start'}}>
                            <Icon name="calendar" size={16} color="#000" />
                            <Text style={{fontSize:14}}> Akan Dikirimkan 2 - 3 hari</Text>
                        </View>

                    </View>

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                    <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.02}}>
                        <View style={{flexDirection:'row', paddingLeft:5, justifyContent:'space-between', backgroundColor:'#F8F8F8', alignItems:'center'}}>
                            <Title>Rincian Produk</Title>
                            <TouchableOpacity onPress={copyToClipboard}>
                                <View style={{padding:10, backgroundColor:'#D5D5D5'}}>
                                    <Text>Salin Deskripsi</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:height*0.01}}>
                            <Text>Warna : Black</Text>
                            <Text>Bahan : Cotton</Text>
                            <Text>Ukuran : M, L, XL, XXL</Text>
                        </View>
                    </View>

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                    <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.02}}>
                        <View style={{backgroundColor:'#F8F8F8', padding:5}}>
                            <Title>Pilih Ukuran, Warna, dan Jumlah</Title>
                        </View>
                        <View style={{marginTop:height*0.01, flexDirection:'row', alignItems:'center'}}>
                            <Icon name="close" size={20}/>
                            <Text> Stok Habis</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:height*0.02}}>
                            <View style={{padding:10, backgroundColor:'#D5D5D5', marginRight:5}}>
                                <Text style={{fontSize:20}}>M</Text>
                            </View>
                            <View style={{padding:10, backgroundColor:'#D5D5D5', marginRight:5}}>
                                <Text style={{fontSize:20}}>L</Text>
                            </View>
                            <View style={{padding:10, backgroundColor:'#D5D5D5', marginRight:5}}>
                                <Text style={{fontSize:20}}>XL</Text>
                            </View>
                            <View style={{padding:10, backgroundColor:'#D5D5D5', marginRight:5}}>
                                <Text style={{fontSize:20}}>XXL</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                    <View style={{width:'90%', alignSelf:'center',flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Title>Warna</Title>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', width:'50%'}}>
                            <View style={{backgroundColor:'#F41111', marginRight:5, height:height*0.03, width:'10%'}}></View>
                            <View style={{backgroundColor:'red', marginRight:5, height:height*0.03, width:'10%'}}></View>
                            <View style={{backgroundColor:'green', marginRight:5, height:height*0.03, width:'10%'}}></View>
                            <View style={{backgroundColor:'blue', marginRight:5, height:height*0.03, width:'10%'}}></View>
                        </View>
                    </View>

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                    <View style={{width:'90%', alignSelf:'center', flexDirection:'row', justifyContent:'space-between', paddingVertical:height*0.01, alignItems:'center'}}>
                        <Title>Jumlah</Title>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', width:'50%'}}>
                            <View style={{paddingVertical:height*0.01, paddingHorizontal:15, backgroundColor:'#D5D5D5'}}>
                                <Text style={{fontSize:20}}>-</Text>
                            </View>
                            <TextInput
                                mode="outlined"
                                style={{width:'30%', height:height*0.045, marginTop:height*-0.005}}
                            />
                            <View style={{paddingVertical:height*0.01, paddingHorizontal:15, backgroundColor:'#D5D5D5'}}>
                                <Text style={{fontSize:20}}>+</Text>
                            </View>
                        </View>
                    </View>

                    
                </ScrollView>

                <Snackbar
                    visible={copy}
                    onDismiss={_onDismissSnackBar}
                    duration = {1000}
                >
                    Deskripsi Berhasil di Salin
                </Snackbar>

                {!likeProduk ?
                    <TouchableOpacity  onPress={goToHome}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                            style={{padding:15, flexDirection:"row", justifyContent:'center', alignItems:'center'}}
                        >
                            <Icon name="heart" size={20} color="#fff"/>
                            <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                                Tandai Produk Ini
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                :
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{ width:'50%'}}>
                            <View style={{flexDirection:'row', padding:height*0.01, justifyContent:'space-around', alignItems:'center'}}>
                                <Icon name="cloud-download" size={height*0.04} color="#07A9F0"/>
                                <Text style={{fontSize:height*0.02, color:'#07A9F0'}}>Tawarkan Produk</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'50%'}} onPress={gotoPesan}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                style={{flexDirection:'row', padding:height*0.01,  justifyContent:'space-around', alignItems:'center'}}>
                                    <Icon name="send" size={height*0.04} color="#fff"/>
                                    <Text style={{fontSize:height*0.02, color:'#fff'}}>Pesan {"&"} Kirim</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                }
            
        </View>
    );
}

export default produkDetail;

const styles=StyleSheet.create({
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
})