import React,{useEffect} from 'react';
import { View, Image, Dimensions, ImageBackground, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Avatar, Button,Text, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient'


import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'

const { height, width } = Dimensions.get("window");

function jualanAnda(props) {
    const { height, width } = Dimensions.get("window");
    const haveProduk = true

    useEffect(() => {
        getListWishlist()
    }, [])

    //Pergi ke Hal List Produk
    const listProduk = (title) => {
        props.navigation.navigate('Produk',{title})      
    }

    const getListWishlist = () => {
        console.log("get")
    }
    

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar params={props} haveProduk={haveProduk}/>
            
            {!haveProduk ?
                <Image
                    source={require('../../assets/images/banner-home.png')}
                    style={{width:width*1, height:height*0.3}}
                    width={width*1}
                    height={height*0.3}
                />
            :
                <ImageBackground source={require('../../assets/images/banner-home2.png')} style={{justifyContent:'flex-start', height:height*0.2}}>
                    <View style={{width:'90%', alignSelf:'center'}}>
                        <Text style={{color:'white', marginVertical:5}}>Saldo Komisi dan Margin</Text>
                        <View style={{flexDirection:'row', marginVertical:5}}>
                            <Text style={{color:'white', fontSize:10, fontWeight:'bold'}}>Rp</Text>
                            <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}> 21.000</Text>
                        </View>
                        <Text style={{color:'white', marginVertical:5}}>Per 10 Produk</Text>
                    </View>
                </ImageBackground>
            }

            <View style={{width:'90%', alignSelf:'center', marginTop:height*-0.05, flex:1}}>

                <View style={[styles.shadow, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius:10}]}>
                    <Icon style={{padding:10}} name="magnify" size={20} color="#949494"/>
                    <TextInput
                        style={{
                            flex: 1, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 0, backgroundColor: '#fff', color: '#424242', height:50
                        }}
                        placeholder="Cari Produk"
                        underlineColorAndroid="transparent"
                    />
                </View>

                <TouchableOpacity onPress={() => listProduk('Produk Terlaris')} style={{marginTop:height*0.01}}>
                    <Card>
                        <Card.Cover source={require('../../assets/images/banner-terlaris.png')} style={{height:height*0.2,resizeMode:'cover'}}/>
                        <View style={{flexDirection:'row', justifyContent:'space-between', padding:10, alignItems:'center'}}>
                            <Text style={{fontSize:18}}>Produk Terlaris</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <Icon name="heart" size={16} color="#707070"/>
                                <Text style={{fontSize:14}}> 200 Orang </Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>

                {haveProduk &&
                    <TouchableOpacity onPress={() => listProduk('Produk Saya')} style={{marginTop:height*0.01}}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                            style={{padding:5, flexDirection:"row", borderRadius:10, justifyContent:'center', alignItems:'center'}}
                        >
                            <Icon name="store" size={height*0.04} color="#fff"/>
                            <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                                Produk Saya
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }

                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:height*0.01}}>
                    <TouchableOpacity onPress={() => listProduk('Komisi Terbesar')} style={{width:'30%'}}>
                        <ImageBackground imageStyle={{borderRadius:20}} source={require('../../assets/images/komisi-terbesar.png')} style={{ justifyContent:'flex-end', padding:10, height:height*0.2, }}>
                            <Text style={{color:'white'}}>Komisi Terbesar</Text>
                            <Text style={{color:'white'}}>500 Rb</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => listProduk('Produk Disukai')} style={{width:'30%'}}>
                        <ImageBackground imageStyle={{borderRadius:20}} source={require('../../assets/images/produk-disukai.png')} style={{justifyContent:'flex-end',  padding:10, height:height*0.2, }}>
                            <Text style={{color:'white'}}>Produk Disukai</Text>
                            <Text style={{color:'white'}}>123 Produk</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity imageStyle={{borderRadius:20}} onPress={() => listProduk('Produk Lain')} style={{width:'30%'}}>
                        <ImageBackground source={require('../../assets/images/produk-lain.png')} style={{justifyContent:'flex-end',  padding:10, height:height*0.2, }}>
                            <Text style={{color:'white'}}>Produk Lain</Text>
                            <Text style={{color:'white'}}>123 Produk</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>

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
    }
})