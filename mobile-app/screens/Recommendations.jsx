import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import BoardingCard from '../components/BoardingCard';
import api from '../utils/api';

export default function Recommendations({ navigation }) {
  const [items,setItems]=useState([]);
  useEffect(()=> { (async ()=> { const res = await api.get('/recommend'); setItems(res.data); })(); }, []);
  return (
    <View style={{flex:1}}>
      <FlatList data={items} keyExtractor={i=>i._id} renderItem={({item}) => <BoardingCard item={item} onPress={()=>navigation.navigate('BoardingDetail',{id:item._id})} />} contentContainerStyle={{padding:12}} />
    </View>
  );
}
