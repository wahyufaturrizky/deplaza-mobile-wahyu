import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'
import { Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

function produk(props) {
    const { height, width } = Dimensions.get("window");

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar/>

            <ScrollView style={{flex:1, marginTop:10}}>

                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        style={{height:'100%', width:'30%', borderRadius:10}}
                    />
                    <View style={{width:'60%'}}>
                        <Title style={{fontSize:16, lineHeight:18}}>Topi anti virus Corona/Pelindung wajah</Title>
                        <Text style={{fontSize:14}}>Mulai Dari Rp 45.000</Text>
                        <Text style={{color:'#949494'}}>Stok {'<'} 50</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'red'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'green'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'blue'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'yellow'}}></View>
                            </View>
                            <TouchableOpacity style={{width:'35%'}}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        style={{height:'100%', width:'30%', borderRadius:10}}
                    />
                    <View style={{width:'60%'}}>
                        <Title style={{fontSize:16, lineHeight:18}}>Topi anti virus Corona/Pelindung wajah</Title>
                        <Text style={{fontSize:14}}>Mulai Dari Rp 45.000</Text>
                        <Text style={{color:'#949494'}}>Stok {'<'} 50</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'red'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'green'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'blue'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'yellow'}}></View>
                            </View>
                            <TouchableOpacity style={{width:'35%'}}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        style={{height:'100%', width:'30%', borderRadius:10}}
                    />
                    <View style={{width:'60%'}}>
                        <Title style={{fontSize:16, lineHeight:18}}>Topi anti virus Corona/Pelindung wajah</Title>
                        <Text style={{fontSize:14}}>Mulai Dari Rp 45.000</Text>
                        <Text style={{color:'#949494'}}>Stok {'<'} 50</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'red'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'green'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'blue'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'yellow'}}></View>
                            </View>
                            <TouchableOpacity style={{width:'35%'}}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        style={{height:'100%', width:'30%', borderRadius:10}}
                    />
                    <View style={{width:'60%'}}>
                        <Title style={{fontSize:16, lineHeight:18}}>Topi anti virus Corona/Pelindung wajah</Title>
                        <Text style={{fontSize:14}}>Mulai Dari Rp 45.000</Text>
                        <Text style={{color:'#949494'}}>Stok {'<'} 50</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'red'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'green'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'blue'}}></View>
                                <View style={{width:width*0.05, height:height*0.03, backgroundColor: 'yellow'}}></View>
                            </View>
                            <TouchableOpacity style={{width:'35%'}}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                

            </ScrollView>

            <BottomTab/>

        </View>
    );
}

export default produk;

const styles=StyleSheet.create({
    shadow:{
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        }
})