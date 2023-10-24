import {View, Image, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import { PaperProvider } from 'react-native-paper';


const LoginScreen = ({navigation}) => {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const checkLogin = () => {
    if (username == 'admin' && password == 'admin') {
      navigation.replace('Home',{num: 1})
    }else{
      alert('Maaf kamu bukan admin')
    }

  }

  return (
    <PaperProvider>
    <View style={{flex: 1}}>
      <View style={{marginTop: 20, alignSelf: 'center'}}>
        <Image
          source={require('../../assets/images/sekolah.png')}
          style={{
            width: 150,
            height: 150,
            borderRadius: 150 / 2,
          }}
        />
      </View>
      <View style={{marginTop: 20, width: '90%', alignSelf: 'center'}}>
        <TextInput
          placeholder="Username"
          style={{borderWidth: 1, paddingLeft: 10, borderRadius: 5}}
          onChangeText={setUsername}
          autoCapitalize='none'
        />
        <TextInput
          placeholder="Password"
          style={{
            borderWidth: 1,
            paddingLeft: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <View style={{marginTop: 30}}>
          <Button
            title="Press me"
            color="blue"
            onPress={checkLogin}
          />
        </View>
      </View>
    </View>
    </PaperProvider>
  );
};

export default LoginScreen;
