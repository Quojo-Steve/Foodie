import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign"; // Using MaterialIcons for simplicity
import Icon1 from "react-native-vector-icons/Ionicons"; // Using MaterialIcons for simplicity

const PreferencesPage = () => {
  // State for dropdown selections
  const [dietType, setDietType] = useState("Vegetarian");
  const [allergies, setAllergies] = useState("Peanuts");
  const [cuisine, setCuisine] = useState("Italian");
  const [cookingMethod, setCookingMethod] = useState("Grilled");
  const [exclusions, setExclusions] = useState("Sugar");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.placeholderIcon}>
            <Icon name="user" size={28} color="#9ca3af" style={styles.icon} />
          </View>
          <Text style={styles.headerTitle}>Dietary Preferences</Text>
          <View style={styles.placeholderIcon}>
            <Icon1
              name="notifications-outline"
              size={28}
              color="#9ca3af"
              style={styles.icon}
            />
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            It's essential to provide you with detailed and flexible options to
            accommodate your diverse dietary needs.{" "}
            <Text style={styles.skipText}>Skip for now</Text>
          </Text>
        </View>

        {/* Diet Type Dropdown */}
        <PreferenceDropdown
          label="Diet Type"
          selectedValue={dietType}
          onValueChange={setDietType}
          items={[
            { label: "Vegetarian", value: "Vegetarian" },
            { label: "Vegan", value: "Vegan" },
            { label: "Keto", value: "Keto" },
            { label: "Paleo", value: "Paleo" },
            { label: "None", value: "None" },
          ]}
        />

        {/* Allergies Dropdown */}
        <PreferenceDropdown
          label="Allergies"
          selectedValue={allergies}
          onValueChange={setAllergies}
          items={[
            { label: "Peanuts", value: "Peanuts" },
            { label: "Dairy", value: "Dairy" },
            { label: "Gluten", value: "Gluten" },
            { label: "Shellfish", value: "Shellfish" },
            { label: "None", value: "None" },
          ]}
        />

        {/* Cuisine Dropdown */}
        <PreferenceDropdown
          label="Cuisine"
          selectedValue={cuisine}
          onValueChange={setCuisine}
          items={[
            { label: "Italian", value: "Italian" },
            { label: "Mexican", value: "Mexican" },
            { label: "Indian", value: "Indian" },
            { label: "Chinese", value: "Chinese" },
            { label: "None", value: "None" },
          ]}
        />

        {/* Cooking Methods Dropdown */}
        <PreferenceDropdown
          label="Cooking Methods"
          selectedValue={cookingMethod}
          onValueChange={setCookingMethod}
          items={[
            { label: "Grilled", value: "Grilled" },
            { label: "Baked", value: "Baked" },
            { label: "Fried", value: "Fried" },
            { label: "Steamed", value: "Steamed" },
            { label: "None", value: "None" },
          ]}
        />

        {/* Exclusions Dropdown */}
        <PreferenceDropdown
          label="Exclusions"
          selectedValue={exclusions}
          onValueChange={setExclusions}
          items={[
            { label: "Sugar", value: "Sugar" },
            { label: "Salt", value: "Salt" },
            { label: "Carbs", value: "Carbs" },
            { label: "Fat", value: "Fat" },
            { label: "None", value: "None" },
          ]}
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable dropdown component
const PreferenceDropdown = ({ label, selectedValue, onValueChange, items }) => {
  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  placeholderIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 14,
    color: "#4b5563",
  },
  skipText: {
    color: "#00bf63",
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdownLabel: {
    color: "#374151",
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  saveButton: {
    backgroundColor: "#00bf63",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default PreferencesPage;
