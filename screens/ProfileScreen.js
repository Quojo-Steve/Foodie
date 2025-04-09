// screens/ProfileScreen.js
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-xl font-bold">Profile Screen</Text>
        <Text className="mt-2">This is a placeholder for the Profile screen.</Text>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;