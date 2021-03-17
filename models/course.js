'user strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model{}
    Course.init({
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A course title is required.'
                },
                notEmpty: {
                    msg: 'Please provide a course title.'
                }
            }
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description is required.'
                },
                notEmpty: {
                    msg: 'Please provide a description.'
                }
            }

        },
        estimatedTime:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'An estimated time is required.'
                },
                notEmpty: {
                    msg: 'Please provide an estimated time.'
                }
            }
        },
        materialsNeeded:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A list of materials is required.'
                },
                notEmpty: {
                    msg: 'Please provide a list of materials.'
                }
            }

        }
    }, { sequelize });

    Course.associate = (models) => {
        Course.belongsTo(models.User,{
            as: 'student',
            foreignKey: {
                fieldName: 'studentPersonId',
                allowNull: false
            }

        });
    }

    return Course;
}