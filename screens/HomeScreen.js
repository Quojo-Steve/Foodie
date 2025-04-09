// Update HomeScreen.js by removing the bottom navigation bar
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Card, Icon } from '@ui-kitten/components';
import * as EvaIcons from '@ui-kitten/eva-icons';

function HomeScreen({ navigation }) {
  const recommendedRecipes = [
    {
      id: '1',
      title: 'Duble cheese Burger',
      image: 'https://via.placeholder.com/150',
      ingredients: 5,
      time: '30 min',
      rating: 2.4,
    },
    {
      id: '2',
      title: 'Duble cheese Burger',
      image: 'https://via.placeholder.com/150',
      ingredients: 5,
      time: '30 min',
      rating: 2.4,
    },
  ];

  const savedRecipes = [
    {
      id: '3',
      title: 'Pizza Margherita',
      image: 'https://via.placeholder.com/150',
      ingredients: 6,
      time: '40 min',
      rating: 4.5,
    },
  ];

  const renderRecipeCard = ({ item }) => (
    <Card className="m-2 w-48 rounded-lg">
      <Image
        source={{ uri: item.image }}
        className="h-32 w-full rounded-t-lg"
        resizeMode="cover"
      />
      <View className="p-2">
        <Text className="text-base font-semibold">{item.title}</Text>
        <View className="flex-row justify-between mt-1">
          <Text className="text-sm text-gray-600">
            {item.ingredients} ingredients
          </Text>
          <View className="flex-row items-center">
            <Icon
              name="clock-outline"
              {...EvaIcons.ClockOutline}
              width={16}
              height={16}
              fill="#666"
            />
            <Text className="text-sm text-gray-600 ml-1">{item.time}</Text>
          </View>
        </View>
        <View className="flex-row items-center mt-1">
          <Icon
            name="star"
            {...EvaIcons.Star}
            width={16}
            height={16}
            fill="#FFD700"
          />
          <Text className="text-sm text-gray-600 ml-1">{item.rating}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-green-600">DishDash</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <View className="relative">
            <Icon
              name="bell-outline"
              {...EvaIcons.BellOutline}
              width={24}
              height={24}
              fill="#000"
            />
            <View className="absolute -top-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
              <Text className="text-white text-xs">5</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="mx-4 my-2">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Icon
            name="search-outline"
            {...EvaIcons.SearchOutline}
            width={20}
            height={20}
            fill="#666"
          />
          <TextInput
            placeholder="Search for a recipe"
            className="ml-2 flex-1 text-base"
          />
        </View>
      </View>

      {/* Recommended Recipes Section */}
      <View className="mt-4">
        <Text className="text-lg font-semibold px-4 mb-2">
          Recommended Recipes
        </Text>
        <FlatList
          data={recommendedRecipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-2"
        />
      </View>

      {/* Saved Recipes Section */}
      <View className="mt-4 flex-1">
        <Text className="text-lg font-semibold px-4 mb-2">Saved Recipes</Text>
        <FlatList
          data={savedRecipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-2"
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;