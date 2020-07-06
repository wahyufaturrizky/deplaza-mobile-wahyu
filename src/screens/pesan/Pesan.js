import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import {Picker} from '@react-native-community/picker'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage'

import ImagePicker from 'react-native-image-crop-picker';

import Appbar from '../../components/appbarHome';
import InputNormal from '../../components/inputNormal'
import {URL, formatRupiah} from '../../utils/global'
import Loading from '../../components/loading'

function Pesan(props) {
    const totalHarga = props.route.params.data.totalHarga

    const [fullname, setFullname] = useState('')
    const [dataDetail, setDataDetail] = useState([])
    const [phone, setPhone] = useState('')
    const [provinsi, setProvinsi] = useState("kosong");
    const [kecamatan, setKecamatan] = useState("kosong");
    const [kota, setKota] = useState("kosong");
    const [pos, setPos] = useState("");
    const [alamat, setAlamat] = useState("");
    const [margin, setMargin] = useState("0");
    const [totalKeseluruhan, setTotalKeseluruhan] = useState(totalHarga);
    const [totalPendapatan, setTotalPendapatan] = useState("0");
    const [totalBiaya, setTotalBiaya] = useState(totalHarga);
    
    const [judul,setJudul] = useState("")
    const [priceBasic,setPriceBasic] = useState("0")
    const [priceCommission,setPriceCommission] = useState("0")
    const [stock,setStock] = useState("0")

    const [provinsiDetail, setProvinsiDetail] = useState({})
    const [kotaDetail, setKotaDetail] = useState({})
    const [kecamatanDetail, setKecamatanDetail] = useState({})

    const [totalKomisi, setTotalKomisi] = useState("0");
    // const [metode, setMetode] = useState(true); //True = Metode Bank
    const [qty, setQty] = useState(props.route.params.data.qty)
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [subdistricts, setSubdistrict] = useState([])
    const [idOrder, setIdOrder] = useState(0)
    const [photo, setPhoto] = useState(0)
    const [pesan, setPesan] = useState(false)
    const [loading, setLoading] = useState(true)

    const metodeCOD = props.route.params.data.metodeCOD
    const id_produk = props.route.params.data.id_produk
    const variation = props.route.params.data.variation
    const totalOngkir = props.route.params.data.totalOngkir
    const imageDetail = props.route.params.data.imageDetail

    const indonesia = "../../assets/images/indonesia.png"
    const urlProdukDetail = URL+'v1/product/'
    const urlProvinces = URL+'v1/shipment/provinces'
    const urlCities = URL+'v1/shipment/city/province/'
    const urlKecamatan = URL+'v1/shipment/subdistrict/city/'
    const urlOrder = URL+'v1/orders/'
    const urlProvincesDetail = URL+'v1/shipment/province/'
    const urlKotaDetail = URL+'v1/shipment/city/'
    const urlKecamatanDetail = URL+'v1/shipment/subdistrict/'
    
    const { height, width } = Dimensions.get("window");

    useEffect(() => {
        getDetailProduct()
        getProvinsi()
    },[])

    // Fungsi untuk get gambar dari gallery
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
            // console.log(image);
            setPhoto(image)
            let image64 = `data:${image.mime};base64,${image.data}`;
            // console.log(image)

            let formdata = new FormData();
            formdata.append("proof_payment", image64)
            setLoading(true)
            fetch(urlOrder+idOrder+"/pay-base", {method: 'POST', headers,
                body:formdata
            })
            .then(response => response.json())
            .then(async(responseData) => {
                // console.log(responseData)
                setLoading(false)
                gotoPesanan()
            })
        });

      }

    const ubahPembayaran = () => {
        setMetode(!metodeCOD)
    }

    // Fungsi menuju ke halaman pesanan
    const gotoPesanan = () => {
        props.navigation.navigate("PesananSaya", {title:"Pesanan Saya"})
    }

    // Fungsi untuk mengganti Quantity
    const changeQty = (simbol) => {
        let hargaProduk = parseInt(priceBasic)
        let totalOngkirNow = parseInt(totalOngkir)
        let komisiDasar = parseInt(priceCommission)
        let tmargin = parseInt(margin)

        if(simbol === "+"){
            let qtynow = parseInt(qty)+1
            if(qtynow>1){
                if(qtynow>stock){
                    alert("Maksimal Quantity adalah "+stock)
                    setQty(stock)
                }else{
                    setQty(qtynow, setTotalKeseluruhan((hargaProduk*qtynow)+totalOngkirNow+tmargin), setTotalKomisi(komisiDasar*qtynow))
                    setTotalBiaya((hargaProduk*qtynow)+totalOngkirNow)
                    setTotalPendapatan(tmargin+(komisiDasar*qtynow))
                }
            }else{
                alert("Minimal Quantity adalah 1")
                setQty(1)
            }
        }else if(simbol === "-"){
            let qtynow = parseInt(qty)-1
            if(qtynow>1){
                if(qtynow>stock){
                    alert("Maksimal Quantity adalah "+stock)
                    setQty(stock)
                }else{
                    setQty(qtynow, setTotalKeseluruhan((hargaProduk*qtynow)+totalOngkirNow+tmargin), setTotalKomisi(komisiDasar*qtynow))
                    setTotalBiaya((hargaProduk*qtynow)+totalOngkirNow)
                    setTotalPendapatan(tmargin+(komisiDasar*qtynow))
                }
            }else{
                alert("Minimal Quantity adalah 1")
                setQty(1)
            }
        }
    }

    // Fungsi untuk get data detail
    const getDetailProduct = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        setFullname(data.fullname)
        setPhone(data.phone)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProdukDetail+id_produk, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setDataDetail(responseData.data)
                setTotalPendapatan(responseData.data.price_commission*qty)
                setTotalKomisi(responseData.data.price_commission*qty)
                setJudul(responseData.data.name)
                setPriceBasic(responseData.data.price_basic)
                setPriceCommission(responseData.data.price_commission)
                setStock(responseData.data.stock)
                if(provinces.length>0){
                    setLoading(false)
                }
            })
    }
    
    // Fungsi untuk mengganti margin
    const changeMargin = (text) => {
        setMargin(text)

        let tmargin = parseInt(text)
        let tkomisi = parseInt(totalKomisi)

        setTotalKeseluruhan(totalHarga+tmargin)
        setTotalPendapatan(tmargin+tkomisi)
    }

    // Fungsi untuk get data provinsi
    const getProvinsi = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProvinces, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setProvinces(responseData.rajaongkir.results)
                // if(priceBasic>0){
                    setLoading(false)
                // }
                // console.log(responseData.rajaongkir.results)
            })
    }

    // Fungsi untuk get data kota
    const getKota = async(id_prov) => {
        setLoading(true)
        setProvinsi(id_prov)
        console.log(id_prov)

        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlCities+id_prov, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setCities(responseData.rajaongkir.results)

                fetch(urlProvincesDetail+id_prov, {headers})
                    .then(response => response.json())
                    .then(async(responseData) => {
                        await setProvinsiDetail(responseData.rajaongkir.results)
                        
                        setLoading(false)
                    })
            })
    }

    // Fungsi untuk get data kota
    const getKecamatan = async(id_kota) => {
        setLoading(true)
        setKota(id_kota)
        console.log(id_kota)

        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlKecamatan+id_kota, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setSubdistrict(responseData.rajaongkir.results)
                
                fetch(urlKotaDetail+id_kota, {headers})
                    .then(response => response.json())
                    .then(async(responseData) => {
                        await setKotaDetail(responseData.rajaongkir.results)
                        
                        setLoading(false)
                    })
            })
    }

    const _setKecamatan = (id_kec) => {
        fetch(urlKecamatanDetail+id_kec, {headers})
        .then(response => response.json())
        .then(async(responseData) => {
            await setKecamatanDetail(responseData.rajaongkir.results)
            
            setLoading(false)
        })
    }

    // Fungsi untuk get mengorder
    const postProduct = async() => {
        
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        
        let id_metode = 3
        if(metodeCOD){
            id_metode=1
        }

        if(qty<1){
            alert("Anda Belum Memasukkan Jumlah yang di Beli")
        }else if(fullname==""){
            alert("Anda Belum Mengisi Nama Lengkap")
        }else if(phone==""){
            alert("Anda Belum Mengisi Nomor Telfon")
        }else if(provinsi=="kosong"){
            alert("Anda Belum Mengisi Provinsi")
        }else if(kota=="kosong"){
            alert("Anda Belum Mengisi Kota")
        }else if(pos==""){
            alert("Anda Belum Mengisi Kode Pos")
        }else if(alamat==""){
            alert("Anda Belum Mengisi Alamat")
        }else{
            setLoading(true)
            let headers = {
                Authorization: `Bearer ${data.token}`,
                'Access-Control-Allow-Origin': '*',
                'Content-Type' : 'application/json'
            }

            const dataBody = {
                "voucher": "",
                "products": [
                    {
                        "product_id": id_produk,
                        "product_name": judul,
                        "product_qty": qty,
                        "product_variation": JSON.stringify(variation), // {"size" : ['red','blue'], "color" : ['xl','l']}
                        "product_note": "",
                        "product_custom_commission" : margin //Margin yang ditambahkan manual
                    }
                ],
                "customer": {
                    "save_customer": 1, //kedepannya untuk opsi, mau di save apa nggak data customer
                    "customer_id": 0,
                    "customer_name": fullname,
                    "customer_phone": phone,
                    "customer_email": ""
                },
                "delivery": {
                    "save_address": 1, //kedepannya untuk opsi, mau di save apa nggak data customer
                    "delivery_address_id": 0,
                    "delivery_reciver_name": fullname,
                    "delivery_reciver_city": kota,
                    "delivery_reciver_post": pos,
                    "delivery_reciver_address": alamat+" Kec."+kecamatan+", Kota "+kotaDetail.city_name+", Provinsi "+provinsiDetail.province
                },
                "shipping": {
                    "courier_id" : 1, //kurir dari raja ongkir (JNE)
                    "package_courier" : "REG",
                    "sipping_cost": totalOngkir
                },
                "payment_method_id" : id_metode // 1 atau 3 = 1(COD), 3 (Transfer)
            }

            fetch(URL+"v1/orders", {method: 'POST', headers,
                body:JSON.stringify(dataBody)
            })
            .then(response => response.json())
            .then(async(responseData) => {
                // console.log(responseData.data.id)
                setIdOrder(responseData.data.id)
                setPesan(true)
                setLoading(false)
                alert("Silahkan Upload Bukti Pembayaran di Tombol Upload Bukti Transfer (JIKA SUDAH ADA)")
                //    gotoPesanan()
            })
        }

    }

    return (
        <View style={{backgroundColor:'white', flex:1}}>
            <Appbar params={props}/>
            {dataDetail!=null &&

            <ScrollView>
                
                    <View style={{backgroundColor:'#F8F8F8', padding:10}}>
                        <Text style={{fontSize:18}}>Metode Pembayaran</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            {!metodeCOD ?
                                <View>
                                    <Text style={{fontWeight:'bold', fontSize:18}}>Transfer Bank</Text>
                                    <Text>DePlaza</Text>
                                    <Text>BCA / 20202033</Text>
                                </View>
                            :
                                <Text style={{fontWeight:'bold', fontSize:18}}>COD</Text>
                            }
                            {metodeCOD &&
                                <TouchableOpacity style={{backgroundColor:'#E6E6E6', padding:10}} onPress={ubahPembayaran}>
                                    <Text>Ubah Metode Pembayaran</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                    <View style={{padding:10}}>

                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                            <View>
                                <Text>Biaya Produk</Text>
                                <Text style={{color:'gray', fontSize:12}}>*Harga Sudah Termasuk Ongkir</Text>
                            </View>
                            <Text>Rp. {(totalBiaya.toString())}</Text>
                        </View>

                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <View>
                                <Text>Tambahan Margin Jika Ada</Text>
                                <Text style={{color:'gray', fontSize:12}}>*Boleh Tidak Diisi</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                                <Text>Rp. </Text>
                                <View style={{backgroundColor:'#d5d5d5', width:'35%'}}>
                                    <InputNormal
                                        style={{borderColor:'rgb(18, 48, 92)',height:height*0.045, fontSize:10, borderBottomWidth:1, borderBottomColor:'gray'}}
                                        value={margin}
                                        onChangeText={(text) => changeMargin(text)}
                                        disabled={pesan ? true : false}
                                        keyboardType = 'numeric'
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                            <View>
                                <Text>Total Pesanan</Text>
                                <Text style={{color:'gray', fontSize:12}}>(Tunai yang Dikumpulkan dari Pelanggan)</Text>
                            </View>
                            <Text>Rp. {formatRupiah(totalKeseluruhan)}</Text>
                        </View>

                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                            <View>
                                <Text>Saldo yang Anda Terima</Text>
                                <Text style={{color:'gray', fontSize:12}}>(Komisi + Tambahan Margin)</Text>
                            </View>
                            <View style={{alignItems:'flex-end'}}>
                                <Text style={{fontSize:12}}>Rp. {formatRupiah(totalKomisi)} + Rp. {formatRupiah(margin)}</Text>
                                <Text>Rp. {formatRupiah(totalPendapatan)}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>
                        
                    {(!metodeCOD && pesan) &&
                        <TouchableOpacity style={{width:'90%', alignSelf:'center'}} onPress={handleChoosePhoto}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                style={{padding:15, justifyContent:'center', alignItems:'center', borderRadius:10, flexDirection:'row'}}
                            >
                                <Icon name="cloud-upload" size={32} color="#fff"/>
                                <Text style={{fontSize:20, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                                    Upload Bukti Transfer
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }

                    {photo != 0 && (
                        <Image
                            source={{ uri: photo.path }}
                            style={{ width: width*0.8, height: height*0.3, alignSelf:'center', marginTop:height*0.02 }}
                        />
                    )}

                    <View style={{backgroundColor:'#F8F8F8', padding:10, marginVertical:height*0.02}}>
                        <Text style={{fontSize:18}}>Alamat Pengiriman</Text>
                    </View>

                    <View style={{padding:10, marginBottom:height*0.02}}>

                            <TextInput
                                label='Nama Lengkap'
                                value={fullname}
                                mode = "outlined"
                                onChangeText={(val)=> setFullname(val)}
                                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10}}
                                disabled={pesan ? true : false}
                                
                            />             

                            <View style={{width:"90%", alignSelf:'center', justifyContent:'space-between', flexDirection:'row', marginTop:height*0.005}}>
                                <View style={{height:57, width:'25%', marginTop:7, borderRadius: 5, borderColor: 'grey', borderWidth: 1, borderRadius:10}}>

                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', flex:1}}>
                                        <Image
                                            source={require(indonesia)}
                                            style={{ width: 40, height: 40, alignSelf: 'center'}}
                                            resizeMode='cover'
                                            width={40}
                                            height={40} />
                                        <Text style={{fontSize:14}}> +62</Text>
                                    </View>
                                
                                </View>

                                <TextInput
                                    label='No. Telepon'
                                    value={phone}
                                    onChangeText={(val)=> setPhone(val)}
                                    mode="outlined"
                                    style={{width:'70%', backgroundColor:'white', borderRadius:10}}
                                    disabled={pesan ? true : false}
                                />
                            </View>

                            <View style={{width:"90%", alignSelf:'center', justifyContent:'space-between', alignItems:'center', marginTop:height*0.01}}>
                                
                                <View style={{borderWidth:1, borderColor:'gray', justifyContent:'center', width:'100%', marginBottom:height*0.01, borderRadius:10, height:height*0.055}}>
                                    <Picker
                                        enabled={pesan ? false : true}
                                        selectedValue={provinsi}
                                        onValueChange={(itemValue, itemIndex) => getKota(itemValue)}
                                        style={{justifyContent:'center', alignItems:'center'}}
                                    >   
                                            <Picker.Item label={"Pilih Provinsi"} value={"kosong"} />
                                        {provinces.map((prov,i) => (
                                            <Picker.Item key={i} label={prov.province} value={prov.province_id} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={{borderWidth:1, borderColor:'gray', justifyContent:'center', width:'100%', borderRadius:10, marginBottom:height*0.01, height:height*0.055}}>
                                    <Picker
                                        enabled={pesan ? false : true}
                                        selectedValue={kota}
                                        onValueChange={(itemValue, itemIndex) => getKecamatan(itemValue)}
                                    >
                                            <Picker.Item label={"Pilih Kota"} value={"kosong"} />
                                        {cities.map((city,i) => (
                                            <Picker.Item key={i} label={city.city_name} value={city.city_id} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={{borderWidth:1, borderColor:'gray', justifyContent:'center', width:'100%', borderRadius:10, marginBottom:height*0.01, height:height*0.055}}>
                                    <Picker
                                        enabled={pesan ? false : true}
                                        selectedValue={kecamatan}
                                        onValueChange={(itemValue, itemIndex) => setKecamatan(itemValue)}
                                    >
                                            <Picker.Item label={"Pilih Kecamatan"} value={"kosong"} />
                                        {subdistricts.map((camat,i) => (
                                            <Picker.Item key={i} label={camat.subdistrict_name} value={camat.subdistrict_name} />
                                        ))}
                                    </Picker>
                                </View>

                                {/* <View style={{borderWidth:1, borderColor:'gray', paddingTop:height*0.003, width:'100%', borderRadius:10 , height:height*0.055}}> */}
                                    <TextInput
                                        label='Kode Pos'
                                        disabled={pesan ? true : false}
                                        mode="outlined"
                                        value={pos}
                                        keyboardType="numeric"
                                        onChangeText={(val)=> setPos(val)}
                                        style={{width:'100%', backgroundColor:'white', marginBottom:height*0.01, borderRadius:10}}
                                    />
                                {/* </View> */}
                            </View>

                            <TextInput
                                disabled={pesan ? true : false}
                                label='Alamat Lengkap'
                                value={alamat}
                                mode = "outlined"
                                onChangeText={(val)=> setAlamat(val)}
                                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', marginTop:height*0.005}}
                                multiline={true}
                                numberOfLines={4}
                            />  
                    </View>

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                    <View style={{padding:10}}>
                        <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'flex-start'}}>
                            <View style={{width:'30%'}}>
                                <Image
                                    source={{uri : imageDetail}}
                                    style={{width:'100%', height:height*0.2 , resizeMode:'cover'}}
                                />
                            </View>
                            <View style={{width:'60%'}}>
                                <Text style={{fontSize:18}}>{judul}</Text>
                                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                    <View style={{width:'50%'}}>
                                        
                                        <Text>Rp. {formatRupiah(priceBasic)}</Text>
                                        {variation!=null || variation!=[] &&
                                            <View>
                                                <Text style={{fontSize:14, color:'gray'}}>Ukuran: XL</Text>
                                                <Text style={{fontSize:14, color:'gray'}}>Warna: {variation.color}</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={{width:'50%', justifyContent:'space-between', alignItems:'center'}}>
                                        <Text style={{fontSize:14, color:'gray', marginBottom:height*0.01}}>Jumlah: </Text>
                                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', width:'60%'}}>
                                            <TouchableOpacity onPress={() => changeQty("-")}>
                                                <View style={{paddingHorizontal:15, backgroundColor:'#D5D5D5',height:height*0.045, justifyContent:'center', alignItems:'center'}}>
                                                    <Text style={{fontSize:12}}>-</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{borderWidth:1, borderColor:'#D5D5D5', width:'40%'}}>
                                                <InputNormal
                                                    style={{borderColor:'rgb(18, 48, 92)',height:height*0.045, fontSize:14}}
                                                    value={qty.toString()}
                                                    disabled
                                                    editable={false}
                                                />
                                            </View>
                                            <TouchableOpacity onPress={() => changeQty("+")}>
                                                <View style={{paddingHorizontal:15, backgroundColor:'#D5D5D5',height:height*0.045, justifyContent:'center', alignItems:'center'}}>
                                                    <Text style={{fontSize:12}}>+</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            
                        </View>
                    </View>

            </ScrollView>
            }
            {loading &&
                <Loading/>
            }

            {!pesan &&
                <TouchableOpacity onPress={postProduct}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                        style={{padding:15, justifyContent:'center', alignItems:'center'}}
                    >
                        <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                            Masukkan Pesanan
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            }

            {pesan &&
                <TouchableOpacity onPress={gotoPesanan}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                        style={{padding:15, justifyContent:'center', alignItems:'center'}}
                    >
                        <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                            Lanjutkan
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            }
        </View>
    );
}

export default Pesan;