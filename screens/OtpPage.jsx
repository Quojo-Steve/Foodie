import React, { useState, useRef } from "react";
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
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const OtpPage = () => {
  const navigation = useNavigation();

  // States to hold OTP values
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs to handle focus on inputs
  const inputRefs = useRef([]);

  const handleChangeText = (value, index) => {
    if (value.length > 1) return; // Only allow one character per input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < otp.length - 1) {
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

  return (
    <View className="bg-white flex-1" onPress={Keyboard.dismiss}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Back Arrow */}
        <TouchableOpacity className="w-7 ml-5 mt-5">
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
            className="h-32 w-56 mb-5" // Reduced size for better balance
          />

          {/* Title and Description */}
          <Text className="text-2xl font-bold text-center mb-2">
            OTP Verification
          </Text>
          <Text className="font-medium text-sm text-gray-400 text-center">
            Please enter the code we just sent to your email
          </Text>
          <Text className="font-bold text-center mb-10">
            quojosteve@gmail.com
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
              />
            ))}
          </View>

          {/* Resend Option */}
          <View className="flex justify-center items-center flex-row my-6">
            <Text className="font-medium text-gray-400">
              If you didn't receive a code?
            </Text>
            <Text className="text-[#00bf63] font-bold ml-1">Resend</Text>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.replace("Preferences")}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: "white",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default OtpPage;

const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: "100%", // Full width of the parent container
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
