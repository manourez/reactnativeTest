import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import LandingScreen from '../Screens/LandingScreen';

const HomeStack = createStackNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0
        },
        headerTintColor: '#ba0029'
      }}
    >
      <HomeStack.Screen
        name="Login"
        component={SignInScreen}
        options={{
          headerTitle: 'Se connecter',
          headerTitleAlign:'center'
        }}
      />

      <HomeStack.Screen
        name="Register"
        component={SignUpScreen}
        options={{
          headerTitle: "S'inscrire",
          headerTitleAlign:'center'
        }}
      />

      <HomeStack.Screen
        name="Landing"
        component={LandingScreen}
        options={{
          headerTitle: "Accueil",
          headerTitleAlign:'center'
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreens;