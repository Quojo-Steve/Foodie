import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import recipeResults from "../data";

const savedRecipes = [];

const handleImageClicked = (item, navigation) => {
  navigation.navigate("RecipeDetail", { recipeId: item.id });
  // Example: navigation.navigate('QuickRecipeGenerator');
};

const RecipeCard = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={
      () => handleImageClicked(item, navigation)
      // navigation.navigate("RecipeDetail", {
      //   recipe: {
      //     title: item.title,
      //     ingredients: Array(item.ingredients).fill("Ingredient"), // Placeholder, adjust as needed
      //     directions: ["Cook the meal.", "Serve hot."], // Placeholder, adjust as needed
      //     rating: item.rating,
      //     time: item.time,
      //     image: item.image, // Pass the image if needed
      //     videoUrl: "https://www.youtube.com/watch?v=6tw9jOBEXzI",
      //   },
      // })
    }
  >
    <Image source={item.image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{item.title}</Text>
    <Text style={styles.cardDetails}>
      {item.ingredients.length} ingredients ⏱ {item.time}
    </Text>
    <View style={styles.ratingRowMain}>
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={16} color="gold" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <TouchableOpacity
        style={{
          alignItems: "center",
        }}
      >
        <Ionicons name="bookmarks-outline" size={14} color="black" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container1}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/50" }}
            style={styles.profilePic}
          />
          <Text style={styles.appName}>Foodie</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} />
          </TouchableOpacity>
        </View>

        {/* Search Bar - Fixed with TouchableOpacity instead of View */}
        <TouchableOpacity
          style={styles.searchBox}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search" size={20} color="#888" />
          <Text style={styles.searchInput}>Search for a recipe</Text>
        </TouchableOpacity>

        {/* Recommended Recipes */}
        <Text style={styles.sectionTitle}>Recommended Recipes</Text>
        <FlatList
          data={recipeResults}
          style={styles.flatListContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCard item={item} navigation={navigation} />
          )}
        />

        {/* Saved Recipes */}
        <Text style={styles.sectionTitle}>Saved Recipes</Text>
        {savedRecipes.length > 0 ? (
          <FlatList
            data={savedRecipes}
            horizontal
            style={styles.flatListContainer}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id + "saved"}
            renderItem={({ item }) => (
              <RecipeCard item={item} navigation={navigation} />
            )}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <Ionicons
              name="bookmarks-outline"
              size={44}
              color="gray"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.emptyStateText}>
              There is no saved items. Bookmark your favourites and see your
              recipe history
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 60,
    backgroundColor: "white",
  },
  container1: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00bf63",
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#d7d7d7",
    padding: 8,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: "#888",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 230,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    paddingBottom: 10,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 19,
    marginTop: 6,
    marginHorizontal: 8,
  },
  cardDetails: {
    fontSize: 14,
    color: "#666",
    marginHorizontal: 8,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginTop: 4,
  },
  ratingRowMain: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  flatListContainer: {
    paddingHorizontal: 2,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 16,
    marginTop: 8,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});
