import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BoardingCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.photos?.[0] || 'https://via.placeholder.com/150' }} style={styles.img} />
      <View style={{flex:1, paddingLeft:12}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.address}</Text>
        <Text style={styles.price}>Rs. {item.rent} / mo</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card:{flexDirection:'row',padding:12,backgroundColor:'#fff',borderRadius:8,marginBottom:12,elevation:2},
  img:{width:100,height:80,borderRadius:8},
  title:{fontWeight:'700',fontSize:16},
  desc:{color:'#666',marginTop:4},
  price:{marginTop:8,fontWeight:'700'}
});
