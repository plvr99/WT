const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const db = require('./db.js');
db.sequelize.sync({ force: true }).then(function () {
    console.log("Inicijalizacija baze zavrsena!");
    //process.exit();
});

app.use(express.static('public'));
app.use(express.static('public/html'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function is_numeric(str) {
    return /^\d+$/.test(str);
}
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

//ispraviti
function dohvatiVjezbeIzadatkeIzBaze() {
    let brojVjezbi = 0;
    let brojZadataka = [];
    let listaPromisa = []
    return new Promise(resolve => {
        db.vjezba.findAll().then(vjezbe => {
            vjezbe = vjezbe.sort((a, b) => {
                return a.nazivVjezbe.localeCompare(b.nazivVjezbe);
            });
            brojVjezbi = vjezbe.length;
            for (let i = 0; i < vjezbe.length; i++) {
                listaPromisa.push(
                    db.zadatak.findAll({ where: { VjezbaId: vjezbe[i].id } }).then(zadaci => {
                        brojZadataka.push(zadaci.length);
                    })
                );
            }
        }).then(() => {
            Promise.all(listaPromisa).then(() => {
                resolve({ brojVjezbi, brojZadataka })
            });
        })
    })
}

app.get("/vjezbe", function (req, res) {
    /*fs.readFile("./public/data/vjezbe.csv", function (err, data) {
        if (err) {
            res.status(404).json({ status: "error", data: "Greska prilikom citanja podataka" })
        }
        podaci = data.toString('utf8') //.split(/[\r\n]+/)[0]// POPRAVITI KASNIJE
        console.log(podaci)
        podaci = podaci.split(",");
        console.log(podaci);

        let brojVjezbi = podaci[0];
        let brojZadataka = [];
        console.log(brojVjezbi)
        for (let index = 1; index < podaci.length; index++) {
            brojZadataka.push(podaci[index]);
        }

        let greske = []
        if (brojVjezbi > 14 || brojVjezbi < 1) greske.push("brojVjezbi");
        for (let index = 0; index < brojZadataka.length; index++) {
            if (!is_numeric(brojZadataka[index])) {
                greske.push("z" + index);
                continue;
            }
            if (brojZadataka[index] < 0 || brojZadataka[index] > 9) greske.push("z" + index);
        }
        if (brojZadataka.length != brojVjezbi) greske.push("brojZadataka");
        console.log(greske);
        console.log("array " + greske.length);
        if (greske.length != 0) {
            let errorMessage = "Pogrešan parametar ";

            for (let index = 0; index < greske.length; index++) {
                if (index == 0) errorMessage += greske[index];
                else errorMessage += "," + greske[index];
            }
            res.status(404).json({ status: "error", data: errorMessage });
        }
        else {
            res.status(200).json({ brojVjezbi, brojZadataka });
        }
    });*/
    dohvatiVjezbeIzadatkeIzBaze().then((rezultat) => {
        res.status(200).json({ brojVjezbi: rezultat.brojVjezbi, brojZadataka: rezultat.brojZadataka });
    })
});
//ispraviti
function napraviVjezbe(brojVjezbi, brojZadataka) {
    return new Promise(resolve => {
        let vjezbe = [];
        let listaPromisa = [];
        let zadaci = [];
        //db.zadatak.destroy({ truncate : true, cascade: false })
        db.zadatak.destroy({ where: {}, truncate: true, cascade: false }).then(() => {
            db.vjezba.destroy({ where: {}, trucnate: true, cascade: false });
        }).then(() => {
            for (let i = 0; i < brojVjezbi; i++) {
                vjezbe.push("Vjezba " + (i + 1));
                listaPromisa.push(
                    db.vjezba.create({ nazivVjezbe: vjezbe[i] }).then((novaVjezba) => {
                        zadaci = [];
                        for (let j = 0; j < brojZadataka[i]; j++) {
                            zadaci.push({ nazivZadatka: "Zadatak " + (j + 1) });
                        }
                        db.zadatak.bulkCreate(zadaci).then((kreiraniZadaci) => {
                            novaVjezba.setZadaciVjezbe(kreiraniZadaci);
                        })
                    })
                )
            }
        }).then(() => resolve());
    })

}
app.post("/vjezbe", function (req, res) {
    console.log(req.body);
    let brojVjezbi = req.body['brojVjezbi'];
    let brojZadataka = req.body['brojZadataka'];

    let greske = []
    if (brojVjezbi > 14 || brojVjezbi < 1) greske.push("brojVjezbi");
    for (let index = 0; index < brojZadataka.length; index++) {
        if (!is_numeric(brojZadataka[index])) {
            greske.push("z" + index);
            continue;
        }
        if (brojZadataka[index] < 0 || brojZadataka[index] > 9) greske.push("z" + index);
    }
    if (brojZadataka.length != brojVjezbi) greske.push("brojZadataka");
    console.log(greske);
    console.log("array " + greske.length);
    if (greske.length != 0) {
        let errorMessage = "Pogrešan parametar ";

        for (let index = 0; index < greske.length; index++) {
            if (index == 0) errorMessage += greske[index];
            else errorMessage += "," + greske[index];
        }
        res.json({ status: "error", data: errorMessage });
    }
    else {
        let novalinija = brojVjezbi + ",";
        for (let index = 0; index < brojZadataka.length; index++) {
            if (index == 0) novalinija += brojZadataka[index];
            else novalinija += "," + brojZadataka[index];
        }
        napraviVjezbe(brojVjezbi, brojZadataka).then(() => {
            res.status(200).json({ brojVjezbi, brojZadataka });
        })
        /*fs.writeFile("./public/data/vjezbe.csv", novalinija, function (err) {
            if (err) throw err;
            res.status(200).json({ brojVjezbi, brojZadataka });
        });*/

    }
});
app.post("/unosVjezbi", function (req, res) {
    let brojVjezbi = req.body.brojVjezbi;
    htmlText = "<form id=\"forma\">";
    for (let index = 0; index < brojVjezbi; index++) {
        htmlText += "<label for=\"z" + index + "\">" + "z" + index + "</label><br>"
        htmlText += "<input type=\"text\" id=\"z" + index + "\" name=\"z" + index + "\" value=\"4\"><br>"
    }
    htmlText += "<input type=\"button\" value=\"Posalji\" onclick=\"pozivPosaljiPodatke(document.forms.forma)\"></form>";
    console.log(htmlText);
    //res.setHeader({'Access-Control-Allow-Origin': '*'})
    res.status(200).send(htmlText);
});

//spirala 4 
function kreiranjeStudenta(noviStudent) {
    return new Promise((resolve, reject) => {
        db.student.findAll({
            where: {
                index: noviStudent.index
            }
        }).then((student) => {
            console.log(student[0])
            if (student[0]) {
                reject({ status: "Student sa indexom " + student[0].index + " već postoji!" })
            }
            else {
                db.grupa.findOrCreate({
                    where: {
                        nazivGrupe: noviStudent.grupa,
                    }
                }).then((grupa) => {
                    db.student.create({ ime: noviStudent.ime, prezime: noviStudent.prezime, index: noviStudent.index, grupa: noviStudent.grupa })
                        .then((novi) => {
                            grupa[0].addStudentiGrupe([novi])
                                .then(() => resolve({ status: "Kreiran student!" }));
                        });
                })
            }
        })
    });
}
app.post("/student", function (req, res) {
    let noviStudent = req.body;
    function handleKreiran(message) {
        res.status(200).json({ status: message.status });
    }
    function handleNijeKreiran(message) {
        res.status(200).json({ status: message.status });
    }
    kreiranjeStudenta(noviStudent).then(handleKreiran, handleNijeKreiran);

});
function promjenaGrupeStudenta(index, grupa) {
    return new Promise((resolve, reject) => {
        /*db.grupa.findOrCreate({
            where: {
                nazivGrupe: grupa,
            }
        }).then((grupa) => {
            grupa = grupa[0];
            db.student.findAll({ where: { index: index } }).then((student) => {
                student = student[0];
                if (!student) {
                    reject({ status: "Student sa indexom " + index + " ne postoji" });
                }
                grupa.removeStudentiGrupe(student).then(() => {
                    grupa.addStudentiGrupe(student).then(() => resolve({ status: "Promjenjena grupa studentu " + index }))
                })
            })
        })
    });*/
        db.student.findAll({ where: { index: index } }).then((student) => {
            student = student[0];
            if (!student) {
                reject({ status: "Student sa indexom " + index + " ne postoji" });
            }
            else {
                db.grupa.findOrCreate({
                    where: {
                        nazivGrupe: grupa,
                    }
                }).then((grupa) => {
                    grupa = grupa[0];
                    db.student.update({ grupa: grupa.nazivGrupe }, { where: { id: student.id } });
                    grupa.addStudentiGrupe(student).then(() => resolve({ status: "Promjenjena grupa studentu " + index }));
                });
            }
        });
    });
}
app.put("/student/:index", function (req, res) {
    var index = req.params.index;
    let grupa = req.body.grupa;
    console.log("aaa" + index + " " + grupa);
    function handlePromijenjen(message) {
        res.status(200).json(message);
    }
    function handleNijePromijenjen(message) {
        console.log(message);
        res.status(404).json(message)
    }
    promjenaGrupeStudenta(index, grupa).then(handlePromijenjen, handleNijePromijenjen);

});
function obradaCSVTexta(csvText) {
    let ispravniStudenti = [];
    let studentiTextArray = csvText.split(/[\r\n]+/);
    for (let i = 0; i < studentiTextArray.length; i++) {
        let studentText = studentiTextArray[i].split(",");
        if (studentText.length != 4) continue; //preskacemo podatak ako nema svih polja
        if (isBlank(studentText[0] || isBlank(studentText[1] || !is_numeric(studentText[2] || isBlank(studentText[3]))))) continue;
        ispravniStudenti.push({ ime: studentText[0], prezime: studentText[1], index: studentText[2], grupa: studentText[3] });
    }
    return ispravniStudenti;
}

app.post("/batch/student", function (req, res) {
    let brojKreiranihStudenata = 0;
    let failedStudentiIndex = [];
    let listaPromisa = []
    function handleKreiran(message) {
        brojKreiranihStudenata++;
    }
    function handleNijeKreiran(message) {
        //message je poruka sa brojem indeksa 
        let matches = message.status.match(/\d+/g);
        console.log("match " + matches);
        failedStudentiIndex.push(matches);
    }
    let csv = req.body.csv;
    studenti = obradaCSVTexta(csv);
    console.log(studenti);
    for (let i = 0; i < studenti.length; i++) {
        listaPromisa.push(kreiranjeStudenta(studenti[i]).then(handleKreiran, handleNijeKreiran));
    }
    Promise.all(listaPromisa).then(() => {
        console.log(brojKreiranihStudenata)
        console.log(failedStudentiIndex)
        let statusMessage = "Dodano " + brojKreiranihStudenata + " studenata";
        if (failedStudentiIndex.length != 0) {
            statusMessage += ", a studenti {" + failedStudentiIndex[0];
            for (let i = 1; i < failedStudentiIndex.length; i++) {
                statusMessage += "," + failedStudentiIndex[i];
            }
            statusMessage += "} već postoje";
        }
        statusMessage += "!";
        res.status(200).json({ status: statusMessage });
    })
    //res.status(200).json({status:"Dodano " + kreiraniStudenti +"studenata"});
});

let server = app.listen(3000);
module.exports = server;
