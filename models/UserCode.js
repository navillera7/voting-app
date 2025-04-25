const mongoose = require('mongoose');

const userCodeSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  voted: { type: Boolean, default: false },
votes: { type: String } // 또는 'vote' 단수로 변경해도 됨

});

module.exports = mongoose.models.UserCode || mongoose.model('UserCode', userCodeSchema);
