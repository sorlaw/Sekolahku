import { View, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { PaperProvider, Button, Avatar, Searchbar, Divider, Text } from 'react-native-paper';
import PriaPicture from "../../assets/images/pria.png"
import WanitaPicture from "../../assets/images/wanita.png"
import { SiswaContext } from '../../SiswaContext';
import { getSiswaByName } from '../../DatabaseHelper';
import { listUsers } from '../../DatabaseHelper';


const HomeScreen = ({ navigation, route }) => {


  const [context, setContext] = useContext(SiswaContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (context > 2) {
      setData([])
      listUsers(setData);
    } else {
      listUsers(setData);
    }
  }, [context])


  const Item = ({ firstName, lastName, gender, jenjang, phoneNum, id, hobi, alamat }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { id, hobi, firstName, lastName, jenjang, gender, phoneNum, alamat })}>
      <View style={styles.item}>
        <Avatar.Image size={50} source={gender == "pria" ? PriaPicture : WanitaPicture} />
        <View style={{ flexDirection: 'column', width: '90%' }}>
          <View style={{ marginLeft: 10, flexDirection: 'row', width: '95%', justifyContent: 'space-between', }}>
            <Text variant='titleSmall'>{firstName} {lastName}</Text>
            <Text variant='bodySmall'>{jenjang}</Text>
          </View>
          <View style={{ marginLeft: 10, flexDirection: 'row', width: '95%', justifyContent: 'space-between', }}>
            <Text variant='bodySmall'>{gender}</Text>
            <Text variant='bodySmall'>{phoneNum}</Text>
          </View>
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
        }}>
        <View>
          <Searchbar
            placeholder="Search"
            onSubmitEditing={async({nativeEvent: {text, eventCount, target}}) =>{
              await getSiswaByName(text,setData);
            }}
            mode='view'
          />

          <FlatList
            data={data}
            renderItem={({ item }) => <Item hobi={JSON.parse(item.hobi)} firstName={item.first_name} lastName={item.last_name} jenjang={item.jenjang} gender={item.gender} phoneNum={item.phone_num} id={item.id} alamat={item.alamat} />}
            keyExtractor={item => item.id}
          /> 
        </View>
        <Button icon='plus-thick' mode='contained' onPress={() => {
          navigation.navigate('Tambah')
        }} style={{ position: 'absolute', zIndex: 10, left: '55%', bottom: '10%', width: 150, }}>
          Tambah Siswa</Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#CEDEBD',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    marginLeft: 20,
    fontSize: 20
  },
});

export default HomeScreen;
