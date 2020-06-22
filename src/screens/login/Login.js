import React,{useState,useEffect} from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import { CommonActions } from '@react-navigation/native';

import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function Login(props) {
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    
    const logo = "../../assets/images/logo.png"
    const indonesia = "../../assets/images/indonesia.png"

    const { height, width } = Dimensions.get("window");

    const urlRegister = "http://rest-api.deplaza.id/v1/oauth/register"

    useEffect(()=>{
        checkLogin()
    },[])

    const checkLogin = async() =>{
        const value = await AsyncStorage.getItem('data');
        if(value!=null){
            props.navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [
                            { name: 'Home' },
                        ]
            })); 
        }
    }


    //Pergi ke Hal Home, Indexnya di reset
    const Login = () => {
        
        fetch(urlRegister, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname,
                phone
            })
        })
    
        .then((response) => response.json())
        .then( async(responseData) => {

                console.log(
                    "POST Response",
                    "Response Body -> " + JSON.stringify(responseData.data)
                )
                
                await AsyncStorage.setItem('data', JSON.stringify(responseData.data) );

                props.navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [
                                { name: 'Home' },
                            ]
                }));  

       
        })
        
        .done();

            
    }
            

    return (
            <View style={{ backgroundColor: 'white', flex: 1}}>

                <KeyboardAwareScrollView>
                
                    <Image
                        source={require(logo)}
                        style={{ width: width*1.2, height:  height*0.3, alignSelf: 'center', marginBottom:height*0.07, marginTop:height*0.11}}
                        resizeMode='cover'
                        width={width*1.2}
                        height={height*0.3} />

                    <View style={{flex:1}}>
                        <TextInput
                            label='Nama Lengkap'
                            value={fullname}
                            mode = "outlined"
                            onChangeText={(val)=> setFullname(val)}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white'}}
                            
                        />             

                        <View style={{width:"90%", alignSelf:'center', justifyContent:'space-between', flexDirection:'row', marginTop:40}}>
                            <View style={{height:57, width:'25%', marginTop:7, borderRadius: 5, borderColor: 'grey', borderWidth: 1,}}>

                                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', flex:1}}>
                                    <Image
                                        source={require(indonesia)}
                                        style={{ width: 40, height: 40, alignSelf: 'center'}}
                                        resizeMode='cover'
                                        width={40}
                                        height={40} />
                                    <Text style={{fontSize:14}}> +62</Text>
                                </View>
                            
                            </View>

                            <TextInput
                                value={phone}
                                onChangeText={(val)=> setPhone(val)}
                                mode="outlined"
                                style={{width:'70%', backgroundColor:'white'}}
                            />
                            
                        </View>
                        
                    </View>

                    
                    </KeyboardAwareScrollView>

                    <TouchableOpacity onPress={Login}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                            style={{padding:15}}
                        >
                            <Text style={{fontSize:24, textAlign:'center', color:'white'}}>
                                Sign In
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
            </View>
    )
}

export default Login;