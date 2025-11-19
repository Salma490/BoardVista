
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';



// --- Main Screen Component ---
export default function Dashboard() {

  const navigation = useNavigation();
  const LogoutHandler = ()=>{
    navigation.replace("HomePage");
  }
  const chatHandler = ()=>{
    navigation.replace("ChatScreen");
  }
  // --- Helper Component: Header ---
  const AppHeader = () => (
    <ImageBackground
      source={{ uri: 'https://picsum.photos/seed/header/600/400' }} // Placeholder
      style={styles.headerBackground}>
      <View style={styles.headerOverlay}>
        <Text style={styles.logo}>BOARDVISTA</Text>
        <Text style={styles.subtitle}>Discover the Best Stays in Vavuniya</Text>
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={LogoutHandler}>
            <Text style={styles.navLink}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.navLink}>About Us</Text>
          <Text style={styles.navLink}>Reviews</Text>
          <Text style={styles.navLink}>Contact Us</Text>
        </View>
        {/* Owner Top Bar */}
        <View style={styles.userContainer}>
          <Text style={styles.headerIconText}>[User]</Text>
          <Text style={styles.headerText}>Hi</Text>
          <TouchableOpacity onPress={LogoutHandler}>
            <Text style={styles.headerIconText} >[Exit]</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );

  // --- Helper Component: Sub-Header ---
  const SubHeader = () => (
    <View style={styles.subHeader}>
      {/*<TouchableOpacity>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>*/}
      <TouchableOpacity onPress = {chatHandler}>
        {/* Placeholder for chat icon */}
        <Text style={styles.chatIcon}>[Chat]</Text>
      </TouchableOpacity>
    </View>
  );

  // --- Helper Component: Footer ---
  const AppFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2025 BoardVista</Text>
    </View>
  );

  // --- Helper Component: Info Line (No Icons) ---
  const InfoLine = ({ iconText, text }) => (
    <View style={styles.infoLine}>
      <Text style={styles.infoIcon}>{iconText}</Text>
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );

  // --- Helper Component: Listing Card ---
  const ListingCard = ({ title, rent, capacity, phone, imageUrl }) => (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <InfoLine  text={rent} />
        <InfoLine  text={capacity} />
        <InfoLine  text={phone} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageContainer}>
        <AppHeader />
        <SubHeader />

        {/* Scrollable list of cards */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentArea}>
            <ListingCard
              title="Happy Boarding"
              rent="Rs. 30,000.00"
              capacity="8 persons"
              phone="024-1234567"
              imageUrl="https://picsum.photos/seed/happy/200/200"
            />
            {/* Add more cards here as the owner adds them */}
            <ListingCard
              title="Student Hostel"
              rent="Rs. 25,000.00"
              capacity="12 persons"
              phone="024-9876543"
              imageUrl="https://picsum.photos/seed/student/200/200"
            />
            <ListingCard
              title="Park View Rooms"
              rent="Rs. 32,000.00"
              capacity="6 persons"
              phone="024-1112223"
              imageUrl="https://picsum.photos/seed/park/200/200"
            />
            {/* Spacer at the bottom so content can scroll above the FAB/Footer */}
            <View style={{ height: 120 }} />
          </View>
        </ScrollView>

        <AppFooter />
      </View>

    </SafeAreaView>
  );
}

// === STYLESHEET ===
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#f4f4f8', // Light gray background from image
  },
  // Header
  headerBackground: {
    width: '100%',
    height: 180,
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(58, 90, 120, 0.8)',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  navLinks: {
    flexDirection: 'row',
    marginTop: 20,
  },
  navLink: {
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  userContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  headerText: {
    color: '#fff',
    marginHorizontal: 8,
    fontSize: 14,
  },
  headerIconText: {
    color: '#fff',
    fontSize: 16,
  },
  // Sub-Header
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
  },
  chatIcon: {
    fontSize: 16,
    color: '#333',
  },
  // Content Area
  scrollView: {
    flex: 1,
  },
  contentArea: {
    padding: 20,
  },
  // Listing Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoIcon: {
    fontSize: 14,
    color: '#555',
    marginRight: 10,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  
  // Footer
  footer: {
    backgroundColor: '#90b4ce',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});