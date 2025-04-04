import React from 'react';
import { View, Text, Button } from 'react-native';

function DetailsScreen({ route }) {
    const { itemId } = route.params;
    return (
      <View>
        <Text>Details Screen</Text>
        <Text>Item ID: {itemId}</Text>
      </View>
    );
  }

export default DetailsScreen;
