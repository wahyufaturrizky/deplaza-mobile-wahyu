import React,{useState, useEffect} from 'react';
import { View, Text, Dimensions, StyleSheet, } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import moment from "moment";
import AsyncStorage from '@react-native-community/async-storage'

import Appbar from '../../components/appbarHome'
import { URL, formatRupiah } from '../../utils/global';

function notifikasi(props) {
    const [notif, setNotif] = useState([])
    const { height, width } = Dimensions.get("window");

    const urlNotif = URL+'v1/notification'

    useEffect(() => {
        getNotif()
    },[])

    const getNotif = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlNotif, {headers})
            .then(response => response.json())
            .then(responseData => {
                let data = responseData.data
                console.log(responseData.data)
                data.reverse()
                setNotif(data)
            })
    }

    return (
        <View style={{flex:1}}>
            <Appbar params={props}/>

            <ScrollView style={{backgroundColor:'white'}}>
                {notif.map((data, i) => (
                <View key={i}>
                    <View style={{width:'90%', alignSelf:'center', paddingVertical:10}}>
                        <Text style={{fontWeight:'bold', marginBottom:height*0.01}}>{moment(data.created_at).format("D MMMM YYYY, H:mm A")}</Text>
                        {/* <Text style={{marginBottom:height*0.02}}>
                            {data.title}
                        </Text> */}
                        <Text style={{marginBottom:height*0.01}}>
                            {data.content}
                        </Text>
                    </View>

                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.005}}></View>
                </View>
                ))}
            </ScrollView>
            
        </View>
    );
}

export default notifikasi;

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