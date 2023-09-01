const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://raghav:tashi@cluster0.gxp4vaf.mongodb.net/FoodDelivery%2DMERN?retryWrites=true&w=majority";

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("Food");
            fetched_data.find({}).toArray(async(err, data)=>{
                const foodCategory = await mongoose.connection.db.collection("FoodCategory");
                foodCategory.find({}).toArray((err,catData)=>{
                    if (err) console.log(err);
                else {
                    global.food_items=data;
                    global.foodCategory = catData;
                }});
                })
        }   }
    );
       
}

module.exports = mongoDB;

