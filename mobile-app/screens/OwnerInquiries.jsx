import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import api from '../utils/api';

export default function OwnerInquiries() {
  const [inquiries, setInquiries] = useState([]);

  const fetch = async () => {
    try {
      const res = await api.get('/inquiries/owner');
      setInquiries(res.data);
    } catch (err) { console.error(err); }
  };
  useEffect(()=>{ fetch(); }, []);

  const update = async (id, status) => {
    await api.patch(`/inquiries/${id}`, { status });
    Alert.alert('Updated');
    fetch();
  };

  return (
    <View style={{flex:1,padding:12}}>
      <FlatList data={inquiries} keyExtractor={i=>i._id} renderItem={({item}) => (
        <View style={{padding:12,borderBottomWidth:1,borderColor:'#eee'}}>
          <Text style={{fontWeight:'700'}}>{item.fromUser?.name}</Text>
          <Text>{item.message}</Text>
          <Text>For: {item.boarding?.title}</Text>
          <View style={{flexDirection:'row',marginTop:8}}>
            <TouchableOpacity onPress={()=>update(item._id,'accepted')}><Text>Accept</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>update(item._id,'rejected')} style={{marginLeft:12}}><Text>Reject</Text></TouchableOpacity>
          </View>
        </View>
      )} />
    </View>
  );
}
