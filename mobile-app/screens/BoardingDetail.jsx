import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import api from '../utils/api';

export default function BoardingDetail({ route, navigation }) {
  const { id } = route.params;
  const [boarding,setBoarding]=useState(null);
  const [message,setMessage]=useState('');

  useEffect(()=> {
    (async ()=> {
      try {
        const res = await api.get(`/boardings/${id}`);
        setBoarding(res.data);
      } catch (err) { console.error(err); }
    })();
  },[]);

  const sendInquiry = async () => {
    try {
      const res = await api.post('/inquiries', { boardingId: id, message });
      Alert.alert('Sent', 'Inquiry sent to owner');
      setMessage('');
    } catch (err) { Alert.alert('Error', err.response?.data?.error || err.message); }
  };

  if (!boarding) return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Loading...</Text></View>;

  return (
    <ScrollView style={{flex:1,padding:12}}>
      <Image source={{uri: boarding.photos?.[0] || 'https://via.placeholder.com/400'}} style={{width:'100%',height:200,borderRadius:8}} />
      <Text style={{fontSize:22,fontWeight:'700',marginTop:12}}>{boarding.title}</Text>
      <Text style={{color:'#666',marginVertical:8}}>{boarding.address}</Text>
      <Text style={{fontWeight:'700'}}>Rs. {boarding.rent} / mo</Text>
      <Text style={{marginTop:12}}>{boarding.description}</Text>

      <View style={{marginTop:20}}>
        <TextInput placeholder="Message to owner..." value={message} onChangeText={setMessage} style={{backgroundColor:'#fff',padding:12,borderRadius:8}} />
        <TouchableOpacity style={{backgroundColor:'#071133',padding:12,borderRadius:8,marginTop:8,alignItems:'center'}} onPress={sendInquiry}><Text style={{color:'#fff'}}>Send Inquiry</Text></TouchableOpacity>
      </View>

      <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.btn}><Text>Save</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Chat', { roomId: id })}><Text>Chat</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn:{backgroundColor:'#fff',padding:12,borderRadius:8,shadowOpacity:0.05,elevation:2}
});
