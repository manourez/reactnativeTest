import React from 'react';
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, TextInput, Platform, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  });

  const login = (email, password) => {
    axios.post('https://staging.api.bigcity.bfedition.com/api/oauth/login', {
      email: email,
      password: password
    })
    .then(function (response) {
        navigation.navigate('Landing');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: response.data.type,
          text2: 'Vous vous connecté avec succès',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40
        });
    })
    .catch(function (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: error.message,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      });
    });
  }

  const textInputChange = (val) => {
    setData({
      ...data,
      email: val,
      check_textInputChange: true
    });
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const loginHandle = (email, password) => {
    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert('Erreur!', 'Vous devez renseigner tous les champs', [
        {text: 'Okay'}
      ]);
      return;
    } else {
      login(email,password);
    } 
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#fff' barStyle="dark-content"/>  
      <Animatable.View animation="fadeInUpBig" style={styles.content}>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color='#000' size={20} />
          <TextInput 
            placeholder="Entrez votre e-mail"
            placeholderTextColor="#000"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
        </View>
        <View style={styles.action}>
          <Feather name="lock" color='#000' size={20} />
          <TextInput 
            placeholder="Mot de passe"
            placeholderTextColor="#000"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? 
              <Feather name="eye-off" color="#ba0029" size={20} />
            :
              <Feather name="eye" color="#ba0029" size={20} />
            }
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => {loginHandle(data.email, data.password)}}
            mode='contained'   
            dark
            color="#ba0029"
            uppercase={false}
            labelStyle={styles.textSign}
            contentStyle={styles.signIn}
          >          
            Se connecter
          </Button>
        </View>
        <View style={[styles.header, {marginBottom:0, marginTop:15}]}>
          <TouchableOpacity onPress={() => {navigation.navigate('Register')}}>
            <Text style={styles.passwordRecover}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center'
  },
  header: {
    justifyContent:'center',
    alignItems:'center',
    marginBottom:40,
    marginTop:20
  },
  content: {
    paddingHorizontal: 20
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ba0029',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color:'#ba0029'
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 60
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  passwordRecover: {
    fontSize: 16,
    color:'#ba0029',
    fontWeight:'bold'
  },
});

export default SignInScreen;
