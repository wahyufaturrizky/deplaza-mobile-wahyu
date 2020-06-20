import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Image } from 'react-native';

function appbarHome(props) {

    const logoHorizontal = '../assets/images/logo-horizontal.png'

    return (
        <Appbar.Header style={{backgroundColor:'white', height:70}}>
        
            <Image 
                source={require(logoHorizontal)}
                style={{width:170, height:45}}
                width={180}
                height={45}
            />
            <Appbar.Content/>
            
            <Appbar.Action size={30} icon="bell-ring-outline"/>
        </Appbar.Header>
    );
}

export default appbarHome;