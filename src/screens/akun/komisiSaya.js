import React,{useState, useEffect} from 'react';
import { View, Text, Dimensions, StyleSheet, } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import moment from "moment";

import Appbar from '../../components/appbarHome'
import { URL, formatRupiah } from '../../utils/global';
function pembayaranSaya(props) {
    const [modal, setModal] = useState(false)
    const [history, setHistory] = useState([])
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const [ammount, setAmmount] = useState("0")

    const { height, width } = Dimensions.get("window");
    let str = ""
    let n = 0
    const urlHistory = URL+'v1/saldo/my-history'

    useEffect(() => {
        getHistory()
    },[])

    const modalTrigger = (data) =>{
        if(data!=""){
            setDate(data.created_at)
            setDescription(data.description)
            setAmmount(data.ammount)
        }
        setModal(!modal)
    }

    const getHistory = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlHistory, {headers})
            .then(response => response.json())
            .then(responseData => {
                let data = responseData.data
                data.reverse()
                setHistory(data)
            })
    }
    
    return (
        <View style={{flex:1}}>
            {/* <Appbar params={props}/> */}
            <ScrollView style={{backgroundColor:'white'}}>
            {history.map((data, i) => {
                    str = data.description
                    n = str.search("Pembagian")
                    if(n > -1){ return(
                    <View key={i}>
                        <View style={{width:'90%', alignSelf:'center', paddingVertical:10}}>
                            <Text style={{fontWeight:'bold', marginBottom:height*0.01}}>{moment(data.created_at).format("D MMMM YYYY, H:mm A")}</Text>
                            <Text style={{marginBottom:height*0.02}}>
                                {data.description}
                            </Text>
                            <TouchableOpacity onPress={() => modalTrigger(data)} style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                                <Text style={{color:'#07A9F0'}}>Lihat Lebih Banyak</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>
                    </View>
                    )}
                })}

                
            </ScrollView>

            { modal &&
            <View style={{position:'absolute', flex:1, zIndex:1, width:width, height:height, bottom:0, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center'}}>
                    <View style={[styles.shadow,{alignSelf:'center', width:width*0.8, backgroundColor:'rgba(255,255,255,1)', padding:15}]}>
                        <Text style={{fontSize:16, fontWeight:'bold', marginBottom:height*0.01}}>{moment(date).format("D MMMM YYYY, H:mm A")}</Text>
                        <Text style={{fontSize:14, marginBottom:height*0.01}}>{description} Sebesar Rp. {formatRupiah(ammount)}</Text>

                        <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={() => modalTrigger("")}>
                            <Text style={{fontSize:14, color:'#07A9F0'}}>Tutup</Text>
                        </TouchableOpacity>
                        
                    </View>
            </View>
            }
            
        </View>
    );
}

export default pembayaranSaya;

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
    },
    shadowBlue : {
        shadowColor: "#07A9F0",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        
        elevation: 22,
    }
})