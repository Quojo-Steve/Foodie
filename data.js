const recipeResults = [
  {
    id: "1",
    title: "Crispy Fried Chicken",
    ingredients: [
      "Chicken drumsticks",
      "Buttermilk",
      "All-purpose flour",
      "Paprika",
      "Garlic powder",
      "Salt",
      "Black pepper",
      "Vegetable oil"
    ],
    directions: [
      "Marinate chicken in buttermilk for 4 hours.",
      "Mix flour and spices in a bowl.",
      "Coat chicken in flour mixture.",
      "Fry in hot oil until golden and cooked through."
    ],
    rating: 4.7,
    time: "30 min",
    category: "Dinner",
    image: require("./assets/chicken.jpg"),
    videoUrl: "https://www.youtube.com/watch?v=6tw9jOBEXzI",
  },
  {
    id: "2",
    title: "Chicken Parmesan",
    ingredients: [
      "Chicken breasts",
      "Breadcrumbs",
      "Parmesan cheese",
      "Mozzarella cheese",
      "Eggs",
      "Marinara sauce",
      "Olive oil"
    ],
    directions: [
      "Coat chicken with egg, breadcrumbs, and Parmesan.",
      "Pan-fry until golden.",
      "Top with marinara and mozzarella.",
      "Bake until cheese melts."
    ],
    rating: 4.5,
    time: "45 min",
    category: "Italian",
    image: require("./assets/chicken.jpg"),
    videoUrl: "https://www.youtube.com/watch?v=6tw9jOBEXzI",
  },
  {
    id: "3",
    title: "Fajita Chicken Wraps",
    ingredients: [
      "Chicken strips",
      "Bell peppers",
      "Onions",
      "Tortillas",
      "Lime juice",
      "Fajita seasoning"
    ],
    directions: [
      "Sauté chicken with seasoning.",
      "Add sliced peppers and onions.",
      "Cook until veggies are tender.",
      "Wrap in warm tortillas and serve."
    ],
    rating: 4.2,
    time: "25 min",
    category: "Mexican",
    image: require("./assets/chicken.jpg"),
    videoUrl: "https://www.youtube.com/watch?v=6tw9jOBEXzI",
  },
  {
    id: "4",
    title: "Chicken Tandoori",
    ingredients: [
      "Chicken thighs",
      "Plain yogurt",
      "Tandoori masala",
      "Garlic",
      "Ginger",
      "Lemon juice",
      "Salt",
      "Chili powder",
      "Vegetable oil"
    ],
    directions: [
      "Marinate chicken in yogurt and spices overnight.",
      "Preheat oven or grill.",
      "Cook chicken until charred and juicy.",
      "Serve with lemon wedges."
    ],
    rating: 4.8,
    time: "50 min",
    category: "Indian",
    image: require("./assets/chicken.jpg"),
    videoUrl: "https://www.youtube.com/watch?v=6tw9jOBEXzI",
  },
  {
    id: "5",
    title: "Lemon Garlic Chicken",
    ingredients: [
      "Chicken breasts",
      "Garlic cloves",
      "Lemon juice",
      "Olive oil",
      "Parsley"
    ],
    directions: [
      "Sauté garlic in olive oil.",
      "Add chicken and cook until golden.",
      "Pour lemon juice over chicken.",
      "Garnish with parsley and serve."
    ],
    rating: 4.3,
    time: "20 min",
    category: "Quick Meal",
    image: require("./assets/chicken.jpg"),
    videoUrl: "https://www.youtube.com/watch?v=6tw9jOBEXzI",
  },
  {
    id: "6",
    title: "Honey Soy Chicken Thighs",
    ingredients: [
      "Chicken thighs",
      "Soy sauce",
      "Honey",
      "Garlic",
      "Ginger",
      "Sesame oil"
    ],
    directions: [
      "Mix soy, honey, garlic, and ginger.",
      "Marinate chicken for 30 minutes.",
      "Bake or pan-fry until cooked through.",
      "Drizzle with sesame oil and serve."
    ],
    rating: 4.6,
    time: "35 min",
    category: "Asian",
    image: require("./assets/chicken.jpg"),
    videoUrl: "https://www.youtube.com/watch?v=6tw9jOBEXzI",
  },
  {
    id: "7",
    title: "Spicy Chicken Stir Fry",
    ingredients: [
      "Chicken breast",
      "Bell peppers",
      "Soy sauce",
      "Chili flakes",
      "Garlic",
      "Cornstarch",
      "Vegetable oil"
    ],
    directions: [
      "Slice chicken and coat with cornstarch.",
      "Stir-fry garlic and chili flakes in oil.",
      "Add chicken and vegetables.",
      "Stir in soy sauce and cook until done."
    ],
    rating: 4.4,
    time: "25 min",
    category: "Asian",
    image: require("./assets/chicken.jpg"),
    videoUrl: "https://www.youtube.com/watch?v=6tw9jOBEXzI",
  },
];

export default recipeResults;
