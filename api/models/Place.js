const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
  rating:{type:Number, default:0},
  ratings: {type: [Number], default:[]},
  reviewers: {type:[String],default:[]},
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;