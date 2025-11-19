import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../utils/api';
import { API_BASE } from '../utils/constants';

export default function PostBoarding({ navigation }) {
  const [title,setTitle]=useState('');
  const [address,setAddress]=useState('');
  const [rent,setRent]=useState('');
  const [description,setDescription]=useState('');
  const [photos,setPhotos]=useState([]);
  const [facilities,setFacilities]=useState('');

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ quality:0.6, allowsEditing:true });
    if (res.cancelled) return;
    // upload to backend /uploads
    const data = new FormData();
    const uriParts = res.uri.split('.');
    const fileType = uriParts[uriParts.length-1];
    data.append('photos', { uri: res.uri, name: `photo.${fileType}`, type: `image/${fileType}` });
    try {
      const up = await api.post('/uploads', data, { headers: { 'Content-Type': 'multipart/form-data' }});
      setPhotos(prev => [...prev, ...up.data.urls]);
    } catch (err) { Alert.alert('Upload failed', err.response?.data?.error || err.message); }
  };

  const submit = async () => {
    try {
      const b = { title, address, rent: Number(rent), description, photos, facilities: facilities.split(',').map(s=>s.trim()) };
      await api.post('/boardings', b);
      Alert.alert('Posted', 'Boarding posted successfully');
      navigation.goBack();
    } catch (err) { Alert.alert('Error', err.response?.data?.error || err.message); }
  };

  return (
    <ScrollView style={{flex:1,padding:12}}>
      <Text style={{fontSize:20,fontWeight:'700'}}>Post Boarding</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
      <TextInput placeholder="Rent" value={rent} onChangeText={setRent} style={styles.input} keyboardType='numeric' />
      <TextInput placeholder="Facilities (comma separated)" value={facilities} onChangeText={setFacilities} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input,{height:100}]} multiline />
      <TouchableOpacity style={styles.btn} onPress={pickImage}><Text style={{color:'#fff'}}>Pick & Upload Photo</Text></TouchableOpacity>
      <Text style={{marginTop:8}}>Uploaded: {photos.length}</Text>
      <TouchableOpacity style={[styles.btn,{marginTop:12}]} onPress={submit}><Text style={{color:'#fff'}}>Submit</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ input:{backgroundColor:'#fff',padding:12,borderRadius:8,marginTop:12}, btn:{backgroundColor:'#071133',padding:12,borderRadius:8,marginTop:12,alignItems:'center'} });
