import React from 'react';
import { View, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Avatar, Button,Text, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'

const { height, width } = Dimensions.get("window");

function jualanAnda(props) {

    const listProduk = () => {
        props.navigation.navigate('Produk')      
    }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar/>
            
            <Image
                source={require('../../assets/images/banner-home.png')}
                style={{width:'100%'}}
            />

            <View style={{width:'90%', alignSelf:'center', marginTop:-50, flex:1}}>
                <TouchableOpacity onPress={listProduk}>
                    <Card>
                        <Card.Cover source={require('../../assets/images/banner-terlaris.png')} />
                        <View style={{flexDirection:'row', justifyContent:'space-around', padding:10, alignItems:'center'}}>
                            <Text style={{fontSize:24}}>Produk Terlaris</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Icon name="heart" size={24} color="#707070"/>
                                <Text style={{fontSize:16}}> 200 Orang </Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>

                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <ImageBackground width={'30%'} source={require('../../assets/images/komisi-terbesar.png')} style={{justifyContent:'flex-end', padding:15, height:200, borderRadius:30}}>
                        <Text style={{color:'white'}}>Komisi Terbesar</Text>
                        <Text style={{color:'white'}}>500 Rb</Text>
                    </ImageBackground>
                    <ImageBackground width={'30%'} source={require('../../assets/images/produk-disukai.png')} style={{justifyContent:'flex-end',  padding:15, height:200, borderRadius:30}}>
                        <Text style={{color:'white'}}>Produk Disukai</Text>
                        <Text style={{color:'white'}}>123 Produk</Text>
                    </ImageBackground>
                    <ImageBackground width={'30%'} source={require('../../assets/images/produk-lain.png')} style={{justifyContent:'flex-end', padding:15, height:200, borderRadius:30}}>
                        <Text style={{color:'white'}}>Produk Lain</Text>
                        <Text style={{color:'white'}}>1 juta produk</Text>
                    </ImageBackground>
                </View>
            </View>

            <BottomTab/>

        </View>
    );
}

export default jualanAnda;