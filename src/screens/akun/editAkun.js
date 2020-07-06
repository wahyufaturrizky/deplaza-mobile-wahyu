import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';

// import { TabView, SceneMap } from 'react-native-tab-view';

import Appbar from '../../components/appbarHome'
import Kontak from './editKontak'
import Pribadi from './editPribadi'

function MyTabBar(props) {
    return (
    <View>
        <Appbar params={props}/>
        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
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
                        style={{ flex: 1 }}
                    >
                        {/* <Animated.Text style={{ opacity, color:'black' }}>{label}</Animated.Text> */}
                        <Text style={{textAlign:'center', borderBottomColor:isFocused ? "#07A9F0" : "gray"}}>{label}</Text>
                    </TouchableOpacity>
            );
            })}
        </View>
    </View>
    );
}

const Tab = createMaterialTopTabNavigator();

function editAkun(props) {
    const initialLayout = { width: Dimensions.get('window').width };

    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Kontak" component={Kontak} />
            <Tab.Screen name="Pribadi" component={Pribadi} />
        </Tab.Navigator>
    );
}

export default editAkun;