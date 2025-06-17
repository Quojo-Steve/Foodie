import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import recipeResults from "../data";


const { width } = Dimensions.get("window");

const RecipeDetail = ({ route, navigation }) => {
  const { recipeId } = route.params || {};
  const recipe = recipeResults.find((r) => r.id === recipeId);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ padding: 20, fontSize: 16 }}>Recipe not found.</Text>
      </SafeAreaView>
    );
  }

  const {
    title,
    ingredients = [],
    directions = [],
    rating,
    time,
    difficulty,
    image,
    videoUrl,
  } = recipe;

  const getEmbedUrl = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={image} style={styles.headerImage} />
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent"]}
            style={styles.gradient}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Recipe Card */}
        <View style={styles.card}>
          {/* Title and Meta */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.metaContainer}>
              <View style={styles.metaPill}>
                <Ionicons name="time-outline" size={14} color="#00bf63" />
                <Text style={styles.metaPillText}>{time}</Text>
              </View>
              <View style={styles.metaPill}>
                <Ionicons name="speedometer-outline" size={14} color="#00bf63" />
                <Text style={styles.metaPillText}>{difficulty}</Text>
              </View>
              <View style={styles.metaPill}>
                <Ionicons name="star-outline" size={14} color="#00bf63" />
                <Text style={styles.metaPillText}>{rating}</Text>
              </View>
            </View>
          </View>

          {/* Video */}
          {embedUrl && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Watch How To Make It</Text>
              <View style={styles.videoContainer}>
                <WebView
                  source={{ uri: embedUrl }}
                  style={styles.video}
                  javaScriptEnabled
                  domStorageEnabled
                  allowsFullscreenVideo
                  startInLoadingState
                />
              </View>
            </View>
          )}

          {/* Ingredients */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <Text style={styles.sectionSubtitle}>
                {ingredients.length} items
              </Text>
            </View>
            <View style={styles.ingredientsList}>
              {ingredients.map((item, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Directions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Directions</Text>
              <Text style={styles.sectionSubtitle}>
                {directions.length} steps
              </Text>
            </View>
            <View style={styles.directionsList}>
              {directions.map((step, index) => (
                <View key={index} style={styles.directionStep}>
                  <View style={styles.stepNumberContainer}>
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  </View>
                  <Text style={styles.directionText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContent: {
    paddingBottom: 10,
  },
  header: {
    height: width * 0.7,
    position: "relative",
    marginBottom: -40,
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "40%",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    lineHeight: 38,
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5ffef",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5ffef",
  },
  metaPillText: {
    fontSize: 13,
    color: "#00bf63",
    marginLeft: 4,
    fontWeight: "500",
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  videoSection: {
    marginBottom: 24,
  },
  videoContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 12,
  },
  video: {
    flex: 1,
  },
  ingredientsList: {
    backgroundColor: "#e5ffef",
    borderRadius: 12,
    padding: 16,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5ffef",
  },
  ingredientBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00bf63",
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: "#555",
    flex: 1,
  },
  directionsList: {
    backgroundColor: "#e5ffef",
    borderRadius: 12,
    padding: 16,
  },
  directionStep: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEFF",
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#00bf63",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumber: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  directionText: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    lineHeight: 24,
  },
});

export default RecipeDetail;