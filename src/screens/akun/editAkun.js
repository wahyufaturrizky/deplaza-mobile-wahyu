import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Kontak from './editKontak'
import Pribadi from './editPribadi'

const { height, width } = Dimensions.get("window");


function MyTabBar(props) {
    const gotoAkun = () => {
        props.navigation.navigate("Akun", {title:"Akun Saya", ...props})
    }

    return (
    <View>
        <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:'white', padding:10}}>
            <View style={{flexDirection:'row', alignItems:'center', width:'70%'}}>
                <TouchableOpacity onPress={gotoAkun}>
                    <Icon name={"arrow-left"} size={30} color={"#707070"} style={{marginRight:width*0.02}}/>
                </TouchableOpacity>
                <Text style={{fontSize:16}}>Ubah Informasi Profil</Text>
            </View>
            <View style={{width:'25%'}}>
                {/* <TouchableOpacity>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                        style={{borderRadius:10, padding:8,justifyContent:'center', alignItems:'center'}}
                    >
                        <Text style={{fontSize:14, textAlign:'center', color:'white'}}>
                            Simpan
                        </Text>
                    </LinearGradient>
                </TouchableOpacity> */}
            </View>
        </View>

        <View style={[styles.shadow,{ flexDirection: 'row', paddingTop: 20, backgroundColor:'white' }]}>
            {props.state.routes.map((route, index) => {
            const { options } = props.descriptors[route.key];
            const label =
                options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = props.state.index === index;

            const onPress = () => {
                const event = props.navigation.emit({
                type: 'tabPress',
                target: route.key,
                });

                if (!isFocused && !event.defaultPrevented) {
                    props.navigation.navigate(route.name);
                }
            };

            const onLongPress = () => {
                props.navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                });
            };
            // modify inputRange for custom behavior
            const inputRange = props.state.routes.map((_, i) => i);
            const opacity = Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(i => (i === index ? 1 : 0)),
            });

            return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 10}}
                    >
                        {/* <Animated.Text style={{ opacity, color:'black' }}>{label}</Animated.Text> */}
                        <Text style={{textAlign:'center', paddingBottom:30, fontSize:20, borderBottomWidth:2, borderBottomColor:isFocused ? "#07A9F0" : "gray", color:isFocused ? "black" : "#949494"}}>{label}</Text>
                    </TouchableOpacity>
            );
            })}
        </View>
    </View>
    );
}

const Tab = createMaterialTopTabNavigator();

function editAkun(props) {
    let data = props.route.params.data

    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Kontak" component={Kontak}/>
            <Tab.Screen name="Pribadi" component={Pribadi}/>
        </Tab.Navigator>
    );
}

export default editAkun;

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