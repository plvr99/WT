const Sequelize = require("sequelize");
module.exports = function(sequelize,DataTypes){
    const Zadatak = sequelize.define("Zadatak",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nazivZadatka:{
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true, 
        },
    });
    return Zadatak;
};