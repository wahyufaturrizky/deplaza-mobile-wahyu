import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { RadioButton, TextInput, Checkbox, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'
import {Picker} from '@react-native-community/picker'
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
// import axios from 'axios'
// import ImagePicker from 'react-native-image-picker';

import Appbar from '../../components/appbarHome';
import InputNormal from '../../components/inputNormal'
import {URL, formatRupiah} from '../../utils/global'
import Loading from '../../components/loading'

function Kembali(props) {
    const [checked, setChecked] = useState('penukaran');
    const [check, setCheck] = useState(false);
    const [alasan, setAlasan] = useState("");
    const [alasanDetail, setAlasanDetail] = useState("");
    const [qty, setQty] = useState("0");
    const [selectQty, setSelectQty] = useState("0");
    const [files, setFiles] = useState([]);

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

    const [video, setVideo] = useState([])
    const [image, setImage] = useState([])

    const [productImages, setProductImages] = useState("https://via.placeholder.com/150")
    const [productName, setProductName] = useState("0")
    const [reasonComplaint, setReasonComplaint] = useState([])
    const [selectReason, setSelectReason] = useState("kosong")

    const urlRincianPesanan = URL+"/v1/orders/"
    const urlProdukDetail = URL+'v1/product/'
    const urlReasonComplaint = URL+'v1/complaint/reason'
    const urlComplaint = URL+'v1/complaint'

    const id_order = props.route.params.id
    const { height, width } = Dimensions.get("window");

    useEffect(() => {
        getRincianPesanan()
        getReasonComplaint()    
    }, [])

    const gotoPesanan = () => {
        props.navigation.navigate("PesananSaya", {title:"Pesanan Saya"})
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
                console.log(responseData.data)

                setDataDetail(responseData.data)

                setMethodId(responseData.data.payment.method_id)
                setTrackingId(responseData.data.delivery.tracking_id)
                setInvoice(responseData.data.invoice)
                setReceiver_name(responseData.data.delivery.receiver_name)
                setReceiver_address(responseData.data.delivery.receiver_address)
                setPhone(responseData.data.customer.phone)
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

                fetch(urlProdukDetail+id_produk, {headers})
                    .then(response => response.json())
                    .then(responseData => {
                        setLoading(false)
                        setProductDetail(responseData.data)
                        setProductName(responseData.data.name)
                        setProductImages(responseData.data.images[0].image_url)
                })
                
            })

    }

    const getReasonComplaint = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlReasonComplaint, {headers})
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData.data)
                setReasonComplaint(responseData.data)
            })

    }

    const changeQty = (simbol) => {
        if(simbol === "+"){
            let qtynow = parseInt(selectQty)+1
            if(qtynow>qty){
                setSelectQty(qty)
                alert("Maksimal Kuantiti Adalah = " +qty)
            }else{
                setSelectQty(qtynow)
            }
        }else if(simbol === "-"){
            let qtynow = parseInt(selectQty)-1
            if(qtynow<1) {
                setSelectQty(1)
                alert("Maksimal Kuantiti Adalah = 1")
            }else{
                setSelectQty(qtynow)
            }
        }
    }

    const handleChoosePhoto = () => {
        let date = new Date(); //To add the time suffix in filename
        ImagePicker.openPicker({
            multiple: true,
            // includeBase64:true,\
        }).then(image => {
            console.log(image)
            setImage(image)
            // let image64 = `data:${image.mime};base64,${image.data}`;
            // setFiles(image64)
            // console.log(image)
        });

    }

    const handleChooseVideo = () => {
        let date = new Date(); //To add the time suffix in filename
        ImagePicker.openPicker({
            mediaType: "video",
        }).then((video) => {
            setVideo(video)
            // let image64 = `data:${image.mime};base64,${image.data}`;
            // setFiles(image64)
            // console.log(image)
        });

    }

    const postTukar = async() => {
        setLoading(false)
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        const options = {
          noData: true,
        }

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
            "content-type": 'multipart/form-data'
        }

        let formData = new FormData();
        formData.append("reason_id", selectReason)
        formData.append("order_id", id_order)
        formData.append("description", checked+" : "+alasanDetail)
        formData.append("qty", qty)
        formData.append("address_id", 1)

        // let filename = image[0].path.substr(8)
        // let fileUrl = (!filename.match(/^file:/) ? 'file://' : '') + filename
        // let fileMeta = {
        //     uri: fileUrl,
        //     type: 'image/jpeg',
        //     name: fileUrl.split(/[\\/]/).pop() // basename
        // }
        // formData.append('files[]', fileMeta)
        

        const photos = image
        photos.forEach((photo) => {
                formData.append('files[]', {
                uri: photo.path,
                type: 'image/jpeg', // or photo.type
                name: 'avatar.jpg'
            });  
        });

        console.log(JSON.stringify(formData))
        // // setLoading(true)
        fetch(urlComplaint, {method: 'POST', headers,
            body:formData
        })

        .then(response => response.json())
        .then(async(responseData) => {
            console.log(responseData)
            setLoading(false)
            alert("Komplain Berhasil di Kirim")
            gotoPesanan()
        })
    }

    return (
        <View style={{backgroundColor:'white', flex:1}}>
            <Appbar params={props}/>

            <ScrollView>
                <View style={{padding:10, justifyContent:'space-around', alignItems:'center', flexDirection:'row', backgroundColor:'#F8F8F8'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <RadioButton
                            value="penukaran"
                            status={ checked === 'penukaran' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('penukaran')}
                        />
                        <Text> Penukaran</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <RadioButton
                            value="pengembalian"
                            status={ checked === 'pengembalian' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('pengembalian')}
                        />
                        <Text>Pengembalian</Text>
                    </View>
                </View>

                <View style={{width:'90%', alignSelf:'center'}}>
                    <View style={{padding:10, marginBottom:height*0.02}}>

                        <View style={{borderWidth:1, borderColor:'gray', alignSelf:'center', justifyContent:'center', width:'90%', borderRadius:10, height:height*0.055}}>
                            <Picker
                                selectedValue={selectReason}
                                onValueChange={(itemValue, itemIndex) => setSelectReason(itemValue)}
                                style={{justifyContent:'center', alignItems:'center'}}
                            >   
                                    <Picker.Item label={"Pilih Alasan"} value={"kosong"} />
                                {reasonComplaint.map((data,i) => (
                                    <Picker.Item key={i} label={data.description} value={data.id} />
                                ))}
                            </Picker>
                        </View>

                        <TextInput
                            label='Alasan Detail'
                            value={alasanDetail}
                            mode = "outlined"
                            onChangeText={(val)=> setAlasanDetail(val)}
                            style={{width:'90%', alignSelf:'center',  borderRadius:10, backgroundColor:'white', marginTop:height*0.005}}
                            multiline={true}
                            numberOfLines={4}
                            theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
                            />  

                        <View style={{flexDirection:'row', width:'90%', alignSelf:'center', marginVertical:height*0.01, justifyContent:'space-between', alignItems:'center'}}>
                            
                            {image.length < 1 ?
                                <View style={{borderStyle:'dashed', padding:10, width:'100%', borderRadius:10, borderWidth:1, borderColor:'gray',}}>
                                    <TouchableOpacity onPress={handleChoosePhoto} style={{justifyContent:'center', alignItems:'center'}}>
                                        <Icon name="image" size={32} color="gray"/>
                                        <Text style={{fontSize:14, textAlign:'center', color:'gray'}}>
                                            Tambahkan Gambar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            :
                                <View  style={{flexDirection:'row', alignItems:'center',}}>
                                    {image.map((data,i) => (
                                        <View key={i} style={{marginHorizontal:width*0.01}}>
                                            <Image 
                                                source={{uri:data.path}}
                                                style={{width:width*0.2, height:width*0.2}}
                                            />
                                        </View>
                                    ))}
                                </View>
                            }

                            {/* {video.length < 1 ?
                                <View style={{borderStyle:'dashed', padding:10, width:'45%', borderRadius:10, borderWidth:1, borderColor:'gray', justifyContent:'center', alignItems:'center'}}>
                                    <TouchableOpacity onPress={handleChooseVideo} style={{justifyContent:'center', alignItems:'center'}}>
                                        <Icon name="video" size={32} color="gray"/>
                                        <Text style={{fontSize:14, textAlign:'center', color:'gray'}}>
                                            Tambahkan Video 
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            :
                                <View>
                                    <Text>Video Proses Upload</Text>
                                </View>
                            } */}
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
                            <View style={{height:height*0.065, backgroundColor:'#D5D5D5', justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                                <Text style={{fontSize:20}}>-</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{borderWidth:1, borderColor:'#D5D5D5', width:'20%', height:height*0.065, justifyContent:'center', alignItems:'center'}}>
                            <InputNormal
                                style={{borderColor:'rgb(18, 48, 92)', fontSize:10, color:'black', }}
                                value={qty.toString()}
                                disabled
                                editable={false}
                            />
                        </View>

                        <TouchableOpacity onPress={() => changeQty("+")}>
                            <View style={{height:height*0.065, backgroundColor:'#D5D5D5', justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
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

            <TouchableOpacity onPress={postTukar}>
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