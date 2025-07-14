import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  StatusBar,
  Image,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../lib/supabase";

const OtpPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  // States to hold OTP values
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Refs to handle focus on inputs
  const inputRefs = useRef([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  const handleChangeText = (value, index) => {
    if (value.length > 1) return; // Only allow one character per input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-submit when last digit is entered
    if (value !== "" && index === otp.length - 1) {
      handleVerify();
    } else if (value !== "" && index < otp.length - 1) {
      // Move to the next input when a character is entered
      setActiveIndex(index + 1);
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      // Move to the previous input if backspace is pressed and the current input is empty
      setActiveIndex(index - 1);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleFocus = (index) => {
    setActiveIndex(index);
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "email",
      });

      if (error) throw error;

      Alert.alert("Success", "Email verified successfully!");
      navigation.replace("Preferences"); // Replace with your home screen
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);
    setCountdown(30);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (error) throw error;

      Alert.alert("Success", "New OTP sent to your email");
    } catch (error) {
      Alert.alert("Error", error.message);
      setResendDisabled(false);
    }
  };

  return (
    <View className="bg-white flex-1" onPress={Keyboard.dismiss}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Back Arrow */}
        <TouchableOpacity className="w-7 ml-5 mt-10">
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>

        {/* Centered Content */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center items-center px-5"
        >
          {/* Logo */}
          <Image
            source={require("../assets/foodie_green1.png")}
            className="h-32 w-56 mb-5"
          />

          {/* Title and Description */}
          <Text className="text-2xl font-bold text-center mb-2">
            OTP Verification
          </Text>
          <Text className="font-medium text-sm text-gray-400 text-center">
            Please enter the code we just sent to your email
          </Text>
          <Text className="font-bold text-center mb-10">
            {email}
          </Text>

          {/* OTP Input Area */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(value) => handleChangeText(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => handleFocus(index)}
                style={[
                  styles.otpInput,
                  {
                    borderColor: activeIndex === index ? "#00bf63" : "#ccc",
                  },
                ]}
                maxLength={1}
                keyboardType="numeric"
                className="mr-3"
                ref={(el) => (inputRefs.current[index] = el)}
                editable={!loading}
              />
            ))}
          </View>

          {/* Resend Option */}
          <View className="flex justify-center items-center flex-row my-6">
            <Text className="font-medium text-gray-400">
              If you didn't receive a code?{" "}
            </Text>
            {resendDisabled ? (
              <Text className="text-gray-500 font-bold">
                Resend in {countdown}s
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text className="text-[#00bf63] font-bold">Resend</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[styles.btn, loading && { opacity: 0.7 }]}
            onPress={handleVerify}
            disabled={loading}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: "white",
              }}
            >
              {loading ? "Verifying..." : "Continue"}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#00bf63",
    justifyContent: "center",
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#f0f0f0",
  },
});

export default OtpPage;