'user strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model{}
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A first name is required.'
                },
                notEmpty: {
                    msg: 'Please provide a name.'
                }
            }
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A last name is required.'
                },
                notEmpty: {
                    msg: 'Please provide a last name.'
                }
            }
        },
        emailAddress:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "This email address already exists."
            },
            validate:{
                notNull:{
                    msg: "An email is required."
                },
                isEmail:{
                    msg: "Please enter a valid email."
                }
            }
        },
        password:{
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A password is required.'
                },
                notEmpty: {
                    msg: 'Please provide a password'
                },
                len: {
                    args: [8, 20],
                    msg: 'The password should be between 8 and 20 characters.'
                }
            }
        }
    }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: 'student',
            foreignKey:{
                fieldName:'studentPersonId',
                allowNull: false
            }
        });
    }

    return User;
}