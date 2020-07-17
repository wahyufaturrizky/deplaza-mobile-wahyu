import React from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


function hubungiKami(props) {

    const { height, width } = Dimensions.get("window");

    return (
    <View style={{padding:15, flex:1, marginTop:height*0.02}}>

        <TouchableOpacity>
            <View style={[styles.shadow,{padding:15, backgroundColor:'white', flexDirection:'row', alignItems:'center'}]}>
                <Image  source={require('../../assets/images/phone-ringing.png')} style={{marginRight:width*0.02, width:width*0.07, height:width*0.07}}/>
                <Text style={{fontSize:16}}>Hubungi Kami di +62</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop:height*0.03}}>
            <View style={[styles.shadow,{padding:15, backgroundColor:'white', flexDirection:'row', alignItems:'center'}]}>
                <Image  source={require('../../assets/images/email.png')} style={{marginRight:width*0.02, width:width*0.07, height:width*0.07}}/>
                <Text style={{fontSize:16}}>Email Kami di help@deplaza.com</Text>
            </View>
        </TouchableOpacity>

    </View>
    );
}

export default hubungiKami;

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