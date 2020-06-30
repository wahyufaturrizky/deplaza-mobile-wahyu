import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Clipboard from "@react-native-community/clipboard";
import { TextInput, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import {Picker} from '@react-native-community/picker'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {URL} from '../../utils/global'

import Appbar from '../../components/appbarHome';
import produkDetail from '../produkDetail/produkDetail';

function Pesan(props) {
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [provinsi, setProvinsi] = useState("=Provinsi=");
    const [kota, setKota] = useState("=Kota=");
    const [pos, setPos] = useState("");
    const [alamat, setAlamat] = useState("");
    const [metode, setMetode] = useState(true); //True = Metode Bank
    const [qty, setQty] = useState(1)
    const [copy, setCopy] = useState(false)
    const [dataDetail, setDataDetail] = useState([])
    const [productDetail, setProductDetail] = useState([])


    const urlRincianPesanan = URL+"/v1/orders/"
    const urlProdukDetail = URL+'v1/product/'
    
    const id_order = props.route.params.id
    const { height, width } = Dimensions.get("window");

    useEffect(() => {
        getRincianPesanan()
    }, [])

    const ubahPembayaran = () => {
        setMetode(!metode)
    }

    const gotoPesanan = () => {
        props.navigation.navigate("PesananSaya", {title:"Pesanan Saya"})
    }

    const copyToClipboard = async() => {
        const copyText = dataDetail.invoice
        Clipboard.setString(copyText)
        setCopy(true)
    }

    const getRincianPesanan = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlRincianPesanan+id_order, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                setDataDetail(responseData.data, console.log(JSON.parse(dataDetail.details[0].variation).color[0]))

                let id_produk = responseData.data.details[0].product_id
                // console.log(responseData.data.details[0].product_id)

                fetch(urlProdukDetail+id_produk, {headers})
                    .then(response => response.json())
                    .then(responseData => {
                        // console.log(responseData.data.images[0].file_upload)
                        // setProductDetail(responseData.data, console.log(productDetail))
                })
                
            })

    }

    const _onDismissSnackBar = () => setCopy(false)


    return (
        <View style={{backgroundColor:'white', flex:1}}>
            <Appbar params={props}/>

            <ScrollView>
                <View style={{backgroundColor:'#93DCFC', padding:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Icon name="alert" size={20} color="#07A9F0"/>
                    <Text> Pesanan Anda Tidak Dapat Dibatalkan</Text>
                </View>

                <View style={{backgroundColor:'#F8F8F8', padding:10}}>
                    <Text style={{fontSize:18}}>Metode Pembayaran</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View>
                            <Text style={{fontWeight:'bold', fontSize:18}}>{dataDetail.payment.method.id != 1 ? "COD" : "TRANSFER BANK"} {dataDetail.invoice}</Text>
                            {/* <Text>JNE JN534120N101</Text> */}
                        </View>
                        <TouchableOpacity style={{backgroundColor:'#E6E6E6', width:'20%', padding:10, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}} onPress={copyToClipboard}>
                            <Icon name="content-copy" size={16}/>
                            <Text> No. Resi</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>

                <View style={{padding:10}}>

                    <View>
                        <Text style={{fontSize:18}}>Alamat Pengiriman</Text>
                        <View style={{marginTop:height*0.02}}>
                            <Text style={{fontSize:12}}>{dataDetail.delivery.receiver_name}</Text>
                            <Text style={{fontSize:12}}>{dataDetail.delivery.receiver_address}</Text>
                            <Text style={{fontSize:12}}>{dataDetail.customer.phone}</Text>
                        </View>
                    </View>

                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'flex-start', height:height*0.2}}>
                        <View style={{width:'30%'}}>
                            <Image
                                source={{uri:productDetail.images[0].file_upload}}
                                style={{width:'100%', height:height*0.2 , resizeMode:'cover'}}
                            />
                        </View>
                        <View style={{width:'60%', justifyContent:'space-between', height:'100%', flexDirection:'column'}}>
                            <View>
                                <Text style={{fontSize:18}}>{productDetail.name}</Text>
                                <View style={{flexDirection:'row', justifyContent:'space-between', width:'70%', alignItems:'center'}}>
                                    <View style={{width:'50%'}}>
                                        <Text>Rp. 67.000</Text>
                                        {/* <Text style={{fontSize:14, color:'gray'}}>Ukuran: XL</Text> */}
                                        <Text style={{fontSize:14, color:'gray'}}>Warna: {JSON.parse(dataDetail.details[0].variation).color[0]}</Text>
                                    </View>
                                    <Text style={{fontSize:14, color:'gray'}}>Jumlah: {dataDetail.details[0].qty}</Text>
                                </View>
                            </View>

                            {/* <View>
                                <TouchableOpacity style={{width:'90%', alignSelf:'center',}}>
                                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                        style={{padding:5, justifyContent:'center', alignItems:'center', borderRadius:10,}}
                                    >
                                        <Text style={{fontSize:20, textAlign:'center', color:'white'}}>
                                            Lacak
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                        
                    </View>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>

                <View style={{padding:10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                        <View>
                            <Text>Biaya Produk</Text>
                            <Text style={{color:'gray', fontSize:12}}>*Harga Sudah Termasuk Ongkir</Text>
                        </View>
                        <Text>Rp. {dataDetail.total_price}</Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View>
                            <Text>Tunai yang Dikumpulkan dari Pelanggan</Text>
                            <Text style={{color:'gray', fontSize:12}}>(Termasuk Margin Anda)</Text>
                        </View>
                        <Text>Rp. {dataDetail.payment.ammount}</Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                        <View>
                            <Text>Margin yang Anda Terima</Text>
                            <Text style={{color:'gray', fontSize:12}}>(Komisi + Tambahan Margin)</Text>
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <Text style={{fontSize:12}}>Rp. {dataDetail.details[0].commission} + Rp. {dataDetail.details[0].custom_commission}</Text>
                            <Text>Rp. {(parseInt(dataDetail.details[0].commission)+parseInt(dataDetail.details[0].custom_commission)).toString()}</Text>
                        </View>
                    </View>
                </View>
                
                <Snackbar
                    visible={copy}
                    onDismiss={_onDismissSnackBar}
                    duration = {1000}
                >
                    Nomor Resi Berhasil di Salin
                </Snackbar>

            </ScrollView>

            {/* <TouchableOpacity>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                    style={{padding:15, justifyContent:'center', alignItems:'center'}}
                >
                    <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                        Bukti Transfer Bank
                    </Text>
                </LinearGradient>
            </TouchableOpacity> */}
        </View>
    );
}

export default Pesan;