import React,{useState,useEffect} from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet
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
    const [modal, setModal] = useState(false)
    
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
        if(value!=null){
            console.log(value)
            goToHome()
        }
        console.log(value)

    }

    const forgotTrigger = () =>{
        setModal(!modal)
    }

    const SignIn = async() => {
        let formdata = new FormData();
        formdata.append("username", email)
        formdata.append("password", password)

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data'
            }
        };

        setLoading(true)
        // alert(email+password)
        fetch(urlLogin, requestOptions)

    
        .then((response) => response.json())
        .then( async(responseData) => {
            // console.log(responseData)
            setLoading(false)
            if(responseData.data=="Password incorrect"){
                alert("Password Anda Salah")
            }else if(responseData.data=="Your account not yet registered"){
                alert("Akun Belum Terdaftar")
            }else{
                await AsyncStorage.setItem('data', JSON.stringify(responseData.data));
                console.log(responseData.data)
                goToHome()
            }
        })
        .done();
        // await AsyncStorage.setItem('data', JSON.stringify(data));
        // goToHome()
    }

    //Pergi ke Hal Home, Indexnya di reset
    const SignUp = () => {  
        let formdata = new FormData();
        formdata.append("fullname", fullname)
        formdata.append("phone", phone)
        formdata.append("password", password)
        formdata.append("email", email)
        formdata.append("username", email)

        setLoading(true)

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data'
            }
        };

        fetch(urlRegister, requestOptions)
        .then((response) => response.json())
        .then( async(responseData) => {
                setLoading(false)
                if(!responseData.status){
                    if(responseData.data.email!=null){
                        alert("Email Sudah Terdaftar")
                    }else if(responseData.data.phone!=null){
                        alert("Nomor Handphone Sudah Terdaftar")
                    }
                }else if(responseData.status){
                    await AsyncStorage.setItem('data', JSON.stringify(responseData.data));
                    alert("Pendaftaran Berhasil")
                    goToHome()
                }
        })
        .done();

    }      
    
    const changeLogin = () => {
        setLogin(!login)
    }

    const forgotSubmit = () => {
        // setLogin(!login)
        alert("tes")
    }

    return (
            <View style={{ backgroundColor: 'white', flex: 1}}>

                <KeyboardAwareScrollView>
                
                    <Image
                        source={require(logo)}
                        style={{ width: width*1.2, height:  height*0.3, alignSelf: 'center', marginBottom:height*0.05, marginTop:height*0.08}}
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
                                selectionColor={"#07A9F0"}
                                underlineColor={"#07A9F0"}
                                underlineColorAndroid={"#07A9F0"}
                                theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
                                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', marginBottom:height*0.01}} 
                            />
                        }

                        <TextInput
                            label='Email'
                            value={email}
                            mode = "outlined"
                            keyboardType="email-address"
                            onChangeText={(val)=> setEmail(val)}
                            selectionColor={"#07A9F0"}
                            underlineColor={"#07A9F0"}
                            underlineColorAndroid={"#07A9F0"}
                            theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white', marginBottom:height*0.01}} 
                        />    

                        {!login &&
                            <View style={{width:"90%", alignSelf:'center', justifyContent:'space-between', flexDirection:'row', marginBottom:height*0.01}}>
                                <View style={{height:55, width:'25%', marginTop:7, borderRadius: 5, borderColor: 'grey', borderWidth: 1,}}>

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
                                    placeholder="Nomor Handphone"
                                    onChangeText={(val)=> setPhone(val)}
                                    mode="outlined"
                                    keyboardType="numeric"
                                    selectionColor={"#07A9F0"}
                                    underlineColor={"#07A9F0"}
                                    underlineColorAndroid={"#07A9F0"}
                                    theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
                                    style={{width:'70%',  backgroundColor:'white'}}
                                />
                                
                            </View>
                        }

                        <TextInput
                            label='password'
                            value={password}
                            mode = "outlined"
                            secureTextEntry={true}
                            selectionColor={"#07A9F0"}
                            underlineColor={"#07A9F0"}
                            underlineColorAndroid={"#07A9F0"}
                            onChangeText={(val)=> setPassword(val)}
                            theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
                            style={{width:'90%', alignSelf:'center',  backgroundColor:'white'}} 
                        />   

                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:height*0.01}}>
                            <Text>{!login ? "Sudah" : "Belum"} Mendaftar ? </Text>
                            <TouchableOpacity onPress={changeLogin}>
                                <Text style={{color:'#07A9F0'}}> Klik Disini</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:height*0.01}}>
                            <TouchableOpacity onPress={forgotTrigger}>
                                <Text style={{color:'#07A9F0'}}> Lupa Password ?</Text>
                            </TouchableOpacity>
                        </View> */}

                    </View>
                    { modal &&
                    <View style={{position:'absolute', flex:1, zIndex:1, width:width, height:height, bottom:0, backgroundColor:'rgba(255,255,255,0.5)', justifyContent:'center', alignItems:'center'}}>
                        <View style={[styles.shadow,{alignSelf:'center', alignItems:'center', width:width*0.8, height:height*0.2, backgroundColor:'rgba(255,255,255,1)', marginTop:height*0.5 }]}>
                            <TouchableOpacity style={{alignSelf:'flex-end', marginRight:width*0.02}} onPress={forgotTrigger}>
                                <Text style={{fontSize:20}}>X</Text>
                            </TouchableOpacity>
                            <TextInput
                                label='Masukkan Email Recoveri'
                                value={email}
                                mode = "outlined"
                                keyboardType="email-address"
                                onChangeText={(val)=> setEmail(val)}
                                selectionColor={"#07A9F0"}
                                underlineColor={"#07A9F0"}
                                underlineColorAndroid={"#07A9F0"}
                                theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
                                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', marginBottom:height*0.01}} 
                            />

                            <TouchableOpacity onPress={forgotSubmit}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                    style={{padding:10}}
                                >
                                    <Text style={{fontSize:16, textAlign:'center', color:'white'}}>
                                        Kirim
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }

                    
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
    },
    shadowBlue : {
        shadowColor: "#07A9F0",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        
        elevation: 22,
    }
})