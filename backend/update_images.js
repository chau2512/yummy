// Update food image filenames in MongoDB
import mongoose from 'mongoose';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-del';
await mongoose.connect(MONGODB_URI);

const foodSchema = new mongoose.Schema({
    name: String, description: String, price: Number,
    image: String, category: String, ratings: Array
});
const Food = mongoose.models.food || mongoose.model('food', foodSchema);

const imageMap = {
    'Greek Salad': 'greek_salad.png',
    'Caesar Salad': 'caesar_salad.png',
    'Chocolate Cake': 'chocolate_cake.png',
    'Strawberry Cake': 'strawberry_cake.png',
    'Chicken Sandwich': 'chicken_sandwich.png',
    'Veggie Roll': 'veggie_roll.png',
    'Pasta Carbonara': 'pasta_carbonara.png',
    'Pad Thai Noodle': 'pad_thai.png',
    'Brownie Dessert': 'brownie_dessert.png',
    'Paneer Tikka': 'paneer_tikka.png',
};

for (const [name, image] of Object.entries(imageMap)) {
    const result = await Food.updateOne({ name }, { $set: { image } });
    console.log(`${name}: ${result.modifiedCount ? '✅ updated' : '⚠️ not found'} -> ${image}`);
}

await mongoose.disconnect();
console.log('Done!');
