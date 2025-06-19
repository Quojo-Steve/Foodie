import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Assuming Ionicons for the back icon

const Terms = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Terms and Conditions</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.sectionText}>
            By accessing or using this application, you agree to be bound by these Terms and Conditions. 
            If you do not agree with any part of these terms, you may not use the application.
          </Text>

          <Text style={styles.sectionTitle}>2. Use of the Application</Text>
          <Text style={styles.sectionText}>
            You agree to use the application only for lawful purposes and in a way that does not infringe 
            the rights of, restrict, or inhibit anyone else's use and enjoyment of the application.
          </Text>

          <Text style={styles.sectionTitle}>3. Intellectual Property</Text>
          <Text style={styles.sectionText}>
            All content included in the application, such as text, graphics, logos, and software, is the 
            property of the application owner or its content suppliers and is protected by copyright laws.
          </Text>

          <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
          <Text style={styles.sectionText}>
            The application is provided "as is" without any warranties, express or implied. We do not 
            guarantee that the application will be available uninterrupted or error-free.
          </Text>

          <Text style={styles.sectionTitle}>5. Changes to Terms</Text>
          <Text style={styles.sectionText}>
            We reserve the right to modify these Terms and Conditions at any time. Changes will be effective 
            immediately upon posting. Your continued use of the application constitutes acceptance of the 
            revised terms.
          </Text>

          <Text style={styles.sectionTitle}>6. Contact Us</Text>
          <Text style={styles.sectionText}>
            If you have any questions about these Terms and Conditions, please contact us at 
            support@example.com.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 15,
  },
});