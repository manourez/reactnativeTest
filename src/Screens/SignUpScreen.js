import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
  StatusBar,
  Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {Button} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const SignUpScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    firstname:'',
    lastname:'',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    check_emailInputChange:false,
    secureTextEntry: true,
    confirm_secureTextEntry:true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword:true
  });

  const register = (email, password, username, firstname, lastname) => {
    axios.post('https://staging.api.bigcity.bfedition.com/api/oauth/register', {
      first_name: firstname,
      last_name: lastname,
      username: username,
      email: email,
      password: password,
      age: 18,
      role_slug: 'client'
    })
    .then(function (response) {
      navigation.navigate('Login');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: response.data.type,
        text2: 'Vous avez créer un compte avec succès',
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

  const emailInputChange = (val) => {
    if(val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_emailInputChange:true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_emailInputChange:false
      });
    }
  }

  const firstnameInputChange = (val) => {
    if(val.length !== 0) {
      setData({
        ...data,
        firstname: val
      });
    }
  }

  const userNameInputChange = (val) => {
    if(val.length !== 0) {
      setData({
        ...data,
        username: val
      });
    }
  }

  const lastnameInputChange = (val) => {
    if(val.length !== 0) {
      setData({
        ...data,
        lastname: val
      });
    }
  }

  const handlePasswordChange = (val) => {
    if(val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      });
    }
  }

  const handleConfirmPasswordChange = (val) => {
    if(val.trim().length >= 8) {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: true
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: false
      });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
    });
  }

  const handleValidEmail = (val) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(regex.test(val)) {
      setData({
        ...data,
        isValidEmail: true
      });
    } else {
      setData({
        ...data,
        isValidEmail: false
      });
    }
  }

  const registerHandle = (email, firstname, lastname, username, password) => {
    if (data.email.length == 0 || data.password.length == 0 || data.confirm_password.length == 0 || data.firstname.length == 0 || data.lastname.length == 0 || data.username.length == 0) {
      Alert.alert('Erreur!', 'Vous devez renseigner tous les champs', [
        {text: 'Okay'}
      ]);
      return;
    } else if (data.password !== data.confirm_password) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: 'Les mots de passe sont differents',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      });
    } else if (data.isValidEmail && data.isValidPassword && data.isValidConfirmPassword) {
      register(email, password, username, firstname, lastname);
    } 
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={{flexDirection:'row'}}>
          <View style={[styles.action, {flex:1}]}>
            <FontAwesome name="users" color='#000' size={20}/>
            <TextInput
              placeholder='Nom de famille'
              placeholderTextColor="#000"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val)=>lastnameInputChange(val)}
            />
          </View>
          <View style={[styles.action, {flex:1}]}>
            <FontAwesome name="user" color='#000' size={20}/>
            <TextInput
              placeholder='Prénom'
              placeholderTextColor="#000"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val)=>firstnameInputChange(val)}
            />
          </View>
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color='#000' size={20}/>
          <TextInput
            placeholder="Entrez votre e-mail adresse"
            placeholderTextColor="#000"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val)=>emailInputChange(val)}
            onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
          />
          {data.isValidEmail ? 
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          : 
            <Animatable.View animation="bounceIn">
              <Feather name="x-circle" color="#ba0029" size={20} />
            </Animatable.View>
          } 
        </View>
        {data.isValidEmail ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Le format de votre e-mail adresse est incorrect</Text>
          </Animatable.View>
        }
        <View style={styles.action}>
          <FontAwesome name="user" color='#000' size={20}/>
          <TextInput
            placeholder='Pseudonyme'
            placeholderTextColor="#000"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val)=>userNameInputChange(val)}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="lock" color='#000' size={20} />
          <TextInput
            placeholder="Entrez votre mot de passe"
            placeholderTextColor="#000"
            secureTextEntry={true}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val)=>handlePasswordChange(val)}
            secureTextEntry={data.secureTextEntry ? true : false}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? 
              <Feather name="eye-off" color="#ba0029" size={20} />
            :
              <Feather name="eye" color="#ba0029" size={20} />
            }
          </TouchableOpacity> 
        </View>
        {data.isValidPassword ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Le mot de passe doit comporter au moins 8 caractères.</Text>
          </Animatable.View>
        }
        <View style={styles.action}>
          <FontAwesome name="lock" color='#000' size={20} />
          <TextInput
            placeholder="Confirmez votre mot de passe"
            placeholderTextColor="#000"
            confirm_secureTextEntry={true}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val)=>handleConfirmPasswordChange(val)}
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirm_secureTextEntry ? 
              <Feather name="eye-off" color="#ba0029" size={20} />
            :
              <Feather name="eye" color="#ba0029" size={20} />
            }
          </TouchableOpacity> 
        </View>
        {data.isValidConfirmPassword ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Le mot de passe doit comporter au moins 8 caractères.</Text>
          </Animatable.View>
        }
        <View style={styles.button}>
          <Button
            onPress={() => {registerHandle(data.email, data.firstname, data.lastname, data.username, data.password)}}
            mode='contained'   
            dark
            color="#ba0029"
            uppercase={false}
            labelStyle={styles.textSign}
            contentStyle={styles.signIn}
          >          
            S'inscrire        
          </Button>
        </View>
      </Animatable.View>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    justifyContent:'center'
  },
  header: {
    justifyContent:'center',
    alignItems:'center',
    marginBottom:40,
    marginTop:20
  }, 
  headerText: {
    color:'#fff',
    fontSize:30,
    fontWeight:'bold'
  },
  footer: {    
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
  errorMsg: {
    color: '#ba0029',
    fontSize: 14,
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
  }
});

export default SignUpScreen;