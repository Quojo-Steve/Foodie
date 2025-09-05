import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Fallback data in case API fails
const fallbackRecipes = [
  {
    id: "fallback1",
    title: "Jollof Rice",
    ingredients: ["Rice - 2 cups", "Tomatoes - 4", "Onion - 1", "Pepper - 2"],
    directions: [
      "Blend tomatoes and pepper.",
      "Sauté onions, add tomato blend, and cook.",
      "Add rice and water, simmer until cooked.",
    ],
    rating: 4.5,
    time: "45 min",
    category: "Dinner",
    image: { uri: "https://www.themealdb.com/images/media/meals/kw12sz1644513277.jpg" },
    videoUrl: "https://www.youtube.com/watch?v=example",
  },
];

const fetchAfricanRecipes = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.meals) {
      throw new Error("No meals found for African cuisine");
    }

    const recipes = await Promise.all(
      data.meals.map(async (meal) => {
        try {
          const detailResponse = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          );
          if (!detailResponse.ok) {
            throw new Error(`Detail fetch failed for ID: ${meal.idMeal}`);
          }
          const detailData = await detailResponse.json();
          const recipe = detailData.meals[0];
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            if (recipe[`strIngredient${i}`] && recipe[`strIngredient${i}`].trim()) {
              ingredients.push(
                `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`] || ''}`
              );
            }
          }
          return {
            id: recipe.idMeal,
            title: recipe.strMeal,
            ingredients,
            directions: recipe.strInstructions
              ? recipe.strInstructions.split("\r\n").filter((step) => step.trim())
              : [],
            rating: 4.0, // TheMealDB doesn't provide ratings
            time: "N/A", // TheMealDB doesn't provide time
            category: recipe.strCategory || "Dinner",
            image: { uri: recipe.strMealThumb },
            videoUrl: recipe.strYoutube || "",
          };
        } catch (error) {
          console.error(`Error fetching details for meal ${meal.idMeal}:`, error);
          return null;
        }
      })
    );
    // Filter out null results from failed detail fetches
    return recipes.filter((recipe) => recipe !== null);
  } catch (error) {
    console.error("Error fetching African recipes:", error);
    Alert.alert("Network Error", "Failed to fetch recipes. Using fallback data.");
    return fallbackRecipes;
  }
};

const handleImageClicked = (item, navigation) => {
  navigation.navigate("RecipeDetail", { recipeId: item.id });
};

const toggleSaveRecipe = (item, savedRecipes, setSavedRecipes) => {
  const isSaved = savedRecipes.some((recipe) => recipe.id === item.id);
  if (isSaved) {
    setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== item.id));
  } else {
    setSavedRecipes([...savedRecipes, item]);
  }
};

const RecipeCard = ({ item, navigation, savedRecipes, setSavedRecipes }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => handleImageClicked(item, navigation)}
  >
    <Image source={item.image} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDetails}>
        {item.ingredients.length} ingredients • {item.time}
      </Text>
      <View style={styles.ratingRowMain}>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#facc15" />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleSaveRecipe(item, savedRecipes, setSavedRecipes)}
        >
          <Ionicons
            name={savedRecipes.some((recipe) => recipe.id === item.id) ? "bookmark" : "bookmark-outline"}
            size={16}
            color="#00bf63"
          />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      const fetchedRecipes = await fetchAfricanRecipes();
      setRecipes(fetchedRecipes);
      setLoading(false);
    };
    loadRecipes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00bf63" />
        <Text style={styles.loadingText}>Loading African Recipes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container1}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1742201408321-64ddd59d1ca3?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
            style={styles.profilePic}
          />
          <Text style={styles.appName}>Foodie</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBox}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search" size={20} color="#6b7280" />
          <Text style={styles.searchInput}>Search for a recipe</Text>
        </TouchableOpacity>

        {/* Recommended Recipes */}
        <Text style={styles.sectionTitle}>African Recipes</Text>
        {recipes.length > 0 ? (
          <FlatList
            data={recipes}
            style={styles.flatListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RecipeCard
                item={item}
                navigation={navigation}
                savedRecipes={savedRecipes}
                setSavedRecipes={setSavedRecipes}
              />
            )}
          />
        ) : (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={44} color="#6b7280" style={{ marginBottom: 8 }} />
            <Text style={styles.errorText}>No recipes found. Please try again later.</Text>
          </View>
        )}

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
              <RecipeCard
                item={item}
                navigation={navigation}
                savedRecipes={savedRecipes}
                setSavedRecipes={setSavedRecipes}
              />
            )}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <Ionicons
              name="bookmark-outline"
              size={44}
              color="#6b7280"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.emptyStateText}>
              No saved recipes yet. Bookmark your favorite African recipes to see them here!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    padding: 20,
    marginBottom: 60,
    backgroundColor: "#f9fafb",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6b7280",
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00bf63",
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: "#6b7280",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    width: 240,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 6,
  },
  cardDetails: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
  },
  ratingRowMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#1f2937",
  },
  flatListContainer: {
    paddingVertical: 4,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default HomeScreen;