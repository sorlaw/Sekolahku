import { View } from 'react-native'
import React,{useContext} from 'react'
import PriaPicture from "../../assets/images/pria.png"
import WanitaPicture from "../../assets/images/wanita.png"
import { SiswaContext } from '../../SiswaContext'
import { Avatar,IconButton,Text } from 'react-native-paper'

const DetailScreen = ({navigation,route}) => {


  const [context, setContext] = useContext(SiswaContext);
  const {firstName,lastName,jenjang,hobi,id,phoneNum,gender,alamat} = route.params;

  const myHobi = [];

  const displayHobie = (() => {
    for (const key in hobi) {
      if (hobi[key] == true) {
        myHobi.push(key);
      }
    }
  }
  )();



  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Avatar.Image size={150} source={gender == "pria" ? PriaPicture : WanitaPicture} style={{marginTop: 30}} />
      <View style={{width: '100%', marginTop: 30}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>

        <IconButton icon='account-box' size={40} />
        <Text style={{marginLeft:20}} variant='bodyLarge'>{firstName} {lastName}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>

        <IconButton icon='phone' size={40} />
        <Text style={{marginLeft:20}} variant='bodyLarge'>{phoneNum}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>

        <IconButton icon='tag' size={40} />
        <Text style={{marginLeft:20}} variant='bodyLarge'>{gender}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>

        <IconButton icon='stairs' size={40} />
        <Text style={{marginLeft:20}} variant='bodyLarge'>{jenjang}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>

        <IconButton icon='map-marker' size={40} />
        <Text style={{marginLeft:20}} variant='bodyLarge'>{alamat}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>

        <IconButton icon='heart' size={40} />
        <Text style={{marginLeft:20}} variant='bodyLarge'> {myHobi.toString().charAt(0).toUpperCase()}{myHobi.toString().slice(1)}</Text>
        </View>
      </View>
    </View>
  )
}

export default DetailScreen