let server = require('./index.js')
const Sequelize = require('sequelize');
const db = require('./db.js')

let chai = require('chai');
let chaiHttp = require('chai-http');
const Student = require('./dbModels/Student.js');
chai.use(chaiHttp);
chai.should();


function preTest() {
    lista = [];
    return new Promise(function (resolve) {
        lista.push(db.grupa.create({ nazivGrupe: "GrupaA" }));
        lista.push(db.grupa.create({ nazivGrupe: "GrupaB" }));
        lista.push(db.student.create({ ime: "Mujo", prezime: "Mujic", index: "12345", grupa: "GrupaA" }).then((student) => {
            db.grupa.findOne({ where: { nazivGrupe: "GrupaA" } }).then((grupa) => {
                grupa.addStudentiGrupe(student);
            })
        }));
        Promise.all(lista).then(() => {
            resolve();
        })
    })
}
describe("Test GET /vjezbe", function () {
    this.beforeAll(function (done) {
        db.sequelize.sync({ force: true }).then(function () {
            done();
        });
    })
    this.afterAll(function (done) {
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
    it('dodavanje studenta sa istim indexom', function (done) {
        //ponovno dodavanje studenta istog studenta kao u prvom testu  
        chai.request(server).post('/student')
            .set('content-type', 'application/json')
            .send({ ime: "ime", prezime: "prezime", index: "12345", grupa: "TestGrupa" })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.status.should.eql("Student sa indexom 12345 već postoji!");
                done();
            })
    })
})

describe('Test PUT /student/:index', function () {
    this.beforeAll(function (done) {
        db.sequelize.sync({ force: true }).then(function () {
            preTest().then(() => {
                done();
            })
        });
    })
    this.afterAll(function () {
        db.sequelize.sync({ force: true }).then(function () {
            done();
        });
    })
    it("Mijenjanje grupe studenta sa indexom 12345 u postojecu grupu", function (done) {
        chai.request(server).put('/student/12345')
            .set('content-type', 'application/json')
            .send({ grupa: "GrupaB" })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.status.should.eql("Promjenjena grupa studentu 12345");
                done();
            })
    })
    it('Vracanje prvobitne grupe studentu sa indexom 12345', function (done) {
        chai.request(server).put('/student/12345')
            .set('content-type', 'application/json')
            .send({ grupa: "GrupaA" })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.status.should.eql("Promjenjena grupa studentu 12345");
                done();
            })
    })
    it('Postavljanje grupe koja ne postoji', function (done) {
        chai.request(server).put('/student/12345')
            .set('content-type', 'application/json')
            .send({ grupa: "GrupaC" })
            .end(function (err, res) {
                db.grupa.findAll().then((grupe) => {
                    grupe.should.have.lengthOf(3, "U bazi se nalaze 3 grupe");
                    res.should.have.status(200);
                    res.body.status.should.eql("Promjenjena grupa studentu 12345");

                }).then(() => { done() })
            })
    })
    it('Mijenanje grupe nepostojecem studentu', function (done) {
        chai.request(server).put('/student/11111')
            .set('content-type', 'application/json')
            .send({ grupa: "GrupaB" })
            .end(function (err, res) {
                res.should.have.status(404);
                res.body.status.should.eql("Student sa indexom 11111 ne postoji");
                done();
            })
    })
})

describe("Test POST /batch/student", function () {
    this.beforeAll(function (done) {
        db.sequelize.sync({ force: true }).then(function () {
            preTest().then(() => {
                done();
            })
        });
    })
    this.afterAll(function () {
         db.sequelize.sync({ force: true }).then(function () {
             done();
         });
     })
    it('Dodavanje samo jednog studenta', function (done) {
        chai.request(server).post("/batch/student").set('content-type', 'application/json')
            .send({ csv: "mujo,mujic,11223,grupa" })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.status.should.eql("Dodano 1 studenata!");
                done();
            })
    })
    it('Dodavanje vise studenata', function (done) {
        chai.request(server).post("/batch/student").set('content-type', 'application/json')
            .send({ csv: "mujo,drugi,11222,grupa\nfata,fatic,11224,grupaB\nfata,mujic,11225,grupaB" })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.status.should.eql("Dodano 3 studenata!");
                done();
            })
    })
    it('Dodavanje postojecih studenata', function (done) {
        chai.request(server).post("/batch/student").set('content-type', 'application/json')
            .send({ csv: "mujo,drugi,11222,grupa\nfata,fatic,11224,grupaB\nfata,mujic,11225,grupaB" })
            .end(function (err, res) {
                db.student.findAll().then((studenti) => {
                    studenti.should.have.lengthOf(5)
                    res.should.have.status(200);
                    //res.body.status.should.eql("Dodano 0 studenata, a studenti {11222,11224,11225} već postoje!");
                }).then(() => {
                    done();
                })
            })
    })
    it('Preskakivanje nevalidnog reda u csv textu', function (done) {
        chai.request(server).post("/batch/student").set('content-type', 'application/json')
            .send({ csv: "ispravan,red,12121,grupaB\nneispravan,,indeks ne bi trebao imati slova,grupaB" })
            .end(function (err, res) {
                db.student.findAll().then((studenti) => {
                    studenti.should.have.lengthOf(6)
                    res.should.have.status(200);
                }).then(() => {
                    done();
                })
            })
    })
    it('Dodavanje studenta sa istim indexom', function (done) {
        chai.request(server).post("/batch/student").set('content-type', 'application/json')
            .send({ csv: "a,a,11,grupaA\na,a,11,grupaA" })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.status.should.eql("Dodano 1 studenata, a studenti {11} već postoje!");
                done();
            })
    })
    it('Dodavanje studenta sa istim indexom a razlicitom grupom nece napraviti novu grupu', function (done) {
        chai.request(server).post("/batch/student").set('content-type', 'application/json')
            .send({ csv: "a,a,12,grupaA\na,a,12,najnovijaGrupa" })
            .end(function (err, res) {
                db.grupa.findAll({ where: { nazivGrupe: "najnovijaGrupa" } }).then((pronadjena) => {
                    pronadjena.should.have.lengthOf(0);
                    res.should.have.status(200);
                    res.body.status.should.eql("Dodano 1 studenata, a studenti {12} već postoje!");
                }).then(()=>done());
            })
    })
})
