import React, {useEffect, useState} from 'react';
import { Appbar } from 'react-native-paper';
import { Image, View } from 'react-native';

function appbarHome(props) {
    const [haveProduk, setHaveProduk] = useState(false)

    const logoHorizontal = '../assets/images/logo-horizontal.png'
    const title = props.params.route.params.title

    useEffect(() => {
        if(props.haveProduk !== null){
            setHaveProduk(true)
        }
    },[])


    return (
        <Appbar.Header style={{backgroundColor:'transparent', height:70}}>

            { (title!=="Home" && title!=="Jualan Anda") &&
                <Appbar.BackAction onPress={() => {props.params.navigation.goBack()}} />
            }

            { (title==="Home" || title==="Jualan Anda") &&
                <Image 
                    source={require(logoHorizontal)}
                    style={{width:170, height:45}}
                    width={180}
                    height={45}
                />
            }

            { (title!=="Home" && title!=="Jualan Anda") ?
                <Appbar.Content title={title}/>
            :
                <Appbar.Content/>
            }

            {title==="Home" &&
                <Appbar.Action size={30} icon="bell-ring-outline"/>
            }

         

            {title!=="Home" && 
                (title==="Jualan Anda" && haveProduk ?
                    <View style={{flexDirection:'row'}}>
                        <Appbar.Action size={30} icon="cart"/>
                        <Appbar.Action size={30} icon="bell-ring-outline"/>
                    </View>
                :
                    <View style={{flexDirection:'row'}}>
                        <Appbar.Action size={30} icon="magnify"/>
                        <Appbar.Action size={30} icon="heart"/>
                    </View>
                )
            }

        </Appbar.Header>
    );
}

export default appbarHome;