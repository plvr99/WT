const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/vjezbe", function (req, res) {
    fs.readFile("./public/data/vjezbe.csv", function(err, data){
        if(err) throw err;
        podaci = data.toString('utf8').split(",");
        let brojVjezbi = podaci[0];
        let brojZadataka = [];
        for(let i = 1; i < brojVjezbi; i++){
            brojZadataka.push(podaci[i]);
        }
        res.status(200).send({brojVjezbi, brojZadataka});
   });
});
app.listen(3000);