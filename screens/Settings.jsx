import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const Settings = ({ navigation }) => {
  const settingsItems = [
    {
      icon: <Ionicons name="person-outline" size={24} color="#555" />,
      name: "Profile",
      screen: "ProfileScreen"
    },
    {
      icon: <MaterialIcons name="security" size={24} color="#555" />,
      name: "Account & Security",
      screen: "AccountSecurity"
    },
    {
      icon: <Ionicons name="notifications-outline" size={24} color="#555" />,
      name: "App Notifications",
      screen: "Notifications"
    },
    {
      icon: <FontAwesome name="language" size={24} color="#555" />,
      name: "Language & Region",
      screen: "Language"
    },
    {
      icon: <MaterialCommunityIcons name="shield-account" size={24} color="#555" />,
      name: "Privacy Policy",
      screen: "Privacy"
    },
    {
      icon: <Feather name="file-text" size={24} color="#555" />,
      name: "Terms and Conditions",
      screen: "Terms"
    },
    {
      icon: <Ionicons name="help-circle-outline" size={24} color="#555" />,
      name: "Help & Support",
      screen: "Support"
    },
    {
      icon: <Ionicons name="log-out-outline" size={24} color="#ff4444" />,
      name: "Log Out",
      screen: "Logout",
      isLogout: true
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      {settingsItems.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.settingItem}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.iconContainer}>
            {item.icon}
          </View>
          <Text style={[styles.itemText, item.isLogout && styles.logoutText]}>{item.name}</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutText: {
    color: '#ff4444',
  },
})