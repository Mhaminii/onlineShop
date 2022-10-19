const mongoose =require('mongoose')

mongoose.connect("mongodb://0.0.0.0:27017/OnlineShop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

console.log('Connected To Database.') 