const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2118757","root","password",
    {host:"127.0.0.1",
    dialect:"mysql",
    logging:false,
    port:3306});

const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.grupa = require('./dbModels/Grupa.js')(sequelize)
db.student = require('./dbModels/Student.js')(sequelize)
db.vjezba = require('./dbModels/Vjezba.js')(sequelize)
db.zadatak = require('./dbModels/Zadatak.js')(sequelize)

//relacije
db.grupa.hasMany(db.student,{as:'studentiGrupe'});
db.vjezba.hasMany(db.zadatak,{as:'zadaciVjezbe'});

module.exports=db;