import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@ui-kitten/components';
import * as EvaIcons from '@ui-kitten/eva-icons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnBoardingScreen';
import SignIn from './screens/SignIn';
import SignupPage from './screens/SignupPage';
import OtpPage from './screens/OtpPage';
import PreferencesPage from './screens/PreferencesPage';
import ProfileScreen from './screens/ProfileScreen'; // You'll need to create this
import NotificationsScreen from './screens/NotificationsScreen';
import MainTabNavigator from './screens/MainTabNavigator';
import SearchScreen from './screens/SearchScreen';
import RecipeDetail from './screens/RecipeDetail';
import SuggestRecipe from './screens/SuggestRecipe';
import AccountSecurity from './screens/AccountSecurity';
import Terms from './screens/Terms';

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
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignupPage} />
        <Stack.Screen name="OtpPage" component={OtpPage} />
        <Stack.Screen name="Preferences" component={PreferencesPage} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        <Stack.Screen name="SuggestRecipe" component={SuggestRecipe} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="AccountSecurity" component={AccountSecurity} />
        <Stack.Screen name="Terms" component={Terms} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;