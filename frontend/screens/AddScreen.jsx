
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { PaperProvider,TextInput,RadioButton,Checkbox, IconButton, Snackbar   } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'
import { db } from '../../DatabaseHelper'
import { SiswaContext } from '../../SiswaContext'
import { saveSiswa } from '../../DatabaseHelper'
import { StackActions } from '@react-navigation/native';

const AddScreen = ({navigation}) => {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [phoneNum,setPhoneNum] = useState("");
  const [gender, setGender] = useState('pria');
  const [jenjang,setJenjang] = useState("TK")
  const [membaca,setMembaca] = useState(false);
  const [menulis,setMenulis] = useState(false);
  const [menggambar,setMenggambar] = useState(false);
  const hobi = {
    membaca: membaca,
    menulis: menulis,
    menggambar: menggambar
  }
  const [alamat,setAlamat] = useState("");
  const [context, setContext] = useContext(SiswaContext);
  const [visible,setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const sendData = () => {
    if (!firstName || !lastName || !phoneNum || !gender || !jenjang || !hobi || !alamat) {
      onToggleSnackBar();
    }else{
      saveSiswa(firstName,lastName,phoneNum,gender,jenjang,hobi,alamat);
      setContext(context + 1);
      const popAction = StackActions.pop(1);
      navigation.dispatch(popAction);
    }
  }

  const deleteTable = () => {
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS siswa;', [], (tx, result) => {
        console.log('Table deleted successfully');
      }, (error) => {
        console.log('Error deleting table:', error);
      });
    });
  }

  const createSiswaTable = () => {
    db.executeSql("CREATE TABLE IF NOT EXISTS siswa (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR, last_name VARCHAR, phone_num INT(12),gender VARCHAR,jenjang VARCHAR, hobi JSON, alamat VARCHAR)", [], (result) => {
        console.log("Table created successfully");
    }, (error) => {
        console.log("Create table error", error)
    })
}

  const data = [
    {key:'1', value:'TK'},
    {key:'2', value:'SD'},
    {key:'3', value:'SMP'},
    {key:'4', value:'SMA'},
    
]


useEffect(() => {
  createSiswaTable();
},[])
  return (
      <ScrollView>
    

    <PaperProvider>

    <View style={{flex: 1, paddingHorizontal:10}}>
      <View style={{flexDirection: 'row',gap: 10, marginTop: 10}}>
          <TextInput value={firstName} onChangeText={setFirstName} label='Nama Depan' mode='outlined' style={{width: '48%'}} />
          <TextInput value={lastName} onChangeText={setLastName} label='Nama Belakang' mode='outlined' style={{width: '48%'}} />
      </View>
          <TextInput value={phoneNum} inputMode='numeric' onChangeText={setPhoneNum} label='No Hp'  mode='outlined' style={{marginTop: 10}} />
          <View>
          <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
          <Text style={{marginTop: 20, marginLeft: 5, color: 'purple', marginBottom: 10}}>Gender</Text>
            <View style={{flexDirection: 'row'}}>

      <View style={{flexDirection: 'row', alignItems: 'center'}} >
        <RadioButton value="pria" />
        <Text>Pria</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RadioButton value="wanita" />
        <Text>Wanita</Text>
      </View>
            </View>
    </RadioButton.Group>
    <View style={{width: '100%'}}>
      <View>

      <Text style={{marginTop: 10, marginLeft: 5, color: 'purple', marginBottom: 10}}>Jenjang</Text>
      <SelectList 
        setSelected={(val) => setJenjang(val)} 
        data={data} 
        save="value"
        search={false}
        placeholder='Pilih Jenjang Pendidikan'
    />
      </View>

    <View>

    <Text style={{marginTop: 15, marginLeft: 5, color: 'purple', marginBottom: 10}}>Hobi</Text>
    <Checkbox.Item label="Membaca" labelStyle={{ paddingEnd: '65%', }} position='leading' status={membaca ? "checked" : "unchecked"} onPress={() => setMembaca(!membaca)}  />
    <Checkbox.Item label="Menulis" labelStyle={{ paddingEnd: '69%', }} position='leading'  status={menulis ? "checked" : "unchecked"} onPress={() => setMenulis(!menulis)} />
    <Checkbox.Item label="Menggambar" labelStyle={{ paddingEnd: '57%', }} position='leading' status={menggambar ? "checked" : "unchecked"} onPress={() => setMenggambar(!menggambar)} />

    </View>
    

    <TextInput style={{marginTop: 10}} multiline={true} numberOfLines={4} mode='outlined' label='Alamat' value={alamat} onChangeText={setAlamat} />

    <IconButton icon='content-save' mode='contained' size={35} style={styles.fab} onPress={sendData} />
    <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        Maaf semua data harus diisi
      </Snackbar>

    </View>

          </View>
    </View>
    </PaperProvider>
    
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    zIndex: 10
  },
})

export default AddScreen