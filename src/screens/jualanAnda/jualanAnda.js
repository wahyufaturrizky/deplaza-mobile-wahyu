import React,{useEffect, useState} from 'react';
import { View, Image, Dimensions, ImageBackground, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Avatar, Button,Text, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient'
import {URL} from '../../utils/global'


import Appbar from '../../components/appbarHome'
import AppbarT from '../../components/appBarTransparent'
import BottomTab from '../../components/bottomTab'
import Loading from '../../components/loading'

const { height, width } = Dimensions.get("window");

function jualanAnda(props) {
    const [wishlist,setWishlist] = useState(0)
    const [loading, setLoading] = useState(true)
    // const [haveProduk, setHaveProduk] = useState(true)
 
    const { height, width } = Dimensions.get("window");
    const haveProduk = true
    const urlWishlist = URL+"v1/wishlist/me" 

    useEffect(() => {
        getListWishlist()
    }, [])

    //Pergi ke Hal List Produk
    const listProduk = (title) => {
        props.navigation.navigate('Produk',{title})      
    }

    const gotoPesanan = () => {
        props.navigation.navigate("PesananSaya", {title:"Pesanan Saya"})
    }

    const gotoKategori = () => {
        props.navigation.navigate("Kategori", {title:"Produk Lain"})
    }

    const gotoWishlist = () => {
        props.navigation.navigate('Wishlist',{title:"Produk Saya"})      
    }

    const getListWishlist = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlWishlist, {headers})
            .then(response => response.json())
            .then(responseData => {
                setLoading(false)
                let totalData = responseData.data.length
                console.log(totalData)
                setWishlist(totalData)
            })
            .catch(e => console.log(e))
    }
    

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            {wishlist>0 ?
                <AppbarT params={props} haveProduk={haveProduk} wishlist={wishlist}/>
            :
                <Appbar params={props} haveProduk={haveProduk} wishlist={wishlist}/>
            }
            
            {wishlist<1 ?
                <Image
                    source={require('../../assets/images/banner-home.png')}
                    style={{width:width*1, height:height*0.25}}
                    width={width*1}
                    height={height*0.25}
                    resizeMode="stretch"
                />
            :
                <ImageBackground source={require('../../assets/images/banner-home2.png')} style={{justifyContent:'flex-start', height:height*0.2}}>
                    <View style={{width:'90%', alignSelf:'center', marginTop:height*0.08}}>
                        <Text style={{color:'white', marginVertical:5}}>Saldo Komisi dan Margin</Text>
                        <View style={{flexDirection:'row', marginVertical:5}}>
                            <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Rp</Text>
                            <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>21.000 / 10 Produk</Text>
                        </View>
                    </View>
                </ImageBackground>
            }

            <View style={{width:'90%', alignSelf:'center', marginTop:height*-0.02, flex:1}}>
                { wishlist>0 &&
                    <View style={[styles.shadow, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius:10}]}>
                        <Icon style={{padding:10}} name="magnify" size={20} color="#949494"/>
                        <TextInput
                            style={{
                                flex: 1, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 0, backgroundColor: '#fff', color: '#424242', height:50
                            }}
                            placeholder="Cari Produk"
                            underlineColorAndroid="transparent"
                        />
                        <Icon style={{padding:10}} name="camera" size={30} color="#07A9F0"/>
                    </View>
                }

                <TouchableOpacity onPress={() => listProduk('Produk Terlaris')} style={{marginTop:height*0.01}}>
                    <Card>
                        <Card.Cover source={require('../../assets/images/banner-terlaris.png')} style={{height:height*0.2,resizeMode:'cover'}}/>
                        <View style={{flexDirection:'row', justifyContent:'space-between', padding:10, alignItems:'center'}}>
                            <Text style={{fontSize:16}}>Produk Terlaris</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <Icon name="heart" size={16} color="#707070"/>
                                <Text style={{fontSize:10}}> 200 Orang </Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>

                {wishlist>0 &&
                    <TouchableOpacity onPress={gotoWishlist} style={{marginTop:height*0.01}}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                            style={{padding:15, flexDirection:"row", borderRadius:10, justifyContent:'center', alignItems:'center'}}
                        >
                            {/* <Icon name="store" size={height*0.04} color="#fff"/> */}
                            <Image
                                source={require('../../assets/images/box2.png')}
                                style={{width:width*0.05, height:width*0.05}}
                            />
                            <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                                Produk Saya
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }

                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:height*0.01}}>
                    { wishlist>0 &&
                        <TouchableOpacity imageStyle={{borderRadius:20}} onPress={() => gotoPesanan()} style={{width:'32%'}}>
                            <ImageBackground source={require('../../assets/images/produk-lain.png')} resizeMode="stretch" style={{justifyContent:'flex-end',  padding:10, height:height*0.2, }}>
                                <Text style={{color:'white', marginLeft:width*0.01, fontSize:width*0.02}}>Pesanan Saya</Text>
                                <View style={{alignItems:'center', flexDirection:'row',  marginBottom:height*0.01, marginLeft:width*0.01}}>
                                    <Icon name="circle" size={width*0.01} color="#fff"/>
                                    <Text style={{color:'white', marginLeft:width*0.01, fontSize:width*0.02}}>123 produk</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        // <TouchableOpacity imageStyle={{borderRadius:20}} onPress={() => gotoPesanan()} style={{width:'32%'}}>
                        //     <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                        //     <ImageBackground source={require('../../assets/images/produk-lain.png')} resizeMode="stretch" style={{justifyContent:'flex-end',  padding:10, height:height*0.2, }}>
                        //         <Text style={{color:'white', marginLeft:width*0.01, fontSize:width*0.02}}>Pesanan Saya</Text>
                        //         <View style={{alignItems:'center', flexDirection:'row',  marginBottom:height*0.01, marginLeft:width*0.01}}>
                        //             <Icon name="shopping" size={width*0.1} color="#000"/>
                        //             <Text style={{color:'black', fontSize:width*0.03}}>Pesanan Saya</Text>
                        //         </View>
                        //     </ImageBackground>
                        //     </View>
                        // </TouchableOpacity>
                    }

                    { wishlist==0 &&
                    <TouchableOpacity onPress={() => listProduk('Komisi Terbesar')} style={{width:'32%'}}>
                        <ImageBackground imageStyle={{borderRadius:20}} source={require('../../assets/images/komisi-terbesar.png')} resizeMode="stretch" style={{ justifyContent:'flex-end', padding:10, height:height*0.2, }}>
                            <Text style={{color:'white', fontSize:width*0.02, marginLeft:width*0.01}}>Komisi Terbesar</Text>
                            <View style={{alignItems:'center', flexDirection:'row',  marginBottom:height*0.01, marginLeft:width*0.01}}>
                                <Icon name="circle" size={width*0.01} color="#fff"/>
                                <Text style={{color:'white', marginLeft:width*0.01, fontSize:width*0.02}}>500 Rb</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={() => listProduk('Paling Disukai')} style={{width:'32%'}}>
                        <ImageBackground imageStyle={{borderRadius:20}} source={require('../../assets/images/produk-disukai.png')} resizeMode="stretch" style={{justifyContent:'flex-end',  padding:10, height:height*0.2, }}>
                            <Text style={{color:'white', marginLeft:width*0.01, fontSize:width*0.02}}>Paling Disukai</Text>
                            <View style={{alignItems:'center', flexDirection:'row',  marginBottom:height*0.01, marginLeft:width*0.01}}>
                                <Icon name="circle" size={width*0.01} color="#fff"/>
                                <Text style={{color:'white', marginLeft:width*0.01, fontSize:width*0.02}}>123 produk</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    { wishlist>0 &&
                    <TouchableOpacity onPress={() => gotoKategori()} style={{width:'32%'}}>
                        <ImageBackground imageStyle={{borderRadius:20}} source={require('../../assets/images/komisi-terbesar.png')} resizeMode="stretch" style={{ justifyContent:'flex-end', padding:10, height:height*0.2, }}>
                            <Text style={{color:'white', fontSize:width*0.02, marginLeft:width*0.01}}>Produk Lain</Text>
                            <View style={{alignItems:'center', flexDirection:'row',  marginBottom:height*0.01, marginLeft:width*0.01}}>
                                <Icon name="circle" size={width*0.01} color="#fff"/>
                                <Text style={{color:'white', marginLeft:width*0.01, fontSize:width*0.02}}>123 produk</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    }

                    { wishlist==0 &&
                        <TouchableOpacity imageStyle={{borderRadius:20}} onPress={() => gotoKategori()} style={{width:'32%'}}>
                            <ImageBackground source={require('../../assets/images/produk-lain.png')} resizeMode="stretch" style={{justifyContent:'flex-end',  padding:10, height:height*0.2, }}>
                                <Text style={{color:'white', marginLeft:width*0.01, fontSize:width*0.02}}>Produk Lain</Text>
                                <View style={{alignItems:'center', flexDirection:'row',  marginBottom:height*0.01, marginLeft:width*0.01}}>
                                    <Icon name="circle" size={width*0.01} color="#fff"/>
                                    <Text style={{color:'white', marginLeft:width*0.01, fontSize:width*0.02}}>1 juta produk</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            {loading &&
                <Loading/>
            }

            <BottomTab {...props}/>

        </View>
    );
}

export default jualanAnda;

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
    },
    shadowBlue : {
        shadowColor: "#07A9F0",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        
        elevation: 22,
    }
})