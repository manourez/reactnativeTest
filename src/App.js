import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackScreens from './Components/HomeStackScreens';
import Toast from 'react-native-toast-message';
 
const App = () => {
  return (
    <NavigationContainer>
      <HomeStackScreens />  
      <Toast ref={(ref) => Toast.setRef(ref)} />      
    </NavigationContainer>      
  );
};
 
 export default App;
 