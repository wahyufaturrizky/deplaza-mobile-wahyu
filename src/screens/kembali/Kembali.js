import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { RadioButton, TextInput, Checkbox, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'

import Appbar from '../../components/appbarHome';
import InputNormal from '../../components/inputNormal'
import {URL, formatRupiah} from '../../utils/global'
import Loading from '../../components/loading'

function Kembali(props) {
    const [checked, setChecked] = useState('first');
    const [check, setCheck] = useState(false);
    const [alasan, setAlasan] = useState("");
    const [alasanDetail, setAlasanDetail] = useState("");
    const [qty, setQty] = useState("0");

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
    const [total_price, setTotal_price] = useState(0)
    const [ammount, setAmmount] = useState(0)
    const [commission, setCommission] = useState(0)
    const [custom_commission, setCustom_commission] = useState(0)
    const [buktiBayar, setBuktiBayar] = useState(0)
    const [lengthBukti, setLengthBukti] = useState(0)
    const [trackingId, setTrackingId] = useState("")
    const [photo, setPhoto] = useState(0)

    const [productImages, setProductImages] = useState("https://via.placeholder.com/150")
    const [productName, setProductName] = useState("0")

    const urlRincianPesanan = URL+"/v1/orders/"
    const urlProdukDetail = URL+'v1/product/'
    const urlOrder = URL+'v1/orders/'

    const id_order = props.route.params.id
    const { height, width } = Dimensions.get("window");

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
                setColor(JSON.parse(responseData.data.details[0].variation).color[0])
                setQty(responseData.data.details[0].qty)
                setTotal_price(responseData.data.total_price)
                setAmmount(responseData.data.payment.ammount)
                setCommission(responseData.data.details[0].commission)
                setCustom_commission(responseData.data.details[0].custom_commission)
                
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
                        setProductDetail(responseData.data)
                        setProductName(responseData.data.name)
                        setProductImages(responseData.data.images[0].image_url)
                })
                
            })

    }

    const changeQty = (simbol) => {
        // let hargaProduk = parseInt(dataDetail.price_basic)
        // let totalOngkirNow = parseInt(totalOngkir)

        if(simbol === "+"){
            let qtynow = parseInt(qty)+1
            // setQty(qtynow, setTotalHarga((hargaProduk*qtynow)+totalOngkirNow),setTotalKomisi(dataDetail.price_commission*qtynow))
            setQty(qtynow)
        }else if(simbol === "-"){
            let qtynow = parseInt(qty)-1
            setQty(qtynow)
            // setQty(qtynow, setTotalHarga((hargaProduk*qtynow)+totalOngkirNow),setTotalKomisi(dataDetail.price_commission*qtynow))
        }
    }

    return (
        <View style={{backgroundColor:'white', flex:1}}>
            <Appbar params={props}/>

            <ScrollView>
                <View style={{padding:10, justifyContent:'space-around', alignItems:'center', flexDirection:'row', backgroundColor:'#F8F8F8'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <RadioButton
                            value="penukaran"
                            status={ checked === 'first' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('first')}
                        />
                        <Text> Penukaran</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <RadioButton
                            value="pengembalian"
                            status={ checked === 'second' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('second')}
                        />
                        <Text>Pengembalian</Text>
                    </View>
                </View>

                <View style={{width:'90%', alignSelf:'center'}}>
                    <View style={{padding:10, marginBottom:height*0.02}}>

                        <TextInput
                            label='Alasan Barang ditukar/dikembalikan'
                            value={alasan}
                            mode = "outlined"
                            onChangeText={(val)=> setAlasan(val)}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10}}
                            
                        />  

                        <TextInput
                            label='Alasan Detail'
                            value={alasanDetail}
                            mode = "outlined"
                            onChangeText={(val)=> setAlasanDetail(val)}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white', marginTop:height*0.005}}
                            multiline={true}
                            numberOfLines={4}
                        />  

                        <View style={{flexDirection:'row', width:'90%', alignSelf:'center', marginVertical:height*0.01, justifyContent:'space-between', alignItems:'center'}}>
                            <View style={{borderStyle:'dashed', padding:10, width:'45%', borderRadius:10, borderWidth:1, borderColor:'gray', justifyContent:'center', alignItems:'center'}}>
                                <Icon name="image" size={32} color="gray"/>
                                <Text style={{fontSize:14, textAlign:'center', color:'gray'}}>
                                    Tambahkan Gambar
                                </Text>
                            </View>

                            <View style={{borderStyle:'dashed', padding:10, width:'45%', borderRadius:10, borderWidth:1, borderColor:'gray', justifyContent:'center', alignItems:'center'}}>
                                <Icon name="video" size={32} color="gray"/>
                                <Text style={{fontSize:14, textAlign:'center', color:'gray'}}>
                                    Tambahkan Video 
                                </Text>
                            </View>
                        </View>

                        <View style={{backgroundColor:'#F8F8F8', padding:10}}>
                            <Text>*Mohon unggah gambar yang jelas dan asli dari produk yang dikirim untuk menghindari penolakan permintaan pengembalian Anda.</Text>
                        </View>

                    </View>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>

                <View style={{alignSelf:'center', flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:height*0.01, alignItems:'center'}}>
                    <Title>Jumlah</Title>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', width:'50%'}}>
                        <TouchableOpacity  onPress={() => changeQty("-")}>
                            <View style={{height:height*0.045, backgroundColor:'#D5D5D5', justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                                <Text style={{fontSize:20}}>-</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{borderWidth:1, borderColor:'#D5D5D5', width:'20%'}}>
                            <InputNormal
                                style={{borderColor:'rgb(18, 48, 92)',height:height*0.045, fontSize:10}}
                                value={qty.toString()}
                                disabled
                                editable={false}
                            />
                        </View>

                        <TouchableOpacity onPress={() => changeQty("+")}>
                            <View style={{height:height*0.045, backgroundColor:'#D5D5D5', justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                                <Text style={{fontSize:20}}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>

                <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01}}>
                    <View style={{padding:5}}>
                        <Title>Alamat Pengiriman</Title>

                        <View style={{marginTop:height*0.02}}>
                            <Text style={{fontSize:16}}>{receiver_name}</Text>
                            <Text style={{fontSize:14}}>{receiver_address}</Text>
                            <Text style={{fontSize:16}}>{phone}</Text>
                        </View>
                    </View>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>

                <View style={{flexDirection:'row', justifyContent:'flex-start', width:'90%', alignSelf:'center', alignItems:'center'}}>
                    <Checkbox
                        status={check ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setCheck(!check);
                        }}
                    />
                    <Text> Saya Setuju untuk Mengembalikan Sesuai Kondisi Semula.</Text>
                </View>

            </ScrollView>

            {loading &&
                <Loading/>
            }

            <TouchableOpacity>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                    style={{padding:15, flexDirection:"row", justifyContent:'center', alignItems:'center'}}
                >
                    <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                        Kirim
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
}

export default Kembali;