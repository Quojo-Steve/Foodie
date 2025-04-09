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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for the main app
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Hide labels for a cleaner look
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb', // Gray border as in the design
          backgroundColor: '#fff',
          paddingVertical: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
            return (
              <Icon
                name={iconName}
                {...EvaIcons[focused ? 'Home' : 'HomeOutline']}
                width={24}
                height={24}
                fill={focused ? '#000' : '#666'}
              />
            );
          } else if (route.name === 'Action') {
            return (
              <Icon
                name="flash"
                {...EvaIcons.Flash}
                width={24}
                height={24}
                fill="#fff"
                style={{
                  backgroundColor: '#22c55e', // Green background as in the design
                  borderRadius: 50,
                  padding: 10,
                  marginBottom: 20, // Raise the button slightly
                }}
              />
            );
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
            return (
              <Icon
                name={iconName}
                {...EvaIcons[focused ? 'Person' : 'PersonOutline']}
                width={24}
                height={24}
                fill={focused ? '#000' : '#666'}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen
        name="Action"
        component={HomeScreen} // Placeholder; replace with actual screen
        options={{ tabBarButton: (props) => <TouchableOpacity {...props} /> }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

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
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;