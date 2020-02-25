const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },

  reviews: [
    {
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
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  social: {
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
