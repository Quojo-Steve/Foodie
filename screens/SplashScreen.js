import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
  // Load custom font
  // const [fontsLoaded] = useFonts({
  //   'YourFont-Regular': require('../assets/fonts/Lato-Regular.ttf'),
  // });

  useEffect(() => {
    // console.log("Checking fonts...");
    const navigateAfterSplash = async () => {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        setTimeout(() => {
          if (hasSeenOnboarding === 'true') {
            navigation.replace('Signin');
          } else {
            navigation.replace('Onboarding');
          }
        }, 3000);
      
    };
  
    navigateAfterSplash();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animatable.View animation="zoomIn" duration={1500} style={styles.logoContainer}>
        <Image source={require('../assets/foodie_white1.png')} className="w-80 h-80" />
      </Animatable.View>

      {/* Animated Tagline */}
      <Animatable.Text animation="fadeInUp" duration={1500} delay={1000} style={styles.tagline}>
        Your Food Companion
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bf63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 5,
  },
});

export default SplashScreen;
