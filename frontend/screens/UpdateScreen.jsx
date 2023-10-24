import { View, Text,StyleSheet,ScrollView } from 'react-native'
import React,{useState, useContext} from 'react'
import { PaperProvider,TextInput,RadioButton,Checkbox,IconButton   } from 'react-native-paper'
import { SiswaContext } from '../../SiswaContext'
import { db, updateSiswa } from '../../DatabaseHelper'
import { SelectList } from 'react-native-dropdown-select-list'

const UpdateScreen = ({navigation,route}) => {


  const first_name = route.params.firstName;
  const last_name = route.params.lastName;
  const phone_num = route.params.phoneNum;
  const address = route.params.alamat;
  const jenis_kelamin = route.params.gender;
  const jenjang_sekolah = route.params.jenjang;
  const myHobi = route.params.hobi;
  const id = route.params.id;
  
  
  const [firstName,setFirstName] = useState(first_name);
  const [lastName,setLastName] = useState(last_name);
  const [phoneNum,setPhoneNum] = useState(phone_num.toString());
  const [gender, setGender] = useState(jenis_kelamin);
  const [jenjang,setJenjang] = useState(jenjang_sekolah)
  const [membaca,setMembaca] = useState(myHobi.membaca);
  const [menulis,setMenulis] = useState(myHobi.menulis);
  const [menggambar,setMenggambar] = useState(myHobi.menggambar);
  const [alamat,setAlamat] = useState(address);
  const hobi = {
    membaca: membaca,
    menulis: menulis,
    menggambar: menggambar
  }
  const [context, setContext] = useContext(SiswaContext);

  
  

  const data = [
    {key:'1', value:'TK'},
    {key:'2', value:'SD'},
    {key:'3', value:'SMP'},
    {key:'4', value:'SMA'},
]

const data_jenjang = data.find((obj) => obj.value == jenjang);

const updateData = () => {
  if (!firstName || !lastName || !phoneNum || !gender || !jenjang || !hobi || !alamat) {
    alert('Maaf,semua data harus diisi');
  }else{
    updateSiswa(firstName,lastName,phoneNum,gender,jenjang,hobi,alamat,id);
    setContext(context + 3);
    navigation.navigate('Home')
  }
}

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
        defaultOption={data_jenjang}
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
    <IconButton icon='content-save' mode='contained' size={35} style={styles.fab} onPress={updateData} />
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

export default UpdateScreen