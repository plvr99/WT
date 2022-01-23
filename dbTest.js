var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it

let server = require('./index.js')
const Sequelize = require('sequelize');
const db = require('./db.js')

let chai = require('chai');
//var mocha = require('mocha')
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let assert = chai.assert;
mocha.setup('bdd')
/*mocha.checkLeaks();
mocha.run();
*/
chai.should();
describe("Test get /vjezbe", function () {
    this.beforeEach(function (done) {
        db.sequelize.sync({ force: true }).then(function () {
            done();
        });
    })
    this.afterEach(function(done){
        db.sequelize.sync({ force: true }).then(function () {
            done();
        });
    })
    it('prazna baza, dodavanje studenta', function (done) {
        chai.request(server).post('/student')
            .set('content-type', 'application/json')
            .send({ ime: "test", prezime: "test", index: "12345", grupa: "TestGrupa" })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    })
})
