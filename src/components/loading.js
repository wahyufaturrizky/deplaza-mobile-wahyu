import React from 'react';
import {View, Dimensions} from 'react-native'
import { ActivityIndicator } from 'react-native-paper';

function loading(props) {
    const { height, width } = Dimensions.get("window");

    return (
        <View style={{position:'absolute', width:width, height:height, left:0, right:0,bottom:0, backgroundColor:'rgba(255,255,255,0.5)', justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator animating={true} color="blue" />
        </View>
    );
}

export default loading;