import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  ScrollView, 
  Alert 
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const AccountSecurity = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const handlePasswordChange = () => {
    if (!currentPassword) {
      Alert.alert("Error", "Please enter your current password");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    Alert.alert("Success", "Password changed successfully");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleUsernameChange = () => {
    if (!newUsername) {
      Alert.alert("Error", "Please enter a new username");
      return;
    }
    if (newUsername.length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters");
      return;
    }
    Alert.alert("Success", "Username updated successfully");
    setNewUsername('');
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Security</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Change Password Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Password</Text>
        
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter current password"
          placeholderTextColor="#999"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          autoCapitalize="none"
        />
        
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          placeholderTextColor="#999"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          autoCapitalize="none"
        />
        
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
        />
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handlePasswordChange}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      {/* Change Username Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Username</Text>
        
        <Text style={styles.label}>New Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new username"
          placeholderTextColor="#999"
          value={newUsername}
          onChangeText={setNewUsername}
          autoCapitalize="none"
        />
        
        <TouchableOpacity 
          style={[styles.saveButton, styles.secondaryButton]}
          onPress={handleUsernameChange}
          activeOpacity={0.8}
        >
          <Text style={[styles.saveButtonText, styles.secondaryButtonText]}>Update Username</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 5,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#00bf63',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#333',
  },
});

export default AccountSecurity;