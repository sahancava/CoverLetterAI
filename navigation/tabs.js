import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Image, Text, Platform } from 'react-native';

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  FileUploadScreen,
} from '../src/screens';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const createStack = (initialComponent, initialRouteName) => {
    return () => (
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={initialRouteName} component={initialComponent} />
      </Stack.Navigator>
    );
  };

const Tabs = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: [
                {
                    ...styles.topBarStyle,
                    ...styles.shadow
                },
                null
                ]
            }}
            >
            <Tab.Screen 
                name="StartScreen" 
                component={createStack(StartScreen, "StartScreen")} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={[styles.iconContainer, 
                            Platform.OS === 'android' ? styles.androidIconContainer : styles.iosIconContainer]}>
                            <Image
                                source={require('../assets/tabIcons/home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Home</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="RegisterScreen" 
                component={createStack(RegisterScreen, "RegisterScreen")} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={[styles.iconContainer, 
                            Platform.OS === 'android' ? styles.androidIconContainer : styles.iosIconContainer]}>
                            <Image
                                source={require('../assets/tabIcons/home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>RegisterScreen</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="LoginScreen" 
                component={createStack(LoginScreen, "LoginScreen")} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={[styles.iconContainer, 
                            Platform.OS === 'android' ? styles.androidIconContainer : styles.iosIconContainer]}>
                            <Image
                                source={require('../assets/tabIcons/home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>RegisterScreen</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="FileUploadScreen" 
                component={createStack(FileUploadScreen, "FileUploadScreen")} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={[styles.iconContainer, 
                            Platform.OS === 'android' ? styles.androidIconContainer : styles.iosIconContainer]}>
                            <Image
                                source={require('../assets/tabIcons/home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>RegisterScreen</Text>
                        </View>
                    )
                }}
            />
            {/* You can add more tabs with icons here if you need */}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    topBarStyle: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        height: 90,
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    iconContainer: {
        alignItems: 'center', 
        justifyContent: 'center',
        top: 10
    },
    iosIconContainer: {
        paddingTop: 10
    },
    androidIconContainer: {
        alignItems: 'center', 
        justifyContent: 'center',
        top: 0
    }
});

export default Tabs;
