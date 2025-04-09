// screens/NotificationsScreen.js
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-xl font-bold">Notifications</Text>
        <Text className="mt-2">This is a placeholder for the Notifications screen.</Text>
      </View>
    </SafeAreaView>
  );
}

export default NotificationsScreen;