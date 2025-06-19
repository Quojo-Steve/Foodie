import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const SuggestRecipe = ({ navigation }) => {
  const [recipePrompt, setRecipePrompt] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    // Request permissions
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleGenerate = () => {
    if (!recipePrompt.trim() && !selectedImage) {
      Alert.alert("Please enter a recipe idea or upload an image");
      return;
    }
    // Here you would typically call your API
    Alert.alert("Generating recipe...", `Prompt: ${recipePrompt}\nImage: ${selectedImage ? "Attached" : "None"}`);
  };

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
          <Text style={styles.aiText}>AI</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Prompt */}
        <Text style={styles.prompt}>What would you like to cook?</Text>

        {/* Input with Mic */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter recipe idea or ingredients"
            placeholderTextColor="#aaa"
            value={recipePrompt}
            onChangeText={setRecipePrompt}
            multiline
          />
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic-outline" size={20} color="#00bf63" />
          </TouchableOpacity>
        </View>

        {/* Image Preview */}
        {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => setSelectedImage(null)}
            >
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {/* Image Buttons */}
        <View style={styles.imageButtonsContainer}>
          <TouchableOpacity
            style={[styles.imageButton, styles.uploadButton]}
            onPress={pickImage}
          >
            <Ionicons name="image-outline" size={18} color="#00bf63" />
            <Text style={styles.imageButtonText}>Upload Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.imageButton, styles.cameraButton]}
            onPress={takePicture}
          >
            <Ionicons name="camera-outline" size={18} color="#fff" />
            <Text style={[styles.imageButtonText, { color: "#fff" }]}>
              Take Picture
            </Text>
          </TouchableOpacity>
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          style={[
            styles.generateButton,
            (!recipePrompt.trim() && !selectedImage) && styles.generateButtonDisabled
          ]}
          onPress={handleGenerate}
          disabled={!recipePrompt.trim() && !selectedImage}
        >
          <Text style={styles.generateText}>Generate Recipe</Text>
          <Ionicons name="sparkles" size={18} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  aiBadge: {
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 10,
  },
  aiText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#00bf63",
  },
  content: {
    padding: 20,
  },
  prompt: {
    fontSize: 16,
    marginBottom: 15,
    color: "#555",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    maxHeight: 100,
  },
  micButton: {
    padding: 5,
  },
  imageButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: "48%",
    justifyContent: "center",
  },
  uploadButton: {
    backgroundColor: "#f0fff4",
    borderWidth: 1,
    borderColor: "#00bf63",
  },
  cameraButton: {
    backgroundColor: "#00bf63",
  },
  imageButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  imagePreviewContainer: {
    position: "relative",
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: 200,
  },
  removeImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  generateButton: {
    backgroundColor: "#00bf63",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#00bf63",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  generateButtonDisabled: {
    backgroundColor: "#ccc",
    shadowColor: "#999",
  },
  generateText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default SuggestRecipe;