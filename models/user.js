const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {type: String, unique: true, required: true},
  contact: { type: Array, default: [], required: [true, 'User phone number required']},
  password: { type: String, required: true , default: '123456' },
  role: {type: Number, required: true},
  photo: { type: String, required: true},
  speciality: {type: Array,default: []},
  appointments: {type: Array, default: []},
  createdAt: {type: Date, default: new Date()},
  updatedAt: {type: Date, default: new Date()}
});

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('users', userSchema);

module.exports = User;
