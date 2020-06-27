import React,{useState,useEffect} from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {URL} from '../../utils/global'
import Loading from '../../components/loading'

function Login(props) {
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const logo = "../../assets/images/logo.png"
    const indonesia = "../../assets/images/indonesia.png"

    const { height, width } = Dimensions.get("window");

    const urlRegister = URL+"v1/oauth/register"
    const urlLogin = URL+"v1/oauth/login"

    const goToHome = () => {
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                        { name: 'Home', params:{title:'Home'} },
                    ]
        }));  
    }

    useEffect(()=>{
        checkLogin()
    },[])

    const checkLogin = async() =>{
        let value = await AsyncStorage.getItem('data');
        if(value=null){
            console.log(value)
            goToHome()
        }
        console.log(value)

    }

    const SignIn = () => {
        setLoading(true)
        fetch(urlLogin, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username:email,
                password
            })
        })
    
        .then((response) => response.json())
        .then( async(responseData) => {
            console.log(responseData)
            setLoading(false)
            if(responseData.data=="Password incorrect"){
                alert("Password Anda Salah")
            }else if(responseData.data=="Your account not yet registered"){
                alert("Akun Belum Terdaftar")
            }else{
                await AsyncStorage.setItem('data', JSON.stringify(responseData.data));
                // console.log(responseData.data)
                goToHome()
            }
        })
        .done();
    }

    //Pergi ke Hal Home, Indexnya di reset
    const SignUp = () => {  
        setLoading(true)
        fetch(urlRegister, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname,
                phone,
                password,
                email
            })
        })
    
        .then((response) => response.json())
        .then( async(responseData) => {
                setLoading(false)
                await AsyncStorage.setItem('data', JSON.stringify(responseData.data));
                // console.log(responseData.data)
                goToHome()
        })
        .done();  
        // goToHome()

    }      
    
    const changeLogin = () => {
        setLogin(!login)
    }

    return (
            <View style={{ backgroundColor: 'white', flex: 1}}>

                <KeyboardAwareScrollView>
                
                    <Image
                        source={require(logo)}
                        style={{ width: width*1.2, height:  height*0.3, alignSelf: 'center', marginBottom:height*0.05, marginTop:height*0.11}}
                        resizeMode='cover'
                        width={width*1.2}
                        height={height*0.3} />

                    <View style={{flex:1}}>
                        {!login &&
                            <TextInput
                                label='Nama Lengkap'
                                value={fullname}
                                mode = "outlined"
                                onChangeText={(val)=> setFullname(val)}
                                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', marginBottom:height*0.01}} 
                            />
                        }

                        <TextInput
                            label='Email'
                            value={email}
                            mode = "outlined"
                            onChangeText={(val)=> setEmail(val)}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white', marginBottom:height*0.01}} 
                        />    

                        {!login &&
                            <View style={{width:"90%", alignSelf:'center', justifyContent:'space-between', flexDirection:'row', marginBottom:height*0.01}}>
                                <View style={{height:height*0.055, width:'25%', marginTop:7, borderRadius: 5, borderColor: 'grey', borderWidth: 1,}}>

                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', flex:1}}>
                                        <Image
                                            source={require(indonesia)}
                                            style={{ width: width*0.06, height: height*0.03, alignSelf: 'center'}}
                                            resizeMode='cover'
                                            width={width*0.06}
                                            height={height*0.03} />
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
                        }

                        <TextInput
                            label='password'
                            value={password}
                            mode = "outlined"
                            secureTextEntry={true}
                            onChangeText={(val)=> setPassword(val)}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white'}} 
                        />   

                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:height*0.01}}>
                            <Text>{!login ? "Sudah" : "Belum"} Mendaftar ? </Text>
                            <TouchableOpacity onPress={changeLogin}>
                                <Text style={{color:'#07A9F0'}}> Klik Disini</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    
                    </KeyboardAwareScrollView>
                    
                    {loading &&
                        <Loading/>
                    }

                    {!login ?
                        <TouchableOpacity onPress={SignUp}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                style={{padding:15}}
                            >
                                <Text style={{fontSize:24, textAlign:'center', color:'white'}}>
                                    Sign Up
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={SignIn}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                style={{padding:15}}
                            >
                                <Text style={{fontSize:24, textAlign:'center', color:'white'}}>
                                    Sign In
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }
            </View>
    )
}

export default Login;