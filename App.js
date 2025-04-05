import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnBoardingScreen';
import SignIn from './screens/SignIn';
import SignupPage from './screens/SignupPage';
import OtpPage from './screens/OtpPage';
import PreferencesPage from './screens/PreferencesPage';

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        setInitialRoute(hasSeenOnboarding === 'true' ? 'Splash' : 'Onboarding');
      } catch (error) {
        console.error('Error reading onboarding flag:', error);
        setInitialRoute('Onboarding'); // Default to onboarding in case of error
      }
    };

    checkOnboarding();
  }, []);

  if (!initialRoute) {
    return null; // Show nothing while checking AsyncStorage
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignupPage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OtpPage" component={OtpPage} />
        <Stack.Screen name="Preferences" component={PreferencesPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
