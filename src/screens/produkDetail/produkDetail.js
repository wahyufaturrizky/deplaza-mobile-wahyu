import React, {useState,useEffect} from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions, StyleSheet, PermissionsAndroid } from 'react-native';
import Clipboard from "@react-native-community/clipboard";
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box'
import HTML from 'react-native-render-html';
import {URL, formatRupiah} from '../../utils/global'
import RNFetchBlob from 'rn-fetch-blob';
import Loading from '../../components/loading'

import Select2 from 'react-native-select-two';

import { ScrollView } from 'react-native-gesture-handler';
import { Title, TextInput, Snackbar  } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Appbar from '../../components/appbarHome';
import InputNormal from '../../components/inputNormal'

function produkDetail(props) {
    const [dataDetail, setDataDetail] = useState([])
    const [dataColor, setDataColor] = useState([])
    const [dataGambar, setDataGambar] = useState([])
    const [loading, setLoading] = useState(true)

    const [copy, setCopy] = useState(false)
    const [qty, setQty] = useState(1)

    const [color, setColor] = useState([])
    const [size, setSize] = useState([])
    const [selectVariasi, setSelectVariasi]= useState([])

    const [pressSize, setPressSize] = useState(false)
    const [pressColor, setPressColor] = useState(-1)

    const [selectKota, setSelectKota] = useState(false)
    const [selectColor, setSelectColor] = useState("")
    const [selectSize, setSelectSize] = useState("")
    const [totalKomisi, setTotalKomisi] = useState("0")

    const [varian, setVarian] = useState([])

    const [kota, setKota] = useState([
        { id: 1, name: 'Pilih Kota' }
    ])
    const [allKota, setAllKota] = useState([])
    const [kecamatan, setKecamatan] = useState([])
    const [totalOngkir, setTotalOngkir] = useState(0)
    const [totalHarga, setTotalHarga] = useState(0)
    const [metodeCOD, setmetodeCOD] = useState(false) //false kalo untuk bank 
    const [likeProduk, setLikeProduk] = useState(0)
    const [pilihKota, setPilihKota] = useState(false)
    // const likeProduk = true

    const urlProdukDetail = URL+'v1/product/'
    const urlKota = URL+"v1/shipment/cities"
    const urlKecamatan = URL+"v1/shipment/subdistrict/city/"
    const urlOngkir = URL+"v1/shipment/cost"
    const urlWishlistMe = URL+"v1/wishlist/me"
    const urlWishlist = URL+"v1/wishlist"
    

    const { height, width } = Dimensions.get("window");
    let id = props.route.params.id
    let tvarian = 0

    useEffect(() => {
        getDetailProduct()
        getKota()
        CekTandai()
    }, [])
    
    const copyToClipboard = async() => {
        const copyText = `Harga : Rp. ${formatRupiah(dataDetail.price_basic)} \n Deskripsi : \n ${dataDetail.description}`

        const regex = /(<([^>]+)>)/ig;
        const result = copyText.replace(regex, ''); 

        Clipboard.setString(result)
        setCopy(true)
    }

    const CekTandai = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlWishlistMe, {headers})
            .then(response => response.json())
            .then(responseData => {
                // setWishlist(responseData.data)
                // console.log(responseData.data[1].product_id)
                let res = responseData.data
                let row = 0
                res.map((data,i) => {
                    // console.log(data.product_id+" id ="+id)
                    if(data.product_id == id){
                        row++
                    }
                })
                // console.log(row)
                setLikeProduk(row)
                // setColor
            })
            .catch(e => console.log(e))
    }
 
    const changeQty = (simbol) => {
        let hargaProduk = parseInt(dataDetail.price_basic)
        let totalOngkirNow = parseInt(totalOngkir)
        let stock = parseInt(dataDetail.stock)

        if(simbol === "+"){
            let qtynow = qty+1
            if(qtynow>1){
                if(qtynow>stock){
                    alert("Maksimal Quantity adalah "+stock)
                    setQty(stock)
                }else{
                    setQty(qtynow, setTotalHarga((hargaProduk*qtynow)+totalOngkirNow),setTotalKomisi(dataDetail.price_commission*qtynow))
                }
            }else{
                alert("Minimal Quantity adalah 1")
                setQty(1)
            }

        }else if(simbol === "-"){
            let qtynow = qty-1
            if(qtynow>1){
                if(qtynow>stock){
                    alert("Maksimal Quantity adalah "+stock)
                    setQty(stock)
                }else{
                    setQty(qtynow, setTotalHarga((hargaProduk*qtynow)+totalOngkirNow),setTotalKomisi(dataDetail.price_commission*qtynow))
                }
            }else{
                alert("Minimal Quantity adalah 1")
                setQty(1)
            }
        }
    }

    const changeColor = (data,color) => {
        setPressColor(data)
        setSelectColor(color)
    }

    const changeSize = (data,size) => {
        setPressSize(data)
        setSelectSize(size)
    }

    const goToHome = () => {
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                        { name: 'JualanAnda', params:{title:'Jualan Anda'} },
                    ]
        }));  
    }

    const gotoRincianProduk = () => {
        props.navigation.navigate('Produk',{title:"Paling Disukai"})   
    }

    const gotoPesan = () => { //{"color": ["red", "yellow"], "size": ["s", "m", "l", "xl"]}
        if(totalOngkir===0){
            alert("Pilih Terlebih Kota atau Kecamatan Tujuan")
        }else{
            props.navigation.navigate("Pesan", {title:"Pesan & Kirim", data: {id_produk : id, variation:selectVariasi, qty, metodeCOD, totalHarga, totalOngkir, imageDetail:dataGambar[0]}})
        }
    }

    const gotoWishlist = () => {
        props.navigation.navigate("Wishlist", {title:"Pesanan Saya"})
    }

    const getDetailProduct = async() => {
        setDataGambar([])
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProdukDetail+id, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setDataDetail(responseData.data)
                setLoading(false)
                
                // console.log(responseData.data)
                setTotalKomisi(responseData.data.price_commission)

                setColor("")
                // if(responseData.data.variation_data!=null){
                    // setSize(responseData.data.variation_data.size)
                    // setColor(responseData.data.variation_data.color)
                // }
                setVarian(responseData.data.variation_data)
                // console.log(responseData.data.variation_data[0].Warna[0])
                
                let responseImage = responseData.data.images
                responseImage.map((data,i) => {
                    // console.log(data.image_url)
                    setDataGambar([...dataGambar, data.image_url])
                })
                // for(let i=0; i<=(responseData.data.images.length)-1; i++){
                    // setDataGambar([...dataGambar, responseData.data.images[i].image_url])
                // }

                
            })

    }

    const checkPermission = async () => {
    
        //Function to check the platform
        //If iOS the start downloading
        //If Android then ask for runtime permission
    
        if (Platform.OS === 'ios') {
          downloadImage();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message: 'This app needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
              downloadImage();
            } else {
              //If permission denied then show alert 'Storage Permission Not Granted'
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            //To handle permission related issue
            console.warn(err);
          }
        }
      };

    const downloadImage = () => {
        //Main function to download the image
        let date = new Date(); //To add the time suffix in filename
        //Image URL which we want to download
        let image_URL = dataGambar;
        // console.log(dataGambar[0])
        //Getting the extention of the file

        image_URL.map((url,i) => {
            let ext = getExtention(url);
            ext = '.' + ext[0];
            //Get config and fs from RNFetchBlob
            //config: To pass the downloading related options
            //fs: To get the directory path in which we want our image to download
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            let options = {
            fileCache: true,
            addAndroidDownloads: {
                //Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                PictureDir +
                '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                description: 'Image',
            },
            };
            config(options)
            .fetch('GET', url)
            .then(res => {
                //Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
            });
        })

        copyToClipboard()
        alert('Berhasil Mendownload Gambar');
        
    };

    const getExtention = filename => {
        //To get the file extension
        return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
    };

    const getKota = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }
        
        fetch(urlKota, {headers})
            .then(response => response.json())
            .then(responseData => {
                // setKota(responseData.rajaongkir.results)
                const mapKota = responseData.rajaongkir.results

                let data = mapKota.map( s => ({id:s.city_id, name:s.city_name}) );
                setKota(data)
            })
            .catch(e => console.log(e))
    }

    const _selectKota = async(data_kota) => {
        setLoading(true)
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        // console.log(dataDetail.cod_city_id)     
        let cod_city =  dataDetail.cod_city_id
        let cek_code_city = cod_city.indexOf(data_kota);

        if(cek_code_city >= 0) {
            setmetodeCOD(true)
        }else{
            setmetodeCOD(false)
        }

        let formdata = new FormData();
        formdata.append("origin", dataDetail.city_id)
        formdata.append("destination", parseInt(data_kota))
        formdata.append("weight", dataDetail.weight)
        formdata.append("courier", 'jne')

        fetch(urlOngkir, {method: 'POST', headers,
            body: formdata
        })
        .then(response => response.json())
        .then(async(responseData) => {
            let tipe= await responseData.rajaongkir.results[0].costs
            setLoading(false)
            tipe.map((type) => {
                if(type.service === "REG"){
                    setPilihKota(true)
                    setTotalOngkir(type.cost[0].value, setTotalHarga(dataDetail.price_basic+type.cost[0].value))
                }
            })
        })
    }

    const postWishlist = async(id) => {
        setLoading(true)
        const value = await AsyncStorage.getItem('data');
        // console.log(value)
        const data = JSON.parse(value)
        const id_user = data.id
        // console.log(id,id_user)

        var formdata = new FormData();
        formdata.append("product_id", id);
        formdata.append("user_id", id_user);

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'multipart/form-data'
        }

        fetch(urlWishlist, {
            method: 'POST',
            headers,
            body: formdata
        })
    
        .then((response) => response.json())
        .then( async(responseData) => {
                setLoading(false)
                // goToHome()
                gotoRincianProduk()
                // console.log(responseData)
        })
        .done();
    }
    

    const _onDismissSnackBar = () => setCopy(false)

    const clickSize = () => setPressSize(!pressSize)

    const addVariasi = (variant, value) => {
        let data = [{[variant]:value}]
        let allVariasi = selectVariasi

        allVariasi.forEach(function(v){ 
            delete v[variant] 
        });

        let filtered = allVariasi.filter(value => JSON.stringify(value) !== '{}');

        setSelectVariasi(filtered.concat(data))
        
    }

    return (
        <View style={{backgroundColor:'white', flex:1}}>
                <Appbar params={props}/>
            
                <ScrollView >
                    <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.02 ,flex:1}}>
                        {/* <Image
                            source={{uri : dataDetail.images[0].file_upload}}
                            style={{width:'100%', height:height*0.5 , resizeMode:'cover'}}
                        /> */}
                        {/* <View style={{width:'100%',height:height*0.5, backgroundColor:'blue'}}> */}
                            <SliderBox images={dataGambar} style={{width:'100%', height:height*0.4,  resizeMode: 'contain',}}/>
                        {/* </View> */}
                        <Title>{dataDetail.name}</Title>

                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:height*0.01}}>
                            <Select2
                                isSelectSingle
                                style={{ borderRadius: 5, width:'64%' }}
                                colorTheme={'blue'}
                                popupTitle='Pilih Kota'
                                title='Pilih Kota'
                                data={kota}
                                onSelect={data => {
                                    setSelectKota(data)
                                    _selectKota(data)
                                }}
                                onRemoveItem={data => {
                                    setSelectKota(data)
                                }}
                                cancelButtonText="Batal"
                                selectButtonText="Pilih"
                                searchPlaceHolderText="Ketik Nama Kota"
                            />

                            <TouchableOpacity style={{width:'34%'}}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                    style={{padding:10, borderRadius:10}}
                                >
                                    <Text style={{textAlign:'center', color:'white'}}>
                                        Cek Harga
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {(!metodeCOD && pilihKota) &&
                            <View style={{padding:10, width:'100%', backgroundColor:'#E0F5FE', flexDirection:'row', flexWrap:'wrap', alignItems:'center'}}>
                                <Icon name="alert" size={20} color="#07A9F0" />
                                <Text> Metode Pembayaran COD tidak tersedia di lokasi ini</Text>
                            </View> 
                        }

                        {pilihKota &&
                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:height*0.01}}>
                                <View>
                                    <Text style={{fontSize:24}}>Rp. {formatRupiah(totalHarga)}</Text>
                                    <Text style={{fontSize:12}}>*Harga Sudah Termasuk Ongkir</Text>
                                </View>
                                    <View style={{backgroundColor:'#D5D5D5', height:height*0.03, paddingHorizontal:5, justifyContent:'center'}}>
                                    <Text style={{fontSize:12}}>Komisi Rp. {formatRupiah(totalKomisi)}</Text>
                                </View>
                            </View>
                        }

                        <View style={{backgroundColor:'#D5D5D5', paddingVertical:5, width:'30%', paddingHorizontal:20, marginTop:height*0.01, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontSize:14}}>Stok {dataDetail.stock}</Text>
                        </View>

                        <View style={{backgroundColor:'#D5D5D5', paddingVertical:5, width:'60%', flexDirection:'row', alignItems:'center', paddingHorizontal:20, marginTop:height*0.01, justifyContent:'flex-start'}}>
                            <Icon name="calendar" size={16} color="#000" />
                            <Text style={{fontSize:14}}> Akan Dikirimkan 2 - 3 hari</Text>
                        </View>

                    </View>

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                    <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.02}}>
                        <View style={{flexDirection:'row', paddingLeft:5, justifyContent:'space-between', backgroundColor:'#F8F8F8', alignItems:'center'}}>
                            <Title>Rincian Produk</Title>
                            <TouchableOpacity onPress={copyToClipboard}>
                                <View style={{padding:10, backgroundColor:'#D5D5D5'}}>
                                    <Text>Salin Deskripsi</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:height*0.01}}>
                            {/* <Text>{dataDetail.description}</Text> */}
                            <HTML html={"<div>" + dataDetail.description + "</div>"}/>
                            {/* <Text>Warna : Black</Text>
                            <Text>Bahan : Cotton</Text>
                            <Text>Ukuran : M, L, XL, XXL</Text> */}
                        </View>
                    </View>

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                    <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.02}}>
                        <View style={{backgroundColor:'#F8F8F8', padding:5}}>
                            <Title>Pilih Variasi dan Jumlah</Title>
                        </View>
                    </View>

                    {varian.map((data,i) => {
                        let tvariant = Object.keys(data)[0]
                        
                        return(
                        
                        <View key={i}>
                            <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>
                            
                            <View style={{width:'90%', alignSelf:'center', padding:10}}>
                                <Title style={{marginBottom:height*0.01}}>{tvariant}</Title>
                                <View style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap',  width:'50%'}}>
                                { data[tvariant].map((val,j) => {
                                    // console.log(selectVariasi)
                                    // console.log({[tvariant]:val})

                                    let found = false;

                                    for(let k = 0; k < selectVariasi.length; k++) {
                                        if (selectVariasi[k][tvariant] == val) {
                                            found = true;
                                            break;
                                        }
                                    }
                                    return(
                                        <TouchableOpacity onPress={() => addVariasi(tvariant,val)}>
                                            <View style={{backgroundColor:'white', borderWidth:1, borderColor: (found) ? 'red' : 'gray', padding:5, marginBottom:height*0.005, marginRight:5, borderRadius:5}}><Text>{val}</Text></View>
                                        </TouchableOpacity>
                                )
                                })}
                                </View>

                            </View>
                        </View>
                        )
                    })}

                    
                    {/* { (dataDetail.variation_data.size != null && dataDetail.variation.length.size > 0) &&
                    <View>
                        <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>
                        
                        <View style={{width:'90%', alignSelf:'center',flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <Title>Ukuran</Title>
                            <View style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap', justifyContent:'flex-end', width:'50%'}}>
                                { dataDetail.variation_data.size.map((size,i) => (
                                    <View style={{flexDirection:'row', marginTop:height*0.02}}>
                                        <TouchableOpacity onPress={() => changeSize(i, size)}>
                                            <View style={{padding:10, backgroundColor: (pressColor === i ? '#D5D5D5' : '#555555'), marginRight:5,}}>
                                                <Text style={{fontSize:12}}>{size}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                    } */}
                    
                    {/* { (dataDetail.variation_data.color != null && dataDetail.variation.color.length > 0) &&
                    <View>
                        <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>
                        
                        <View style={{width:'90%', alignSelf:'center',flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <Title>Warna</Title>
                            <View style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap', justifyContent:'flex-end', width:'50%'}}>
                                { dataDetail.variation_data.color.map((color,i) => (
                                    <TouchableOpacity onPress={() => changeColor(i, color)}>
                                        <View key={i} style={{backgroundColor:'white', borderWidth:1, borderColor: (pressColor === i ? 'red' : 'gray'), padding:5, marginBottom:height*0.005, marginHorizontal:5, borderRadius:5}}><Text>{color}</Text></View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                    } */}

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                    <View style={{width:'90%', alignSelf:'center', flexDirection:'row', justifyContent:'space-between', paddingVertical:height*0.01, alignItems:'center'}}>
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

                    
                </ScrollView>

                {loading &&
                    <Loading/>
                }

                <Snackbar
                    visible={copy}
                    onDismiss={_onDismissSnackBar}
                    duration = {1000}
                >
                    Deskripsi Berhasil di Salin
                </Snackbar>

                {likeProduk<1 ?
                    <TouchableOpacity  onPress={() => postWishlist(dataDetail.id)}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                            style={{padding:15, flexDirection:"row", justifyContent:'center', alignItems:'center'}}
                        >
                            <Icon name="heart" size={20} color="#fff"/>
                            <Text style={{fontSize:18, textAlign:'center', color:'white', marginLeft:width*0.04}}>
                                Tandai Produk Ini
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                :
                    <View style={[styles.shadow, {flexDirection:'row', height:height*0.06}]}>
                        <TouchableOpacity style={{ width:'50%', height:height*0.06}} onPress={checkPermission}>
                            <View style={{flexDirection:'row', padding:height*0.01, justifyContent:'space-around', alignItems:'center'}}>
                                <Icon name="cloud-download" size={height*0.04} color="#07A9F0"/>
                                <Text style={{fontSize:height*0.015, color:'#07A9F0'}}>Tawarkan Produk</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'50%', height:height*0.06}} onPress={gotoPesan}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                style={{flexDirection:'row', padding:height*0.01,  justifyContent:'space-around', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/inbox.png')} style={{width:width*0.08, height:width*0.08}} />
                                    <Text style={{fontSize:height*0.015, color:'#fff'}}>Pesan {"&"} Kirim</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                }
            
        </View>
    );
}

export default produkDetail;

const styles=StyleSheet.create({
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
})