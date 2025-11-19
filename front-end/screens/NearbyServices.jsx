{/*


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { GOOGLE_MAPS_API_KEY } from '../utils/constants';

export default function NearbyServices() {
  const [places, setPlaces] = useState([]);
  useEffect(()=> {
    (async ()=> {
      // Replace with real location. In production get user's location.
      const lat = 7.5, lng = 80.5;
      const type = 'pharmacy'; // change by tab
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=${type}&key=${GOOGLE_MAPS_API_KEY}`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        setPlaces(json.results || []);
      } catch (err) { console.error(err); }
    })();
  }, []);
  return (
    <View style={{flex:1,padding:12}}>
      <FlatList data={places} keyExtractor={p=>p.place_id} renderItem={({item}) => (
        <View style={{padding:12,borderBottomWidth:1,borderColor:'#eee'}}>
          <Text style={{fontWeight:'700'}}>{item.name}</Text>
          <Text>{item.vicinity}</Text>
        </View>
      )} />
    </View>
  );
}




*/}
