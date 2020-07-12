import React, {useState, useEffect} from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from "@react-native-community/clipboard";
import { TextInput, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import moment from "moment";

import AppBarHome from '../../components/appbarHome'
import Loading from '../../components/loading'

import {URL, formatRupiah} from '../../utils/global'
import { ScrollView } from 'react-native-gesture-handler';

function Lacak(props) {
    const [copy, setCopy] = useState(false)
    const [dataDetail, setDataDetail] = useState([])
    const [productDetail, setProductDetail] = useState([])
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

    const [productImages, setProductImages] = useState("https://via.placeholder.com/150")
    const [productName, setProductName] = useState("0")

    const [logs, setLogs] = useState([])

    const urlRincianPesanan = URL+"/v1/orders/"
    const urlProdukDetail = URL+'v1/product/'

    const {height,width} = Dimensions.get("window")

    useEffect(() => {
        getRincianPesanan()
    }, [])

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
                console.log(id_order)

                setDataDetail(responseData.data)

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
                setLogs(responseData.data.logs)
                // console.log(responseData.data.logs)
                
                setLengthBukti(responseData.data.payment.metadata_decode.length)
                
                if(responseData.data.payment.metadata_decode.length>0){
                    setBuktiBayar(responseData.data.payment.metadata_decode[0].bukti_bayar)
                }

                let id_produk = responseData.data.details[0].product_id
                // console.log(responseData.data.details[0].product_id)

                fetch(urlProdukDetail+id_produk, {headers})
                    .then(response => response.json())
                    .then(responseData => {
                        // console.log(responseData.data.images[0].file_upload)
                        setLoading(false)
                        console.log(responseData.data.id)
                        setProductDetail(responseData.data)
                        setProductName(responseData.data.name)
                        setProductImages(responseData.data.images[0].image_url)
                })
                
            })

    }

    const copyToClipboard = async() => {
        const copyText = dataDetail.invoice
        Clipboard.setString(copyText)
        setCopy(true)
    }

    const _onDismissSnackBar = () => setCopy(false)

    const id_order = props.route.params.id

    return (
       <View style={{backgroundColor:'white', flex:1}}>
           <AppBarHome params={props}/>


            <ScrollView>
            <View style={{padding:20, backgroundColor:'#f8f8f8', marginBottom:height*0.02}}>
                <Text style={{fontSize:16}}>Linimasa</Text>
            </View>

            {logs.map((data,i) => (
            <View key={i} style={{flexDirection:'row',  width:'90%', alignSelf:'center'}}>
                
                <View style={{alignItems:'center', marginRight:width*0.03}}>
                    <Image 
                        source={require('../../assets/images/EllipseNo.png')}
                        style={{width:width*0.05, height:width*0.05}}                    
                    />
                    <Image 
                        source={require('../../assets/images/Line.png')}
                        style={{width:width*0.005, height:height*0.1}}                    
                    />
                </View>
                
                <View>
                    <Text>{moment(data.created_at).format("D MMMM YYYY, h:mm A")}</Text>
                    <Text>{data.description}</Text>
                </View>
            </View>
            ))}

            

            <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

            <View style={{padding:20, marginTop:height*0.01}}>
                <Text style={{marginBottom:height*0.01, fontSize:16}}>Metode Pembayaran</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end'}}>
                    <View>
                            <Text style={{fontWeight:'bold', fontSize:18}}>{methodId != 1 ? "TRANSFER" : "COD"}</Text>
                            <Text>Kurir : JNE</Text>
                        
                            <Text>No. Resi :
                            {trackingId != "" ?
                                <Text>{trackingId}</Text>
                            :
                                <Text style={{color:'red'}}> Resi Belum di Input</Text>
                            }
                            </Text>
                        </View>
                        {trackingId != "" &&
                            <TouchableOpacity style={{backgroundColor:'#E6E6E6', width:'30%', padding:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={copyToClipboard}>
                                <Icon name="content-copy" size={16} color={"#07A9F0"}/>
                                <Text style={{color:'#07A9F0'}}> No. Resi</Text>
                            </TouchableOpacity>
                        }
                    </View>
            </View>

            <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

            <View style={{padding:20, marginTop:height*0.01}}>
                    <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'flex-start', height:height*0.2}}>
                        <View style={{width:'30%'}}>
                            <Image
                                source={{uri:productImages}}
                                style={{width:'100%', height:height*0.2 , resizeMode:'cover', borderRadius:10}}
                            />
                        </View>

                        <View style={{width:'60%', justifyContent:'space-between', height:'100%', flexDirection:'column'}}>
                            <View>
                                <Text style={{fontSize:18}}>{productName}</Text>
                                <Text>Rp. {formatRupiah(total_price)}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'50%', alignItems:'center'}}>
                                        {color !="" &&
                                            <View style={{width:'50%'}}>
                                                {/* <Text style={{fontSize:14, color:'gray'}}>Ukuran: XL</Text> */}
                                                {color !="" &&
                                                    <Text style={{fontSize:14, color:'gray'}}>Warna: {color}</Text>
                                                }
                                            </View>
                                        }
                                        <Text style={{fontSize:14, color:'gray', marginTop:height*0.01}}>Jumlah: {qty}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                        
                    </View>
                </View>
            </ScrollView>

            {loading &&
                <Loading />
            }

            <Snackbar
                visible={copy}
                onDismiss={_onDismissSnackBar}
                duration = {1000}
            >
                Nomor Resi Berhasil di Salin
            </Snackbar>

       </View>
    );
}

export default Lacak;