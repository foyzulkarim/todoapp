const mongoose = require("mongoose");

const uri = `mongodb://localhost:27017/todo-app`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const connectWithDb = async () => {
    const connectionResult = await mongoose.connect(uri, options);
    return true;
};
module.exports = connectWithDb;
