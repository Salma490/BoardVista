import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import api from '../utils/api';

export default function OwnerDashboard({ navigation }) {
  const [mine, setMine] = useState([]);

  const fetchMine = async () => {
    try {
      const res = await api.get('/boardings?owner=true');
      setMine(res.data);
    } catch (err) { console.error(err); }
  };
  useEffect(()=>{ fetchMine(); }, []);

  const remove = async (id) => {
    await api.delete(`/boardings/${id}`);
    fetchMine();
  };

  return (
    <View style={{flex:1,padding:12}}>
      <TouchableOpacity onPress={()=>navigation.navigate('PostBoarding')} style={{marginBottom:12}}><Text>Post New Boarding</Text></TouchableOpacity>
      <FlatList data={mine} keyExtractor={i=>i._id} renderItem={({item}) => (
        <View style={{padding:12,borderBottomWidth:1,borderColor:'#eee'}}>
          <Text style={{fontWeight:'700'}}>{item.title}</Text>
          <Text>Rs. {item.rent}</Text>
          <View style={{flexDirection:'row',marginTop:8}}>
            <TouchableOpacity onPress={()=>navigation.navigate('OwnerInquiries',{boardingId:item._id})}><Text>Inquiries</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>remove(item._id)} style={{marginLeft:12}}><Text>Delete</Text></TouchableOpacity>
          </View>
        </View>
      )} />
    </View>
  );
}
