import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Clipboard from "@react-native-community/clipboard";
import { TextInput, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import {Picker} from '@react-native-community/picker'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {URL, formatRupiah} from '../../utils/global'
import Loading from '../../components/loading'
import ImagePicker from 'react-native-image-crop-picker';

import Appbar from '../../components/appbarHome';
import produkDetail from '../produkDetail/produkDetail';

function Pesan(props) {
    const [copy, setCopy] = useState(false)
    const [dataDetail, setDataDetail] = useState([])
    const [productDetail, setProductDetail] = useState([])
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [methodId, setMethodId] = useState(0)
    const [invoice, setInvoice] = useState("0")
    const [receiver_name, setReceiver_name] = useState("")
    const [receiver_address, setReceiver_address] = useState("")
    const [phone, setPhone] = useState("")
    const [color, setColor] = useState("")
    const [qty, setQty] = useState("")
    const [total_price, setTotal_price] = useState(0)
    const [ammount, setAmmount] = useState(0)
    const [commission, setCommission] = useState(0)
    const [custom_commission, setCustom_commission] = useState(0)
    const [buktiBayar, setBuktiBayar] = useState(0)
    const [lengthBukti, setLengthBukti] = useState(0)
    const [trackingId, setTrackingId] = useState("")
    const [photo, setPhoto] = useState(0)

    const [variation,setVariation] = useState([])

    const [productImages, setProductImages] = useState("https://via.placeholder.com/150")
    const [productName, setProductName] = useState("0")

    const urlRincianPesanan = URL+"/v1/orders/"
    const urlProdukDetail = URL+'v1/product/'
    const urlOrder = URL+'v1/orders/'
    
    const statusPesanan = "Pesanan Diterima"
    
    const id_order = props.route.params.id
    const { height, width } = Dimensions.get("window");

    useEffect(() => {
        getRincianPesanan()
    }, [])

    const modalTrigger = () => {
        setModal(!modal)
    }

    const gotoKembali = () => {
        props.navigation.navigate('Kembali',{title:"Kembalikan atau Tukar", id:id_order})      
    }

    const gotoLacak = () => {
        props.navigation.navigate('Lacak',{title:"Lacak", id:id_order})      
    }

    const gotoPesanan = () => {
        props.navigation.navigate("PesananSaya", {title:"Pesanan Saya"})      
    }

    const copyToClipboard = async() => {
        const copyText = dataDetail.invoice
        Clipboard.setString(copyText)
        setCopy(true)
    }

    const handleChoosePhoto = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        const options = {
          noData: true,
        }

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
        }

        let date = new Date(); //To add the time suffix in filename

        ImagePicker.openPicker({
            includeBase64:true,
            width: 768,
            height: 1080,
            cropping: true
        }).then(image => {
            console.log(urlOrder+id_order+"/pay-base");
            setPhoto(image)
            let image64 = `data:${image.mime};base64,${image.data}`;
            // console.log(image)

            let formdata = new FormData();
            formdata.append("proof_payment", image64)
            setLoading(true)
            
            fetch(urlOrder+id_order+"/pay-base", {method: 'POST', headers,
                body:formdata
            })
            .then(response => response.json())
            .then(async(responseData) => {
                console.log(responseData)
                // console.log(responseData.data.payment.metadata_decode[0].bukti_bayar)
                // setBuktiBayar(responseData.data.payment.metadata_decode[0].bukti_bayar)
                setLoading(false)
                setLengthBukti(1)
                gotoPesanan()
                alert("Bukti Transfer Berhasil Terupload")
                // gotoPesanan()
            })
        });
    }

    // Untuk Mengcoopy ID Invoice
    const getRincianPesanan = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        console.log(id_order)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlRincianPesanan+id_order, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                console.log(JSON.parse(responseData.data.details[0].variation))

                setDataDetail(responseData.data.details[0])
                setVariation(JSON.parse(responseData.data.details[0].variation))
                setMethodId(responseData.data.payment.method_id)
                setTrackingId(responseData.data.delivery.tracking_id)
                setInvoice(responseData.data.invoice)
                setReceiver_name(responseData.data.delivery.receiver_name)
                setReceiver_address(responseData.data.delivery.receiver_address)
                setPhone(responseData.data.customer.phone)
                // setColor(JSON.parse(responseData.data.details[0].variation).color[0])
                setQty(responseData.data.details[0].qty)
                setTotal_price(responseData.data.total_price)
                setAmmount(responseData.data.payment.ammount)
                setCommission(responseData.data.details[0].commission)
                setCustom_commission(responseData.data.details[0].custom_commission)
                
                
                if(responseData.data.payment.metadata_decode.length>0){
                    setBuktiBayar(responseData.data.payment.metadata_decode[0].bukti_bayar)
                    setLengthBukti(responseData.data.payment.metadata_decode.length)

                }

                let id_produk = responseData.data.details[0].product_id
                // console.log(responseData.data.details[0].product_id)

                fetch(urlProdukDetail+id_produk, {headers})
                    .then(response => response.json())
                    .then(responseData => {
                        // console.log(responseData.data.images[0].file_upload)
                        setLoading(false)
                        setProductDetail(responseData.data)
                        setProductName(responseData.data.name)
                        setProductImages(responseData.data.images[0].image_url)
                })
                
            })

    }

    // Fungsi yang jalan ketika snackbar menghilang
    const _onDismissSnackBar = () => setCopy(false)


    return (
        <View style={{backgroundColor:'white', flex:1}}>
            <Appbar params={props}/>
            
                <ScrollView>
                    
                    {/* <View style={{backgroundColor:'#93DCFC', padding:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Icon name="alert" size={20} color="#07A9F0"/>
                        <Text> Pesanan Anda Tidak Dapat Dibatalkan</Text>
                    </View> */}

                    {/* <View style={{backgroundColor:'#93DCFC', padding:15, justifyContent:'center', alignItems:'center'}}>
                        <Image
                            source={require('../../assets/images/Solid.png')}
                            style={{width:width*0.1, height:width*0.1, resizeMode:'cover'}}
                        />
                        <Text style={{marginTop:height*0.01, fontSize:14}}>Pesanan Diterima!</Text>
                    </View> */}

                    <View style={{backgroundColor:'#F8F8F8', padding:10}}>
                        <Text style={{fontSize:18}}>Metode Pembayaran</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <View style={{width:'70%',}}>
                                <Text style={{fontWeight:'bold', fontSize:18}}>{methodId != 1 ? "TRANSFER" : "COD"} {invoice}</Text>
                                {trackingId != "" ?
                                    <Text>JNE JN534120N101</Text>
                                :
                                    <Text style={{color:'red'}}>Resi Belum di Input</Text>
                                }
                            </View>
                            {trackingId != "" &&
                            <TouchableOpacity style={{backgroundColor:'#E6E6E6', width:'30%', padding:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={copyToClipboard}>
                                <Icon name="content-copy" size={16} color={"#07A9F0"}/>
                                <Text style={{color:'#07A9F0'}}> No. Resi</Text>
                            </TouchableOpacity>
                            }
                        </View>
                    </View>

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>

                    <View style={{padding:10}}>

                        <View>
                            <Text style={{fontSize:18}}>Alamat Pengiriman</Text>
                            <View style={{marginTop:height*0.02}}>
                                <Text style={{fontSize:16}}>{receiver_name}</Text>
                                <Text style={{fontSize:14}}>{receiver_address}</Text>
                                <Text style={{fontSize:16}}>{phone}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                    <View style={{padding:10}}>
                        <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'flex-start', height:height*0.2}}>
                            <View style={{width:'30%'}}>
                                <Image
                                    source={{uri:productImages}}
                                    style={{width:'100%', height:height*0.2 , resizeMode:'cover'}}
                                />
                            </View>
                            <View style={{width:'60%', justifyContent:'space-between', height:'100%', flexDirection:'column'}}>
                                <View>
                                    <Text style={{fontSize:18}}>{productName}</Text>
                                    <Text>Rp. {formatRupiah(total_price)}</Text>
                                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                        <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%', alignItems:'center'}}>
                                            <View style={{width:'60%'}}>
                                                {variation.map((val,i) => (
                                                        <Text style={{fontSize:12, color:'gray'}}>{Object.keys(val)[0]} : {val[Object.keys(val)[0]]}</Text>
                                                ))}
                                            </View>
                                            <Text style={{fontSize:12, color:'gray', marginTop:height*0.01}}>Jumlah: {qty}</Text>
                                        </View>

                                        <TouchableOpacity style={{width:'40%', alignSelf:'flex-end',}} onPress={gotoLacak}>
                                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                                style={{padding:5, justifyContent:'center', alignItems:'center', padding:8, borderRadius:10,}}
                                            >
                                                <Text style={{fontSize:14, textAlign:'center', color:'white'}}>
                                                    LACAK
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
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

                                <View>
                                    <TouchableOpacity style={{width:'90%', alignSelf:'center',}} onPress={gotoKembali}>
                                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                            style={{padding:5, justifyContent:'center', alignItems:'center', padding:8, borderRadius:10,}}
                                        >
                                            <Text style={{fontSize:16, textAlign:'center', color:'white'}}>
                                                Tukar / Kembalikan
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

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
                            <Text>Rp. {formatRupiah(total_price)}</Text>
                        </View>

                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <View>
                                <Text>Tunai yang Dikumpulkan dari Pelanggan</Text>
                                <Text style={{color:'gray', fontSize:12}}>(Termasuk Margin Anda)</Text>
                            </View>
                            <Text>Rp. {formatRupiah(ammount)}</Text>
                        </View>

                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                            <View>
                                <Text>Margin yang Anda Terima</Text>
                                <Text style={{color:'gray', fontSize:12}}>(Komisi + Tambahan Margin)</Text>
                            </View>
                            <View style={{alignItems:'flex-end'}}>
                                <Text style={{fontSize:12}}>Rp. {formatRupiah(commission)} + Rp. {formatRupiah(custom_commission)}</Text>
                                <Text>Rp. {formatRupiah(parseInt(commission)+parseInt(custom_commission)).toString()}</Text>
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

                    {modal &&
                        <View style={{position:'absolute', width:width, height:height, left:0, right:0,bottom:0, backgroundColor:'rgba(255,255,255,0.8)', padding:10, justifyContent:'center', alignItems:'center'}}>
                            <Image
                                source={{uri : buktiBayar}}
                                style={{width:'80%', height:'80%', resizeMode:'cover'}}
                            />
                            <TouchableOpacity onPress={modalTrigger} style={{marginTop:height*0.02,borderRadius:50, backgroundColor:'white' ,padding:10}}>
                                <Text style={{fontSize:30, textAlign:'center'}}>X</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </ScrollView>

                {loading &&
                    <Loading/>
                }

                <View></View>

            {lengthBukti > 0 ?
                <TouchableOpacity onPress={modalTrigger}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                        style={{padding:15, justifyContent:'center', alignItems:'center'}}
                    >
                        <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                            Bukti Transfer Bank
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            :
                <TouchableOpacity style={{width:'100%', alignSelf:'center'}} onPress={handleChoosePhoto}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                        style={{padding:15, justifyContent:'center', alignItems:'center', flexDirection:'row'}}
                    >
                        <Icon name="cloud-upload" size={32} color="#fff"/>
                        <Text style={{fontSize:20, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                            Upload Bukti Transfer
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>     
            }
        </View>
    );
}

export default Pesan;