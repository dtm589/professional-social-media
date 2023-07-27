const User = require('./User');
const Profile = require('./Profile');

User.hasOne(Profile, {
    foreignKey: 'user_id',
});

Profile.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Profile };