import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import recipeResults from "../data";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const handleImageClicked = (item) => {
    // console.log(item.id)
    navigation.navigate("RecipeDetail", { recipeId: item.id });
    // Example: navigation.navigate('QuickRecipeGenerator');
  };

  const RecipeListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => handleImageClicked(item)}
    >
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeDetails}>
        <View style={styles.recipeTextContainer}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeCategory}>{item.category}</Text>
          <View style={styles.recipeInfoRow}>
            <Text style={styles.recipeInfo}>
              {item.ingredients.length} ingredients
            </Text>
            <Text style={styles.recipeInfo}> • </Text>
            <Text style={styles.recipeInfo}>{item.time}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons name="bookmark-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const FilterButton = ({ title }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === title && styles.activeFilterButton,
      ]}
      onPress={() => setActiveFilter(title)}
    >
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === title && styles.activeFilterButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header with search input */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for recipes..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery("")}
            >
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        <FilterButton title="All" />
        <FilterButton title="Dinner" />
        <FilterButton title="Quick" />
        <FilterButton title="Healthy" />
        <FilterButton title="Italian" />
        <FilterButton title="Mexican" />
      </ScrollView>

      {/* Recipe List */}
      <FlatList
        data={recipeResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeListItem item={item} />}
        contentContainerStyle={styles.recipeList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.resultsText}>
            {recipeResults.length} recipes found
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 1,
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f4",
    borderRadius: 24,
    paddingHorizontal: 15,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  clearButton: {
    padding: 5,
  },
  filterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  filterButton: {
    paddingHorizontal: 16,
    height: 32,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#f1f3f4",
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: "#4CAF50",
  },
  filterButtonText: {
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },
  activeFilterButtonText: {
    color: "#fff",
  },
  recipeList: {
    padding: 20,
  },
  resultsText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  recipeItem: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeImage: {
    width: 120,
    height: 120,
  },
  recipeDetails: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipeTextContainer: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  recipeCategory: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
    marginBottom: 8,
  },
  recipeInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  recipeInfo: {
    color: "#777",
    fontSize: 13,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
  bookmarkButton: {
    padding: 5,
    alignSelf: "flex-start",
  },
});
