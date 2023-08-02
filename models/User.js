const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const validator = require('validator');

class User extends Model {
    checkPw(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            isAlpha: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        img: {
            type: DataTypes.STRING,
            validate: {
                customValidator(value) {
                    if (!validator.isURL(value)) {
                        throw new Error("Invalid URL");
                    }
                },
            },
        },
        company: {
            type: DataTypes.STRING,
        },
        experience: {
            type: DataTypes.TEXT,
        },
        education: {
            type: DataTypes.TEXT,
        },
        skills: {
            type: DataTypes.TEXT,
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
)

module.exports = User;