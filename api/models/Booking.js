const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
  user: {type:mongoose.Schema.Types.ObjectId, required:true},
  checkIn: {type:Date, required:true},
  checkOut: {type:Date, required:true},
  name: {type:String, required:true},
  phone: {type:String, required:true},
  rating:{type:Number, default:0},
  ratings: {type: [Number], default:[]},
  reviewers: {type:[String],default:[]},
  price: Number,
 
},
{ timestamps: true });

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;