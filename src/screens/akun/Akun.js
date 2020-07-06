import React from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'

function Akun(props) {

    const { height, width } = Dimensions.get("window");

    const gotoEdit = () => {
        props.navigation.navigate("EditAkun", {title:"Edit Akun"})
    }

    const gotoRincianRekening = () => {
        props.navigation.navigate("RincianRekening", {title:"Rincian Rekening Saya"})
    }

    return (
        <View style={{flex:1}}>
            <Appbar params={props}/>

            <View style={{flex:1, backgroundColor:'white'}}>

                <View style={{flexDirection:'row', padding:25, backgroundColor:'#F8F8F8', justifyContent:'flex-start', alignItems:'center'}}>
                    <Avatar.Image size={height*0.08} source={require('../../assets/images/no-avatar.png')} />
                    <View style={{marginLeft:width*0.04,}}>
                        <Text style={{fontWeight:'bold', fontSize:20}}>Nama Seller</Text>
                        <Text style={{fontSize:16}}>+61 858345678</Text>
                        <TouchableOpacity onPress={gotoEdit} style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                            <Icon name="account-edit" size={30} color="#07A9F0" />
                            <Text style={{fontSize:14, color:'#07A9F0', marginLeft:width*0.01}}>Ubah Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={gotoRincianRekening}>
                    <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center', padding:20}}>
                        <Image
                            source={require('../../assets/images/wallet.png')}
                            style={{width:width*0.1, height:width*0.1, marginRight:width*0.04, resizeMode:'cover'}}
                        />
                        <Text style={{fontSize:18}}>Rincian Rekening Saya</Text>
                    </View>
                </TouchableOpacity>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center', padding:20}}>
                    <Image
                        source={require('../../assets/images/bill.png')}
                        style={{width:width*0.1, height:width*0.1, marginRight:width*0.04, resizeMode:'cover'}}
                    />
                    <Text style={{fontSize:18}}>Pembayaran Saya</Text>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center', padding:20}}>
                    <Image
                        source={require('../../assets/images/box.png')}
                        style={{width:width*0.1, height:width*0.1, marginRight:width*0.04, resizeMode:'cover'}}
                    />
                    <Text style={{fontSize:18}}>Produk Saya</Text>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

                <View style={{justifyContent:'flex-start', flexDirection:'row', alignItems:'center', padding:20}}>
                    <Image
                        source={require('../../assets/images/megaphone.png')}
                        style={{width:width*0.1, height:width*0.1, marginRight:width*0.04, resizeMode:'cover'}}
                    />
                    <Text style={{fontSize:18}}>Notifikasi</Text>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>

            </View>
            
            <BottomTab {...props}/>

        </View>
    );
}

export default Akun;