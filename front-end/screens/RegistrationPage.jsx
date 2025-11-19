import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Header Component ---
const AppHeader = () => (
  <ImageBackground
    source={{ uri: 'https://picsum.photos/seed/header/600/400' }} // Placeholder
    style={styles.headerBackground}>
    <View style={styles.headerOverlay}>
      <Text style={styles.welcomeText}>WELCOME TO</Text>
      <Text style={styles.logo}>BOARDVISTA</Text>
      <Text style={styles.subtitle}>Discover the Best Stays in Vavuniya</Text>
    </View>
  </ImageBackground>
);

// --- Footer Component ---
const AppFooter = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2025 BoardVista</Text>
  </View>
);

// --- Main Registration Screen ---
export default function RegistrationPage() {
    const navigation = useNavigation();

    const loginpageHandler=()=>{
      navigation.replace("HomePage");
    }
  // State for password visibility
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  // State for custom dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userType, setUserType] = useState('Select user type...');
  const userTypes = ['Student', 'Academic Staff', 'Owner'];

  // Handler for selecting a user type from the custom dropdown
  const selectUserType = (type) => {
    setUserType(type);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create an Account</Text>

        {/* --- Form Fields --- */}
        <TextInput
          style={styles.textInput}
          placeholder="Full Name"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.textInput}
          placeholder="abc@gmail.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />

        {/* --- Password Input --- */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={securePassword}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setSecurePassword(!securePassword)}>
            <Text style={styles.toggleText}>
              {securePassword ? '[Show]' : '[Hide]'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- Confirm Password Input --- */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry={secureConfirm}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setSecureConfirm(!secureConfirm)}>
            <Text style={styles.toggleText}>
              {secureConfirm ? '[Show]' : '[Hide]'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- Custom User Type Dropdown --- */}
        <View style={styles.dropdownWrapper}>
          <Text style={styles.dropdownLabel}>Register as:</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownOpen(!dropdownOpen)}>
            <Text style={styles.dropdownButtonText}>{userType}</Text>
            <Text style={styles.dropdownArrow}>{dropdownOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <View style={styles.dropdownMenu}>
              {userTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    // Add a border to all items except the last one
                    index < userTypes.length - 1 && styles.itemSeparator,
                  ]}
                  onPress={() => selectUserType(type)}>
                  <Text style={styles.dropdownItemText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {/* --- End Dropdown --- */}

        <TouchableOpacity style={styles.registerButton} onPress={loginpageHandler}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLink} onPress={()=>navigation.replace("HomePage")}>
          <Text style={styles.loginLinkText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <AppFooter />
    </SafeAreaView>
  );
}

// === STYLESHEET ===
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // White background for the safe area
  },
  // Header
  headerBackground: {
    width: '100%',
    height: 200,
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(58, 90, 120, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 1,
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
  // Form Container
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0', // Light gray background from image
    padding: 25,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'left',
  },
  // Form Inputs
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  toggleButton: {
    padding: 15,
  },
  toggleText: {
    color: '#555',
    fontSize: 12,
  },
  // Custom Dropdown
  dropdownWrapper: {
    marginTop: 10,
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  dropdownButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#333',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  dropdownItem: {
    padding: 15,
  },
  itemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  // Buttons
  registerButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    // Simple shadow like the login button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 40, // Ensure space at the bottom
  },
  loginLinkText: {
    color: '#007BFF',
    fontSize: 14,
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