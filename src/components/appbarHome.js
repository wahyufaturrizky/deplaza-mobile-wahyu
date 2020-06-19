import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Image } from 'react-native';

function appbarHome(props) {

    const logoHorizontal = '../assets/images/logo-horizontal.png'

    return (
        <Appbar.Header style={{backgroundColor:'white', height:80}}>
        
            <Image 
                source={require(logoHorizontal)}
                style={{width:210, height:55}}
                width={170}
                height={60}
            />
            <Appbar.Content/>
            
            <Appbar.Action size={40} icon="bell-ring-outline"/>
        </Appbar.Header>
    );
}

export default appbarHome;