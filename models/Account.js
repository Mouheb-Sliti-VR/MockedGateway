const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AccountSchema = new mongoose.Schema({
  ID_META: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  ID_ORANGE: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  coins: {
    type: Number,
    default: 0
  },
  Room_1_KPI: {
    type: Number,
    default: 0
  },
  Room_2_KPI: {
    type: Number,
    default: 0
  }
});

// Hashing the password before saving it to the database
/*
AccountSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
}); 
*/

module.exports = mongoose.model('Account', AccountSchema);
