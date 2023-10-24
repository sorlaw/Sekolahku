/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LoginScreen from './frontend/screens/LoginScreen';
import HomeScreen from './frontend/screens/HomeScreen';
import DetailScreen from './frontend/screens/DetailScreen';
import AddScreen from './frontend/screens/AddScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { IconButton } from 'react-native-paper';
import { db } from './DatabaseHelper';
import { SiswaContext } from './SiswaContext';
import { deleteSiswa } from './DatabaseHelper';
import UpdateScreen from './frontend/screens/UpdateScreen';


const Stack = createNativeStackNavigator();



function App() {
  const [context,setContext] = useState(2);
  return (
        <SiswaContext.Provider value={[context,setContext]}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerBackVisible: false,
            headerTitle: 'Sekolahku',
            headerStyle: {
              backgroundColor: 'blue',
            },
            headerTitleStyle: {
              color: 'white',
            },
            
          }}
        />
        <Stack.Screen name='Detail' component={DetailScreen} options={
          ({navigation,route}) => {
            const {firstName,lastName,jenjang,hobi,id,phoneNum,gender,alamat} = route.params;

         return   {
         headerTitle: 'Detail Siswa', 
         headerRight: () =><View style={{flexDirection: 'row',width:100, justifyContent: 'space-around'}}>
           <IconButton icon='pencil' size={25} iconColor='white' onPress={() => navigation.navigate('Ubah',{firstName,lastName,jenjang,hobi,phoneNum,gender,alamat,id})} />
          <IconButton icon='trash-can' size={25} iconColor='white' onPress={() => deleteSiswa({navigation},id)} />
           </View>,
        headerStyle: {backgroundColor: 'blue'}, 
        headerTitleStyle: {color: 'white',},
        headerTintColor: 'white'
            }
        }
        } />
        <Stack.Screen name='Ubah' component={UpdateScreen} options={{headerTitle: 'Ubah Siswa', headerTitleStyle: {color: 'white'}, headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white'}} />
        <Stack.Screen name='Tambah' component={AddScreen} options={({navigation, route}) => ({
          headerTitle: 'Tambah Siswa', 
          headerStyle: {backgroundColor: 'blue'}, 
          headerTitleStyle: {color: 'white'}, 
          headerTintColor: 'white', 
        })}  />
      </Stack.Navigator>
    </NavigationContainer>
        </SiswaContext.Provider>
  );
}

export default App;
