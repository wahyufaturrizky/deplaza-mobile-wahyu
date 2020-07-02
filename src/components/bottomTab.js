import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function bottomTab(props){

    //Pergi menuju halaman pesanan
    const gotoPesanan = () => {
        console.log(props)
        props.navigation.navigate("PesananSaya", {title:"Pesanan Saya"})
    }

    const gotoHome = () => {
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                        { name: 'JualanAnda', params:{title:'Jualan Anda'} },
                    ]
        }));
    }
    
    return (
        <View style={[styles.shadow, {backgroundColor:'white', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}]}>
            <TouchableOpacity onPress={gotoHome}>
                <View style={{alignItems:'center'}}>
                    <Icon name="home" size={30} color="#949494" />
                    <Text>Home</Text>
                </View>
            </TouchableOpacity>
            {/* <View style={{alignItems:'center'}}>
                <Icon name="help-circle-outline" size={30} color="#949494" />
                <Text>Bantuan Jualan</Text>
            </View> */}
            <TouchableOpacity onPress={gotoPesanan}>
                <View style={{alignItems:'center'}}>
                    <Icon name="account" size={30} color="#949494" />
                    <Text>Pesanan Saya</Text>
                </View>
            </TouchableOpacity>
            {/* <View style={{alignItems:'center'}}>
                <Icon name="account" size={30} color="#949494" />
                <Text>Akun</Text>
            </View> */}
        </View>
    );
}

export default bottomTab

const styles = StyleSheet.create({
    shadow:{
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 1.0,
        elevation: 4,
        marginTop:5
    }
})