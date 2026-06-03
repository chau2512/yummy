// Seed data script for Yumm! project
// Run: node seed_data.js

import mongoose from 'mongoose';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-del';

await mongoose.connect(MONGODB_URI);
console.log('Connected to MongoDB');

// Define food schema
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    ratings: [{
        userId: { type: String, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true }
    }]
});

const Food = mongoose.models.food || mongoose.model('food', foodSchema);

// Sample food data
const foods = [
    { name: 'Greek Salad', description: 'Fresh salad with feta cheese, olives, and Mediterranean herbs', price: 55000, image: 'sample_salad.jpg', category: 'Salad' },
    { name: 'Caesar Salad', description: 'Classic Caesar with romaine, croutons, and parmesan', price: 65000, image: 'sample_caesar.jpg', category: 'Salad' },
    { name: 'Chocolate Cake', description: 'Rich dark chocolate layer cake with ganache frosting', price: 85000, image: 'sample_choco.jpg', category: 'Cake' },
    { name: 'Strawberry Cake', description: 'Light sponge cake with fresh strawberry cream filling', price: 75000, image: 'sample_straw.jpg', category: 'Cake' },
    { name: 'Chicken Sandwich', description: 'Grilled chicken with lettuce, tomato and special sauce', price: 45000, image: 'sample_sandwich.jpg', category: 'Sandwich' },
    { name: 'Veggie Roll', description: 'Fresh vegetables wrapped in rice paper with peanut dip', price: 35000, image: 'sample_roll.jpg', category: 'Rolls' },
    { name: 'Pasta Carbonara', description: 'Creamy pasta with bacon, egg yolk and parmesan cheese', price: 95000, image: 'sample_pasta.jpg', category: 'Pasta' },
    { name: 'Pad Thai Noodle', description: 'Stir-fried rice noodle with shrimp, peanuts and lime', price: 80000, image: 'sample_noodle.jpg', category: 'Noodles' },
    { name: 'Brownie Dessert', description: 'Warm chocolate brownie with vanilla ice cream', price: 60000, image: 'sample_dessert.jpg', category: 'Deserts' },
    { name: 'Paneer Tikka', description: 'Marinated cottage cheese grilled with spices and peppers', price: 70000, image: 'sample_pureveg.jpg', category: 'Pure Veg' },
];

await Food.deleteMany({});
const result = await Food.insertMany(foods);
console.log(`Seeded ${result.length} food items`);

// Verify
const count = await Food.countDocuments();
console.log(`Total foods in DB: ${count}`);

await mongoose.disconnect();
console.log('Done!');
