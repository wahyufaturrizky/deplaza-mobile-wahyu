import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

export default class Splash extends Component{

    componentDidMount = () => {
        this.checkLogin()
    }

    goToHome = () => {
        this.props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                        { name: 'JualanAnda', params:{title:'Jualan Anda', pop:1} },
                    ]
        }));  
    }

    checkLogin = async() =>{
        let value = await AsyncStorage.getItem('data');
        if(value!=null){
            console.log(value)
            this.goToHome()
        }
        console.log(value)
    }

    render(){
        return(
            <View style={styles.container}>
                <Image resizeMode="contain" source={require('../../assets/images/logo-horizontal.png')}/>
                <TouchableOpacity  style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                               style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                    Regular
                                </Text>
                            </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                               style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                    VIP
                                </Text>
                            </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderRadius: 5,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        fontSize:17, 
        textAlign:'center', 
        color:'white',
    }
})