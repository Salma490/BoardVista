import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import io from 'socket.io-client';
import { API_BASE } from '../utils/constants';

let socket;
export default function ChatScreen({ route }) {
  const { roomId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(()=> {
    socket = io(API_BASE.replace('/api','')); // ensure socket connects to server root
    socket.emit('joinRoom', { roomId });
    socket.on('receiveMessage', m => setMessages(prev => [...prev, m]));
    return () => socket.disconnect();
  }, []);

  const send = () => {
    socket.emit('sendMessage', { roomId, message: text, from: 'Me' });
    setMessages(prev => [...prev, { message: text, from: 'Me', time: Date.now() }]);
    setText('');
  };

  return (
    <View style={{flex:1,padding:12}}>
      <FlatList data={messages} keyExtractor={(i,idx)=>idx.toString()} renderItem={({item}) => <Text>{item.from}: {item.message}</Text>} />
      <TextInput value={text} onChangeText={setText} placeholder="Message" style={{backgroundColor:'#fff',padding:12,borderRadius:8}} />
      <TouchableOpacity onPress={send} style={{backgroundColor:'#071133',padding:12,borderRadius:8,marginTop:8}}><Text style={{color:'#fff'}}>Send</Text></TouchableOpacity>
    </View>
  );
}
