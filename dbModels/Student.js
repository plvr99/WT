const Sequelize = require("sequelize");
module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define("Student",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ime:{
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true, 
        },
        prezime:{
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true, 
        },
        index:{
            type: Sequelize.INTEGER,
            allowNull: false,
            notEmpty: true, 
        },
        grupa:{
            type: Sequelize.STRING,
            notEmpty: true, 
        }
    });
    return Student;
};