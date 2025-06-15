import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const PreferencesPage = ({ navigation }) => {
  const [dietType, setDietType] = useState("Vegetarian");
  const [allergies, setAllergies] = useState("Peanuts");
  const [cuisine, setCuisine] = useState("Italian");
  const [cookingMethod, setCookingMethod] = useState("Grilled");
  const [exclusions, setExclusions] = useState("Sugar");

  const handleSave = () => {
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <AntDesign name="user" size={24} color="#6b7280" />
          </View>
          <Text style={styles.headerTitle}>Dietary Preferences</Text>
          <View style={styles.iconWrapper}>
            <Ionicons name="notifications-outline" size={24} color="#6b7280" />
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          It's essential to provide you with detailed and flexible options to
          accommodate your diverse dietary needs.{" "}
          <Text style={styles.skipText} onPress={handleSave}>
            Skip for now
          </Text>
        </Text>

        {/* Dropdowns */}
        <PreferenceDropdown
          label="Diet Type"
          value={dietType}
          setValue={setDietType}
          data={["Vegetarian", "Vegan", "Keto", "Paleo", "None"]}
        />

        <PreferenceDropdown
          label="Allergies"
          value={allergies}
          setValue={setAllergies}
          data={["Peanuts", "Dairy", "Gluten", "Shellfish", "None"]}
        />

        <PreferenceDropdown
          label="Cuisine"
          value={cuisine}
          setValue={setCuisine}
          data={["Italian", "Mexican", "Indian", "Chinese", "None"]}
        />

        <PreferenceDropdown
          label="Cooking Method"
          value={cookingMethod}
          setValue={setCookingMethod}
          data={["Grilled", "Baked", "Fried", "Steamed", "None"]}
        />

        <PreferenceDropdown
          label="Exclusions"
          value={exclusions}
          setValue={setExclusions}
          data={["Sugar", "Salt", "Carbs", "Fat", "None"]}
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const PreferenceDropdown = ({ label, value, setValue, data }) => {
  const dropdownData = data.map((item) => ({ label: item, value: item }));

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownMenu}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={dropdownData}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => setValue(item.value)}
        placeholder="Select"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  iconWrapper: {
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 24,
    lineHeight: 20,
  },
  skipText: {
    color: "#00bf63",
    fontWeight: "600",
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdownLabel: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f9fafb",
  },
  dropdownMenu: {
    borderRadius: 8,
  },
  placeholderStyle: {
    color: "#9ca3af",
    fontSize: 14,
  },
  selectedTextStyle: {
    color: "#111827",
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#00bf63",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default PreferencesPage;
