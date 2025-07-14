import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { supabase } from "../lib/supabase"; // Make sure you have this configured

const SignupPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  setLoading(true);

  try {
    // Sign up with Supabase (sends OTP email automatically if enabled)
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { phone: phoneNumber },
        emailRedirectTo: "your-app-scheme://auth/callback", // optional for deep linking
      },
    });

    if (signUpError) throw signUpError;

    console.log("SignUp response:", signUpData);

    // Store profile info if user is created immediately
    if (signUpData.user) {
      await supabase.from("profiles").upsert({
        id: signUpData.user.id,
        email,
        phone: phoneNumber,
        created_at: new Date().toISOString(),
      });
    }

    // Navigate to OTP screen (only if email confirmation is required)
    navigation.navigate("OtpPage", { email });
  } catch (error) {
    console.error("Signup error:", error);
    Alert.alert("Error", error.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <View className="bg-white flex-1 justify-center items-center px-5 pb-32">
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      {/* Logo */}
      <Image
        source={require("../assets/foodie_green1.png")}
        className="h-32 w-56"
      />

      {/* Email Field */}
      <KeyboardAvoidingView className="w-full mb-4">
        <View style={styles.inputContainer}>
          <Icon name="email" size={24} color="#9ca3af" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Phone Number Field */}
      <KeyboardAvoidingView className="w-full mb-4">
        <View style={styles.inputContainer}>
          <Icon name="phone" size={24} color="#9ca3af" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))}
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={15}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Password Field */}
      <KeyboardAvoidingView className="w-full mb-6">
        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#9ca3af" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#9ca3af"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Confirm Password Field */}
      <KeyboardAvoidingView className="w-full mb-6">
        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#9ca3af" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#9ca3af"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signInButton}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text className="text-white text-lg font-semibold">
          {loading ? "Creating account..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <Text className="text-2xl font-light mb-5">
        Already have an account?{" "}
        <Text className="text-[#00bf63] font-medium" onPress={handleSignIn}>
          Sign in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#515452",
  },
  icon: {
    marginHorizontal: 10,
  },
  signInButton: {
    backgroundColor: "#00bf63",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default SignupPage;
