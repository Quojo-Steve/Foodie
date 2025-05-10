import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const scale = useSharedValue(1);

  const handleCentralButtonPress = () => {
    console.log('Central button pressed!');
    // Example: navigation.navigate('QuickRecipeGenerator');
    scale.value = withSpring(1.2, { damping: 10, stiffness: 100 });
    setTimeout(() => {
      scale.value = withSpring(1);
    }, 200);
  };

  const animatedCentralButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#00bf63',
          tabBarInactiveTintColor: '#ccc',
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      {/* Central Floating Button with Animation */}
      <Animated.View style={[styles.centralButton, animatedCentralButtonStyle]}>
        <TouchableOpacity onPress={handleCentralButtonPress}>
          <Ionicons name="flash-outline" size={28} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  tabBar: {
    position: 'absolute',
    height: 70,
    left: 20,
    right: 20,
    bottom: 15,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  centralButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#00bf63',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    zIndex: 10,
  },
  fabLabel: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
});

export default MainTabNavigator;