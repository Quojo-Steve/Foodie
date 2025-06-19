import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("John Doe");
  const [description, setDescription] = useState("Food enthusiast since 2022");
  const [savedRecipes, setSavedRecipes] = useState(24);
  const [friendsInvited, setFriendsInvited] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempDescription, setTempDescription] = useState(description);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setName(tempName);
    setDescription(tempDescription);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setTempName(name);
    setTempDescription(description);
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center p-6 mt-10">
          <TouchableOpacity onPress={pickImage}>
            <View className="relative">
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../assets/img2.png")
                }
                className="w-32 h-32 rounded-full border-2 border-gray-200"
              />
              <View className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2">
                <Ionicons name="camera" size={20} color="white" />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4 flex-row items-center"
            onPress={() => setIsModalVisible(true)}
          >
            <Text className="text-2xl font-bold mr-2">{name}</Text>
            <Feather name="edit-2" size={18} color="#666" />
          </TouchableOpacity>

          <Text className="text-gray-500 mt-1">{description}</Text>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-around p-4 border-t border-b border-gray-100">
          <View className="items-center">
            <Text className="text-2xl font-bold">{savedRecipes}</Text>
            <Text className="text-gray-500">Saved Recipes</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold">{friendsInvited}</Text>
            <Text className="text-gray-500">Friends Invited</Text>
          </View>
        </View>

        {/* Actions Section */}
        <View className="p-4">
          <TouchableOpacity
            className="flex-row items-center justify-between p-4 bg-gray-50 rounded-lg mb-3"
            onPress={() => console.log("View saved recipes")}
          >
            <View className="flex-row items-center">
              <MaterialIcons name="bookmark-border" size={24} color="#666" />
              <Text className="ml-3 text-lg">Saved Recipes</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between p-4 bg-gray-50 rounded-lg mb-3"
            onPress={() => console.log("Invite friends")}
          >
            <View className="flex-row items-center">
              <Ionicons name="person-add-outline" size={24} color="#666" />
              <Text className="ml-3 text-lg">Invite Friends</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Edit Profile Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => handleCancel()}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
              <Text className="text-2xl font-bold mb-4">Edit Profile</Text>

              <Text className="text-gray-600 mb-2">Full Name</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-4"
                value={tempName}
                onChangeText={setTempName}
                placeholder="Enter your full name"
              />

              <Text className="text-gray-600 mb-2">Description</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-6"
                value={tempDescription}
                onChangeText={setTempDescription}
                placeholder="Enter a short description"
                multiline
                numberOfLines={3}
              />

              <View className="flex-row justify-end">
                <TouchableOpacity
                  className="bg-gray-200 rounded-lg px-4 py-2 mr-3"
                  onPress={handleCancel}
                >
                  <Text className="text-gray-700 font-semibold">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-500 rounded-lg px-4 py-2"
                  onPress={handleSave}
                >
                  <Text className="text-white font-semibold">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;