import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllChat from './AllChat';
import Platform from './Platform';

// untuk manggil createMaterial
const Tab = createMaterialTopTabNavigator();

// Fungsi untuk topbar
function TopBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All" component={AllChat} />
      <Tab.Screen name="Platform" component={Platform} />
    </Tab.Navigator>
  );
}

export default TopBar;
