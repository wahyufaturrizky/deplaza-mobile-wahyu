import React,{useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

//Untuk Linear Gradient
import LinearGradient from 'react-native-linear-gradient'

//Untuk Video dari Youtube
import YouTube from 'react-native-youtube';

//Untuk Video
import Video from 'react-native-video'
import YoutubePlayer from 'react-native-youtube-iframe';

//Untuk Header Var
import Appbar from '../../components/appbarHome'

//Untuk Bottom Bar
import BottomTab from '../../components/bottomTab'

function Home(props) {
    const [video,setVideo] = useState(false)
    const logoStore = '../../assets/images/store.png'

    const { height, width } = Dimensions.get("window");
    const YOUR_API_KEY = "AIzaSyDq1wgEsDvlY9QPUEMA8GDhiFkEtGQNwrI";

    const _youTubeRef = React.createRef();
    const playerRef = useRef(null);

    useEffect(()=>{
        checkLogin()
        setTimeout(() => {
            setVideo(true)
        }, 1000);
    },[])

    const checkLogin = async() =>{
        let value = await AsyncStorage.getItem('data');
        console.log(value)
    }
    
    //Pergi ke Hal Jualan Anda
    const mulaiJualan = () => {
        props.navigation.navigate('JualanAnda',{title:'Jualan Anda'})      
    }

    

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar params={props}/>
            
            <View style={{backgroundColor:'blue'}}>
                {video &&
                    <YouTube
                        ref={_youTubeRef}
                        apiKey = {YOUR_API_KEY}
                        videoId="B8IIAMXig2c"
                        play
                        style={{ alignSelf: 'stretch', height: height*0.3 }}
                    />
                } 
                {/* <Video
                    source={{uri : 'https://gitlab.com/new-deplaza/deplaza-mobile/-/raw/master/src/assets/video/babastudio.mp4'}}
                    style={{ alignSelf:'stretch', height:height*0.25 }}
                    paused={false}
                /> */}

                {/* <YoutubePlayer
                    ref={playerRef}
                    height={300}
                    width={400}
                    videoId={"Z99WQ9EEP-s"}
                    play={true}
                    onChangeState={event => console.log(event)}
                    onReady={() => console.log("ready")}
                    onError={e => console.log(e)}
                    onPlaybackQualityChange={q => console.log(q)}
                    volume={50}
                    playbackRate={1}
                    forceAndroidAutoplay={true}
                    playerParams={{
                        cc_lang_pref: "us",
                        showClosedCaptions: true
                    }}
                /> */}
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