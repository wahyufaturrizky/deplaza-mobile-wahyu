import React, { useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'

import Appbar from '../../components/appbarHome';
import BottomTab from '../../components/bottomTab'

function Bantuan(props) {
    const[bantu, setBantu] = useState(0)
    const[subBantu, setSubBantu] = useState(0)

    const changeSubBantu = (sub) => {
        setSubBantu(sub)
    }

    const changeBantu = (sub) => {
        setBantu(sub)
    }

    const gotoBantuanFoto = () => {
        props.navigation.navigate('BantuanFoto',{title:"Bantuan Foto"})      
    }

    const gotoBantuanJudul = () => {
        props.navigation.navigate('BantuanJudul',{title:"Bantuan Judul"})      
    }

    const gotoBantuanLain = () => {
        props.navigation.navigate('BantuanLain',{title:"Bantuan Lain"})      
    }

    const gotoBantuanFaq = () => {
        props.navigation.navigate('BantuanFaq',{title:"Bantuan FAQ"})      
    }

    const { height, width } = Dimensions.get("window");
    return (
       <View style={{flex:1}}>
           <Appbar params={props}/>

           <View style={{flex:1}}>
               {bantu === 0 &&
               <View>
                    <TouchableOpacity onPress={() => changeBantu(1)}>
                        <ImageBackground source={require('../../assets/images/bantuJualan1.png')} style={{justifyContent:'flex-end', padding:10, alignItems:'center', marginVertical:height*0.005, height:height*0.2}}>
                            {/* <View style={{width:'90%', alignSelf:'center'}}> */}
                                <Text style={{color:'white', marginVertical:5, fontSize:18}}>Solusi Instan</Text>
                                <Text style={{color:'white', marginBottom:height*0.01, fontSize:18}}>Mengingkatkan Jualan</Text>
                            {/* </View> */}
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* <TouchableOpacity>
                        <ImageBackground source={require('../../assets/images/bantuJualan2.png')} style={{justifyContent:'flex-end', padding:10, alignItems:'center', marginVertical:height*0.005, height:height*0.2}}>
                                <Text style={{color:'white', marginVertical:5, fontSize:18}}>Akademi Jualan Online</Text>
                                <Text style={{color:'white', marginBottom:height*0.01, fontSize:18}}>(Tersedia Tutorial Video)</Text>
                        </ImageBackground>
                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={gotoBantuanFaq}>
                        <ImageBackground source={require('../../assets/images/bantuJualan3.png')} style={{justifyContent:'center', padding:10, alignItems:'center', marginVertical:height*0.005, height:height*0.2}}>
                                <Text style={{color:'white', fontSize:22}}>FAQ</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                }

                {(bantu === 1 && subBantu !== 3) &&
                    <View style={{justifyContent:'center' , alignItems:'center', flex:1}}>
                        <Image
                            source={require('../../assets/images/folder.png')}
                            style={{width:width*0.2, height:width*0.2, resizeMode:'stretch', marginBottom:height*0.02}}
                        />
                        {subBantu === 0 &&
                            <View style={{alignItems:'center', width:'90%', alignSelf:'center'}}>
                                <Text style={{fontSize:22, fontWeight:'bold', marginBottom:height*0.02, textAlign:'center'}}>Apakah Produk Anda Belum Laku ?</Text>
                                <TouchableOpacity onPress={() => changeSubBantu(1)} style={{justifyContent:'center', alignItems:'center', borderRadius:100, backgroundColor:'#0956C6', width:width*0.3, height:width*0.3}}>
                                    <Text style={{fontSize:22, fontWeight:'bold', color:"white"}}>YA</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {subBantu === 1 &&
                            <View style={{alignItems:'center', width:'90%', alignSelf:'center'}}>
                                <Text style={{fontSize:22, fontWeight:'bold', marginBottom:height*0.02, textAlign:'center'}}>Dimana Anda Menjual Produk Anda ?</Text>
                                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                    <TouchableOpacity onPress={() => changeSubBantu(2)} style={{justifyContent:'center', alignItems:'center', borderRadius:100, backgroundColor:'#2196F3', width:width*0.2, height:width*0.2}}>
                                        <Image
                                            source={require('../../assets/images/whatsapp.png')}
                                            style={{width:width*0.05, height:width*0.05, resizeMode:'cover', marginBottom:height*0.01}}
                                        />
                                        <Text style={{fontSize:14, textAlign:'center', fontWeight:'bold', color:"white"}}>Whatsapp Bussiness</Text>
                                    </TouchableOpacity>

                                    <View style={{justifyContent:'space-between', alignItems:'center'}}>
                                        <TouchableOpacity onPress={() => changeSubBantu(2)} style={{justifyContent:'center', alignItems:'center', marginBottom:height*0.03, borderRadius:100, backgroundColor:'#0956C6', width:width*0.3, height:width*0.3}}>
                                            <Image
                                                source={require('../../assets/images/facebook.png')}
                                                style={{width:width*0.08, height:width*0.08, resizeMode:'cover', marginBottom:height*0.01}}
                                            />
                                            <Text style={{fontSize:18, textAlign:'center', fontWeight:'bold', color:"white"}}>Facebook Marketplace</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => changeSubBantu(2)} style={{justifyContent:'center', alignItems:'center', borderRadius:100, backgroundColor:'#2196F3', width:width*0.2, height:width*0.2}}>
                                            <Image
                                                source={require('../../assets/images/store.png')}
                                                style={{width:width*0.05, height:width*0.05, resizeMode:'cover', marginBottom:height*0.01}}
                                            />
                                            <Text style={{fontSize:14, fontWeight:'bold', color:"white"}}>Marketplace</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={() => changeSubBantu(2)} style={{justifyContent:'center', alignItems:'center', borderRadius:100, backgroundColor:'#2196F3', width:width*0.2, height:width*0.2}}>
                                        <Image
                                            source={require('../../assets/images/instagram.png')}
                                            style={{width:width*0.05, height:width*0.05, resizeMode:'cover', marginBottom:height*0.01}}
                                        />
                                        <Text style={{fontSize:14, textAlign:'center', fontWeight:'bold', color:"white"}}>Instagram Bussiness</Text>
                                    </TouchableOpacity>

                                </View>

                                
                            </View>
                        }
                        {subBantu === 2 &&
                            <View style={{alignItems:'center', width:'90%', alignSelf:'center'}}>
                                <Text style={{fontSize:22, fontWeight:'bold', marginBottom:height*0.02, textAlign:'center'}}>Sudahkah Anda Memposting Minimal 5 Kali Perhari ?</Text>
                                <View style={{justifyContent:'space-between', alignItems:'center', flexDirection:'row', width:'100%'}}>
                                    <TouchableOpacity onPress={() => setSubBantu(3)} style={{justifyContent:'center', alignItems:'center', borderRadius:100, backgroundColor:'#0956C6', width:width*0.3, height:width*0.3}}>
                                        <Text style={{fontSize:22, fontWeight:'bold', color:"white"}}>Sudah</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => setSubBantu(3)} style={{justifyContent:'center', alignItems:'center', borderRadius:100, backgroundColor:'#D5D5D5', width:width*0.3, height:width*0.3}}>
                                        <Text style={{fontSize:22, fontWeight:'bold', color:"black"}}>Belum</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                }

                {subBantu === 3 &&
                    <View style={{alignItems:'center', flex:1}}>

                        <Image
                            source={require('../../assets/images/idea.png')}
                            style={{width:width*0.2, height:width*0.2, resizeMode:'stretch', marginBottom:height*0.02}}
                        />
                        <View style={{alignItems:'center', width:'90%', alignSelf:'center'}}>
                            <Text style={{fontSize:22, fontWeight:'bold', marginBottom:height*0.02, textAlign:'center'}}>Mungkin Masalah Anda Disini</Text>  
                        </View>

                        <View style={{marginBottom:height*0.01}}>
                            <TouchableOpacity onPress={gotoBantuanFoto}>
                                <ImageBackground source={require('../../assets/images/bantuJualan4.png')} style={{justifyContent:'flex-end', padding:10, alignItems:'center', width:width*1, marginBottom:height*0.005, height:height*0.17}}>
                                    {/* <View style={{width:'90%', alignSelf:'center'}}> */}
                                        <Text style={{color:'white', marginVertical:10, fontSize:18}}>Foto Anda Kurang Menarik</Text>
                                    {/* </View> */}
                                </ImageBackground>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={gotoBantuanJudul} >
                                <ImageBackground source={require('../../assets/images/bantuJualan5.png')} style={{justifyContent:'flex-end', padding:10, alignItems:'center', width:width*1, marginBottom:height*0.005, height:height*0.17}}>
                                    {/* <View style={{width:'90%', alignSelf:'center'}}> */}
                                        <Text style={{color:'white', marginVertical:10, fontSize:18}}>Judul postingan Anda Kurang Menarik</Text>
                                    {/* </View> */}
                                </ImageBackground>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <ImageBackground source={require('../../assets/images/bantuJualan6.png')} style={{justifyContent:'flex-end', padding:10, alignItems:'center', width:width*1, marginBottom:height*0.005, height:height*0.17}}>
                                    {/* <View style={{width:'90%', alignSelf:'center'}}> */}
                                        <Text style={{color:'white', marginVertical:10, fontSize:18}}>Lokasi Anda Belum Tepat</Text>
                                    {/* </View> */}
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity onPress={gotoBantuanLain}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                    style={{padding:height*0.02, justifyContent:'center', alignItems:'center', borderRadius:20}}
                                >
                                    <Text style={{fontSize:24, textAlign:'center', color:'white'}}>
                                        Apakah Masalah Anda Berbeda ?
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        
                    </View>
                }
           </View>

           <BottomTab {...props}/>
       </View>
    );
}

export default Bantuan;