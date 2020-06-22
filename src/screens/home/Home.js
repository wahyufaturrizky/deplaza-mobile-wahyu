import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native'

//Untuk Linear Gradient
import LinearGradient from 'react-native-linear-gradient'

//Untuk Video dari Youtube
import YouTube from 'react-native-youtube';

//Untuk Video
import Video from 'react-native-video'

//Untuk Header Var
import Appbar from '../../components/appbarHome'

//Untuk Bottom Bar
import BottomTab from '../../components/bottomTab'

function Home(props) {
    const logoStore = '../../assets/images/store.png'

    const { height, width } = Dimensions.get("window");

    //Pergi ke Hal Jualan Anda
    const mulaiJualan = () => {
        props.navigation.navigate('JualanAnda')      
    }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar/>
            {/* <YouTube
                videoId="B8IIAMXig2c"
                play
                fullscreen
                loop
                style={{ alignSelf: 'stretch', height: height*0.3 }}
            /> */}
            <View style={{backgroundColor:'blue'}}>
            <Video
                source={{uri : 'https://gitlab.com/new-deplaza/deplaza-mobile/-/raw/master/src/assets/video/babastudio.mp4'}}
                style={{ alignSelf:'stretch', height:height*0.25 }}
                paused={false}
            />
            </View>

            <View style={{width:'80%',marginTop:height*0.08, alignSelf:'center', flex:1}}>
                <Image 
                    source={require(logoStore)}
                    style={{width:80, height:80, alignSelf:'center'}}
                />
                <Text style={{fontWeight:"bold", textAlign:'center', fontSize:18, marginBottom:10}}>Mari Bergabung!</Text>
                <Text style={{textAlign:'center' , fontSize:14}}>Klik Tombol Di Bawah ini Untuk Ikut</Text>
                <Text style={{textAlign:'center' , fontSize:14, marginBottom:height*0.01}}>Bergabung Menjadi Reseller</Text>
            </View>

            <TouchableOpacity  onPress={mulaiJualan} style={{width:'90%', alignSelf:'center', marginBottom:height*0.01}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                    style={{padding:15, borderRadius:10}}
                >
                    <Text style={{fontSize:24, textAlign:'center', color:'white'}}>
                        Mulai Jualan Anda
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

            <BottomTab/>

        </View>
    );
}

export default Home;