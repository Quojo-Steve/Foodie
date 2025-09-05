import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const SignupPage = ({ navigation }) => {
  const Url = "http://10.9.12.27:5000/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    navigation.replace("Signin");
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !phoneNumber) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${Url}auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          phone: phoneNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Signup failed");
      }

      navigation.navigate("OtpPage", { email });
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Logo */}
      <Image
        source={require("../assets/foodie_green1.png")}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us to get started</Text>

      <KeyboardAvoidingView behavior="padding" style={styles.inputWrapper}>
        {/* Email Field */}
        <View style={styles.inputContainer}>
          <Icon name="email" size={24} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Phone Number Field */}
        <View style={styles.inputContainer}>
          <Icon name="phone" size={24} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#9ca3af"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))}
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={15}
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#6b7280"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#9ca3af"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#6b7280"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Sign Up Button with Loading State */}
      <TouchableOpacity
        style={[styles.signUpButton, isLoading && styles.signUpButtonDisabled]}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Sign In Link */}
      <Text style={styles.signInText}>
        Already have an account?{" "}
        <Text style={styles.signInLink} onPress={handleSignIn}>
          Sign in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logo: {
    width: 224,
    height: 128,
    marginBottom: 20,
    transform: [{ scale: 1 }],
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 30,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 16,
    color: "#1f2937",
  },
  icon: {
    marginHorizontal: 8,
  },
  signUpButton: {
    backgroundColor: "#00bf63",
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonDisabled: {
    backgroundColor: "#6ee7b7",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signInText: {
    fontSize: 16,
    color: "#6b7280",
  },
  signInLink: {
    color: "#00bf63",
    fontWeight: "600",
  },
});

export default SignupPage;