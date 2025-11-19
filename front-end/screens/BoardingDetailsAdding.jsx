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
  View
} from 'react-native';

// --- Helper Component: Reusable Form Input Row ---
const FormInput = ({ label, ...props }) => (
  <View style={styles.inputRow}>
    <Text style={styles.rowLabel}>{label}</Text>
    <TextInput style={styles.rowInput} placeholderTextColor="#999" {...props} />
  </View>
);

// --- Helper Component: Reusable Multiline Form Input ---
const FormInputMulti = ({ label, ...props }) => (
  <View style={styles.inputRowMulti}>
    <Text style={styles.rowLabelMulti}>{label}</Text>
    <TextInput
      style={styles.multilineInput}
      placeholderTextColor="#999"
      multiline
      {...props}
    />
  </View>
);

// --- Helper Component: Custom Checkbox (No icon library needed) ---
const CustomCheckbox = ({ label, value, onValueChange }) => (
  <TouchableOpacity
    style={styles.checkboxContainer}
    onPress={() => onValueChange(!value)}>
    <View style={[styles.checkbox, value && styles.checkboxChecked]}>
      {/* This is a simple text 'check' mark */}
      {value && <Text style={styles.checkboxCheck}>✓</Text>}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

// --- Main Screen Component ---
export default function AddListingScreen() {

    const navigation = useNavigation();
    const LogoutHandler = ()=>{
    navigation.replace("HomePage");
  }
    const UserDashboardHandler = ()=>{
         navigation.replace("Dashboard");
     }
    const skipHandler=()=>{
        navigation.replace("Dashboard");
    }
  // State to manage which step we are on
  const [step, setStep] = useState(1);

  // State for form fields
  const [accommodationType, setAccommodationType] = useState('Male');
  const [agreed, setAgreed] = useState(false);

  // State for facilities checkboxes
  const [facilities, setFacilities] = useState({
    beds: false,
    tables: false,
    chairs: false,
    fans: false,
    kitchen: false,
    attachedBathroom: false,
    freeElectricity: false,
    freeWater: false,
    studyArea: false,
  });

  // Handler to toggle facilities
  const toggleFacility = (key) => {
    setFacilities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // --- Header Component ---
  const renderHeader = () => (
    <ImageBackground
      source={{ uri: 'https://picsum.photos/seed/header/600/400' }} // Placeholder
      style={styles.headerBackground}>
      <View style={styles.headerOverlay}>
        <Text style={styles.logo}>BOARDVISTA</Text>
        <Text style={styles.subtitle}>Discover the Best Stays in Vavuniya</Text>
        <View style={styles.navLinks}>
          <Text style={styles.navLink}>Home</Text>
          <Text style={styles.navLink}>About Us</Text>
          <Text style={styles.navLink}>Reviews</Text>
          <Text style={styles.navLink}>Contact Us</Text>
        </View>
        {/* Owner top bar */}
        <View style={styles.userContainer}>
          <Text style={styles.headerIconText}>[User]</Text>
          <Text style={styles.headerText}>Hi, Owner!</Text>
          <TouchableOpacity onPress={LogoutHandler}>
            <Text style={styles.headerIconText}>[Exit]</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );

  // --- Sub-Header (Back arrow and Chat) ---
  const renderSubHeader = () => (
    <View style={styles.subHeader}>
      <TouchableOpacity
        onPress={() => {
          if (step === 2) setStep(1); // Go back to step 1
          // else: add navigation.goBack() here for step 1
        }}>
        <Text style={styles.backArrow}>←back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={skipHandler}>
        {/* Placeholder for chat icon */}
        <Text style={styles.skipIcon}>Skip</Text>
      </TouchableOpacity>
    </View>
  );

  // --- Renders the Form for Step 1 ---
  const renderStep1 = () => (
    <>
      {/* Accommodation Type Toggles */}
      <View style={styles.inputRow}>
        <Text style={styles.rowLabel}>Accommodation Type</Text>
        <View style={styles.toggleContainer}>
          {['Male', 'Female', 'Academic Staff'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.toggleButton,
                accommodationType === type && styles.toggleActive,
              ]}
              onPress={() => setAccommodationType(type)}>
              <Text
                style={[
                  styles.toggleText,
                  accommodationType === type && styles.toggleTextActive,
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Basic Info Inputs */}
      <FormInput label="Name" placeholder="Enter boarding name" />
      <FormInput label="Address" placeholder="Enter full address" />
      <FormInput
        label="E-mail address"
        placeholder="example@gmail.com"
        keyboardType="email-address"
      />
      <FormInput
        label="Contact Number"
        placeholder="077-XXXXXXX"
        keyboardType="phone-pad"
      />

      {/* Facilities Checkboxes */}
      <View style={styles.inputRowMulti}>
        <Text style={styles.rowLabelMulti}>Facilities</Text>
        <View style={styles.facilitiesGrid}>
          {/* Column 1 */}
          <View style={styles.facilitiesColumn}>
            <CustomCheckbox
              label="Beds"
              value={facilities.beds}
              onValueChange={() => toggleFacility('beds')}
            />
            <CustomCheckbox
              label="Tables"
              value={facilities.tables}
              onValueChange={() => toggleFacility('tables')}
            />
            <CustomCheckbox
              label="Chairs"
              value={facilities.chairs}
              onValueChange={() => toggleFacility('chairs')}
            />
            <CustomCheckbox
              label="Fans"
              value={facilities.fans}
              onValueChange={() => toggleFacility('fans')}
            />
          </View>
          {/* Column 2 */}
          <View style={styles.facilitiesColumn}>
            <CustomCheckbox
              label="Kitchen"
              value={facilities.kitchen}
              onValueChange={() => toggleFacility('kitchen')}
            />
            <CustomCheckbox
              label="Attached Bathroom"
              value={facilities.attachedBathroom}
              onValueChange={() => toggleFacility('attachedBathroom')}
            />
            <CustomCheckbox
              label="Free Electricity"
              value={facilities.freeElectricity}
              onValueChange={() => toggleFacility('freeElectricity')}
            />
            <CustomCheckbox
              label="Free water"
              value={facilities.freeWater}
              onValueChange={() => toggleFacility('freeWater')}
            />
          </View>
          {/* Column 3 */}
          <View style={styles.facilitiesColumn}>
            <CustomCheckbox
              label="Study Area"
              value={facilities.studyArea}
              onValueChange={() => toggleFacility('studyArea')}
            />
          </View>
        </View>
      </View>

      <FormInput
        label="Capacity"
        placeholder="e.g., 8"
        keyboardType="number-pad"
      />
      <FormInput
        label="Monthly Rent"
        placeholder="Rs. XXXXX"
        keyboardType="number-pad"
      />

      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity onPress={() => setStep(2)}>
          <Text style={styles.nextButtonText}>Next </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  // --- Renders the Form for Step 2 ---
  const renderStep2 = () => (
    <>
      <FormInputMulti
        label="Description"
        placeholder="Add a description about the boarding..."
      />
      <FormInputMulti
        label="Nearby Services"
        placeholder="e.g., Bus stop, Supermarket, Bank..."
      />

      {/* Image Uploader */}
      <View style={styles.inputRowMulti}>
        <Text style={styles.rowLabelMulti}>Add images</Text>
        <View style={styles.imagePickerBox}>
          <TouchableOpacity style={styles.imagePickerButton}>
            <Text style={styles.imagePickerPlus}>+</Text>
          </TouchableOpacity>
          <Text style={styles.imagePickerLabel}>0 of 5 images</Text>
        </View>
      </View>

      {/* Policy Agreement */}
      <CustomCheckbox
        label="Owner agreed to BoardVista policies"
        value={agreed}
        onValueChange={setAgreed}
      />

      {/* Form Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={UserDashboardHandler}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => setStep(1)} // Go back to step 1
        >
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  // --- Final Render ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {renderHeader()}
        {renderSubHeader()}

        {/* Form Content: Renders Step 1 or Step 2 */}
        <View style={styles.formContainer}>
          {step === 1 ? renderStep1() : renderStep2()}
        </View>
      </ScrollView>

      {/* --- BOTTOM FOOTER --- */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 BoardVista</Text>
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
  container: {
    flex: 1,
  },
  // Header
  headerBackground: {
    width: '100%',
    height: 180, // Shorter header for internal pages
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
  skipIcon: {
    fontSize: 20,
    color: '#111111ff',
  },
  // Form Container
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f8', // Light gray background
  },
  // Input Rows
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  inputRowMulti: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  rowLabelMulti: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 10,
  },
  rowInput: {
    flex: 2,
    fontSize: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  multilineInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 100,
    textAlignVertical: 'top',
  },
  // Accommodation Toggles
  toggleContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  toggleActive: {
    backgroundColor: '#007BFF',
  },
  toggleText: {
    fontSize: 12,
    color: '#333',
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Facilities Grid
  facilitiesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  facilitiesColumn: {
    flex: 1,
  },
  // Custom Checkbox
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff',
    borderRadius: 3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  checkboxCheck: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  // Image Picker
  imagePickerBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  imagePickerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imagePickerPlus: {
    fontSize: 30,
    color: '#999',
    lineHeight: 30, // Center the '+'
  },
  imagePickerLabel: {
    marginTop: 10,
    fontSize: 12,
    color: '#999',
  },
  // Buttons
  nextButtonContainer: {
    paddingVertical: 20,
    alignItems: 'flex-end',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#70a1c1', // Blue-gray from image
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#a9c8e0', // Lighter blue-gray from image
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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