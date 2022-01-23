const Sequelize = require("sequelize");
module.exports = function(sequelize,DataTypes){
    const Vjezba = sequelize.define("Vjezba",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nazivVjezbe:{
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true, 
        }
    });
    return Vjezba;
};