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
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const SignIn = ({ navigation }) => {
  const Url = "http://10.9.12.27:5000/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${Url}auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Login failed");
      }

      alert("Login successful");
      navigation.replace("Main");
    } catch (error) {
      alert(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.replace("SignUp");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Logo with animation */}
      <Image
        source={require("../assets/foodie_green1.png")}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

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
      </KeyboardAvoidingView>

      {/* Sign In Button with Loading State */}
      <TouchableOpacity
        style={[styles.signInButton, isLoading && styles.signInButtonDisabled]}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.signInButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={styles.signUpText}>
        Don't have an account?{" "}
        <Text style={styles.signUpLink} onPress={handleSignUp}>
          Sign up
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
  signInButton: {
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
  signInButtonDisabled: {
    backgroundColor: "#6ee7b7",
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signUpText: {
    fontSize: 16,
    color: "#6b7280",
  },
  signUpLink: {
    color: "#00bf63",
    fontWeight: "600",
  },
});

export default SignIn;