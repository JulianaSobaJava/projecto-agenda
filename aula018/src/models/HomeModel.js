const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo:{type: String, required: true},
    descrição:String
});

const HomeModel = mongoose.model('Home', HomeSchema);
class Home{

}
exports.Home;