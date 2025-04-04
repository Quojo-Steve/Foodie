import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View className="bg-red-500 h-screen w-screen">
      <SafeAreaView />
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { itemId: 86 })}
        />
    </View>
  );
}

export default HomeScreen;
