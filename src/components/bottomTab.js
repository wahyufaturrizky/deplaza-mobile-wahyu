import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function bottomTab(props){
    
    return (
        <View style={[styles.shadow, {padding:20, backgroundColor:'white', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}]}>
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

const styles = StyleSheet.create({
    shadow:{
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: '#000000',
        shadowOpacity: 1.0,
        elevation: 4,
        marginTop:5
    }
})