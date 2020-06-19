import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'
import { Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

function produk(props) {
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar/>

            <ScrollView style={{flex:1, marginTop:10}}>

                <View style={[styles.shadow, {flexDirection:'row', marginVertical:10, justifyContent:'space-between', width:'90%', paddingTop:5, paddingRight:10, alignSelf:'center', borderRadius:10}]}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        style={{height:'100%', borderRadius:10}}
                    />
                    <View style={{width:'60%'}}>
                        <Title>Topi anti virus Corona/Pelindung wajah</Title>
                        <Text>Mulai Dari Rp 45.000</Text>
                        <Text style={{color:'#949494'}}>Stok {'<'} 50</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                                <View style={{width:30, height:30, backgroundColor: 'red'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'green'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'blue'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'yellow'}}></View>
                            </View>
                            <TouchableOpacity style={{width:'35%'}}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.shadow, {flexDirection:'row', marginVertical:10, justifyContent:'space-between', width:'90%', paddingTop:5, paddingRight:10, alignSelf:'center', borderRadius:10}]}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        style={{height:'100%', borderRadius:10}}
                    />
                    <View style={{width:'60%'}}>
                        <Title>Topi anti virus Corona/Pelindung wajah</Title>
                        <Text>Mulai Dari Rp 45.000</Text>
                        <Text style={{color:'#949494'}}>Stok {'<'} 50</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                                <View style={{width:30, height:30, backgroundColor: 'red'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'green'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'blue'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'yellow'}}></View>
                            </View>
                            <TouchableOpacity style={{width:'35%'}}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.shadow, {flexDirection:'row', marginVertical:10, justifyContent:'space-between', width:'90%', paddingTop:5, paddingRight:10, alignSelf:'center', borderRadius:10}]}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        style={{height:'100%', borderRadius:10}}
                    />
                    <View style={{width:'60%'}}>
                        <Title>Topi anti virus Corona/Pelindung wajah</Title>
                        <Text>Mulai Dari Rp 45.000</Text>
                        <Text style={{color:'#949494'}}>Stok {'<'} 50</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                                <View style={{width:30, height:30, backgroundColor: 'red'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'green'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'blue'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'yellow'}}></View>
                            </View>
                            <TouchableOpacity style={{width:'35%'}}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.shadow, {flexDirection:'row', marginVertical:10, justifyContent:'space-between', width:'90%', paddingTop:5, paddingRight:10, alignSelf:'center', borderRadius:10}]}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        style={{height:'100%', borderRadius:10}}
                    />
                    <View style={{width:'60%'}}>
                        <Title>Topi anti virus Corona/Pelindung wajah</Title>
                        <Text>Mulai Dari Rp 45.000</Text>
                        <Text style={{color:'#949494'}}>Stok {'<'} 50</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                                <View style={{width:30, height:30, backgroundColor: 'red'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'green'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'blue'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'yellow'}}></View>
                            </View>
                            <TouchableOpacity style={{width:'35%'}}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
                <View style={[styles.shadow, {flexDirection:'row', marginVertical:10, justifyContent:'space-between', width:'90%', paddingTop:5, paddingRight:10, alignSelf:'center', borderRadius:10}]}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        style={{height:'100%', borderRadius:10}}
                    />
                    <View style={{width:'60%'}}>
                        <Title>Topi anti virus Corona/Pelindung wajah</Title>
                        <Text>Mulai Dari Rp 45.000</Text>
                        <Text style={{color:'#949494'}}>Stok {'<'} 50</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                                <View style={{width:30, height:30, backgroundColor: 'red'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'green'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'blue'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'yellow'}}></View>
                            </View>
                            <TouchableOpacity style={{width:'35%'}}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.shadow, {flexDirection:'row', marginVertical:10, justifyContent:'space-between', width:'90%', paddingTop:5, paddingRight:10, alignSelf:'center', borderRadius:10}]}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        style={{height:'100%', borderRadius:10}}
                    />
                    <View style={{width:'60%'}}>
                        <Title>Topi anti virus Corona/Pelindung wajah</Title>
                        <Text>Mulai Dari Rp 45.000</Text>
                        <Text style={{color:'#949494'}}>Stok {'<'} 50</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                                <View style={{width:30, height:30, backgroundColor: 'red'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'green'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'blue'}}></View>
                                <View style={{width:30, height:30, backgroundColor: 'yellow'}}></View>
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
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,
    }
})