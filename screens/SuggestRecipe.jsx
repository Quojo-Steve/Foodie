import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SuggestRecipe = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Suggest Recipe</Text>
        <View style={styles.aiBadge}>
          <Text style={styles.aiText}>Ai</Text>
        </View>
      </View>

      {/* Prompt */}
      <Text style={styles.prompt}>What would you like to cook?</Text>

      {/* Input with Mic */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter recipe idea or ingredients"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Take Picture Button (Disabled looking) */}
      <TouchableOpacity style={styles.pictureButton} disabled>
        <Ionicons name="camera-outline" size={16} color="#aaa" />
        <Text style={styles.pictureText}>Take picture of your ingredients</Text>
      </TouchableOpacity>

      {/* Generate Button */}
      <TouchableOpacity style={styles.generateButton}>
        <Text style={styles.generateText}>Generate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuggestRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    marginLeft: 20,
    fontSize: 22,
    fontWeight: "600",
  },
  aiBadge: {
    backgroundColor: "#eee",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  aiText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
  },
  prompt: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginRight: 8,
    color: "#000",
  },
  pictureButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  pictureText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#888",
  },
  generateButton: {
    backgroundColor: "#00bf63",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  generateText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
