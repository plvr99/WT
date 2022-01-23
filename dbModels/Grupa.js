const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Grupa = sequelize.define("Grupa",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nazivGrupe:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            notEmpty: true, 
        }
    });
    return Grupa;
};
