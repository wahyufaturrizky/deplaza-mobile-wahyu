import * as React from 'react';
import {View, Text,} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function bottomTab(props){
    
    return (
        <View style={{padding:20, backgroundColor:'white', borderTopColor:'gray', borderTopWidth:1, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
            <View style={{alignItems:'center'}}>
                <Icon name="home" size={30} color="#949494" />
                <Text>Home</Text>
            </View>
            <View style={{alignItems:'center'}}>
                <Icon name="help-circle-outline" size={30} color="#949494" />
                <Text>Bantuan Jualan</Text>
            </View>
            <View style={{alignItems:'center'}}>
                <Icon name="account" size={30} color="#949494" />
                <Text>Akun</Text>
            </View>
        </View>
    );
}

export default bottomTab