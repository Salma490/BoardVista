import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Get screen width for responsive image sizing
const { width } = Dimensions.get('window');
// Calculate width for 3 images with 10px spacing
const imageWidth = (width - 40 - 20) / 3; // (Screen width - 2*padding - 2*spacing) / 3

export default function HomePage()  {
  const navigation = useNavigation();
  
  const UserLoginHandler = ()=>{
      navigation.replace("UserLoginPage");
  }
  const OwnerloginHandler = ()=>{
    navigation.replace("OwnerLoginPage");
  }
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.header}>
          <Text style={styles.headerLogo}>BOARDVISTA</Text>
          <Text style={styles.headerTagline}>Discover the Best Stays in Vavuniya</Text>
        </View>

        
        <View style={styles.mainContent}>
          <Text style={styles.mainLogo}>WELCOME TO BOARDVISTA</Text>
          <Text style={styles.mainTagline}>Find your space - Live your dream{"\n\n"}</Text>

          
          <View style={styles.galleryContainer}>
            <View style={styles.imageRow}>
               
              
              <View style={[styles.imagePlaceholder, { backgroundColor: '#a9a9a9' }]} >
              <Image source={require("../assets/images/boardingimg1.jpg")} style={[styles.imagePlaceholder, { backgroundColor: '#a9a9a9' }]} />
              </View>
              <View style={[styles.imagePlaceholder, { backgroundColor: '#c0c0c0' }]} >
              <Image source={require("../assets/images/boardingimg2.jpeg")} style={[styles.imagePlaceholder, { backgroundColor: '#a9a9a9' }]} />
              </View>
              <View style={[styles.imagePlaceholder, { backgroundColor: '#d3d3d3' }]} >
              <Image source={require("../assets/images/boardingimg3.jpeg")} style={[styles.imagePlaceholder, { backgroundColor: '#a9a9a9' }]} />
              </View>
            </View>

          
            
              <Text style={styles.overlayText}>
                {"\n\n"}From budget-friendly rooms to premium spaces BoardVista makes boarding simple, smart, and stress-free.
              </Text>
            
          </View>

          
          <Text style={styles.loginPrompt}>Click here! For login</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={UserLoginHandler}>
              <Text style={styles.buttonText}>For Students /{"\n"}Academic Staff</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={OwnerloginHandler}>
              <Text style={styles.buttonText}>For House{"\n"}Owners</Text>
            </TouchableOpacity>
            
          </View>
            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.replace("RegistrationPage")}>
              <Text style={styles.linkButtonText}>
               Don't have an account? Register
              </Text>
            </TouchableOpacity>
        </View>

      
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 BoardVista</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// === Styles ===
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Matches main content background
  },
  scrollContainer: {
    flexGrow: 1,
  },
  // --- Header ---
  header: {
    backgroundColor: '#0a2d4d', // Dark blue
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerLogo: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  headerTagline: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 4,
  },
  // --- Main Content ---
  mainContent: {
    backgroundColor: '#f0f0f0', // Light gray
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    color: '#888888',
    fontSize: 16,
    letterSpacing: 1,
  },
  mainLogo: {
    color: '#333333',
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: -5, // Slight overlap like in the image
  },
  mainTagline: {
    color: '#333333',
    fontSize: 18,
    marginBottom: 25,
  },
  // --- Gallery & Overlay ---
  galleryContainer: {
    width: '100%',
    position: 'relative', // Needed for the overlay
    marginBottom: 25,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagePlaceholder: {
    width: imageWidth,
    height: 130,
    borderRadius: 8,
  },
  /* // Style for your <Image> component
  image: {
    width: imageWidth,
    height: 130,
    borderRadius: 8,
  },
  */
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // Add a very subtle background if needed
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  overlayText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  // --- Login ---
  loginPrompt: {
    fontSize: 20,
    color: '#1d1869ff',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#295E8A', // A blue from the image
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30, // Makes it pill-shaped
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // --- Footer ---
  footer: {
    backgroundColor: '#add8e6', // Light blue
    padding: 20,
    alignItems: 'center',
    marginTop: 'auto', // Pushes footer to bottom if content is short
  },
  footerText: {
    color: '#000000', // Black text looks closer to image
    fontSize: 14,
  },
  linkButtonText: {
    color: '#007BFF',
    fontSize: 14,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
});

