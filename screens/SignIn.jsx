import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons"; // Using MaterialIcons for simplicity
import { supabase } from "../lib/supabase";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    navigation.replace("Main"); // or navigate to a protected screen
  }
};

  const handleSignUp = () => {
    // Navigate to SignUp screen (you can create this later)
    navigation.replace("SignUp");
    // console.log('Navigate to Sign Up');
  };

  return (
    <View className="bg-white flex-1 justify-center items-center px-5 pb-32">
      <StatusBar barStyle="light-content" backgroundColor="#fff" />

      {/* Logo */}
      <Image
        source={require("../assets/foodie_green1.png")}
        style={styles.logo}
      />

      <KeyboardAvoidingView className="w-full mb-4">
        {/* <Text className="text-lg font-medium mb-2 text-gray-300">
          Email Address
          </Text> */}
        <View style={styles.inputContainer}>
          <Icon name="email" size={24} color="#9ca3af" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </KeyboardAvoidingView>

      {/* Password Field */}
      <KeyboardAvoidingView className="w-full mb-6">
        {/* <Text className="text-lg font-medium mb-2 text-gray-300">Password</Text> */}
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

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text className="text-white text-lg font-semibold">Sign In</Text>
      </TouchableOpacity>
          <Text className="text-2xl font-light mb-5">
            Don't have an account?{" "}
            <Text className="text-[#00bf63] font-medium" onPress={handleSignUp}>
              Sign up
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
  logo:{
    width: 224,
    height: 128
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

export default SignIn;
