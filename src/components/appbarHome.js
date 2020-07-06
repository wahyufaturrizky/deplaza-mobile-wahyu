import React, {useEffect, useState} from 'react';
import { Appbar } from 'react-native-paper';
import { Image, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function appbarHome(props) {
    const [haveProduk, setHaveProduk] = useState(false)

    const logoHorizontal = '../assets/images/logo-horizontal.png'
    let title =""

    if(props.params.route!=null){
        title = props.params.route.params.title
    }

    // console.log(props.params.route.params)

    // console.log(props)

    useEffect(() => {
        if(props.wishlist > 0){
            setHaveProduk(true)
        }
    },[])

    const gotoPesanan = () => {
        props.params.navigation.navigate("PesananSaya", {title:"Pesanan Saya"})
    }


    return (
        <Appbar.Header style={[styles.shadow,{backgroundColor:'white', height:70}]}>

            { (title!=="Home" && title!=="Jualan Anda" && title!=="Pesanan Saya") &&
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
                <Appbar.Content titleStyle={{fontSize:14}} title={title}/>
            :
                <Appbar.Content/>
            }

            {title==="Home" &&
                <Appbar.Action size={30} icon="bell-ring-outline"/>
            }

         

            {title!=="Home" && 
                ((title==="Jualan Anda" && haveProduk) ?
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={gotoPesanan}>
                            <Appbar.Action size={30} icon="cart"/>
                        </TouchableOpacity>
                        <Appbar.Action size={30} icon="bell-ring-outline"/>
                    </View>
                :
                    <View style={{flexDirection:'row'}}>
                        <Appbar.Action size={30} icon="magnify"/>
                        {/* <Appbar.Action size={30} icon="heart"/> */}
                    </View>
                )
            }

        </Appbar.Header>
    );
}

export default appbarHome;

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