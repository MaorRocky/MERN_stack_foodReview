const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResturantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  //todo understand how to add and change reviews inside resturants
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      review: {
        bathroom: {
          type: Number,
          required: true
        },
        staff: {
          type: Number,
          required: true
        },
        cleanliness: {
          type: Number,
          required: true
        },
        drive_thru: {
          type: Number,
          required: true
        },
        delivery: {
          type: Number,
          required: true
        },
        food: {
          type: Number,
          required: true
        }
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Resturant = mongoose.model('resturant', ResturantSchema);
