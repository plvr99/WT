const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.static('public/html'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function is_numeric(str){
    return /^\d+$/.test(str);
}
app.get("/test.html", function(req,res){
    res.sendFile(__dirname + "/public/html/test.html");
});
app.get("/vjezbe", function (req, res) {
    fs.readFile("./public/data/vjezbe.csv", function(err, data){
        if(err) throw err;
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
        
        let greske =[]
        if(brojVjezbi > 14 || brojVjezbi < 1 ) greske.push("brojVjezbi");
        for (let index = 0; index < brojZadataka.length; index++) {
            if(!is_numeric(brojZadataka[index])) {
                greske.push("z"+index);
                continue;
            }
            if( brojZadataka[index] <0 || brojZadataka[index] >9 ) greske.push("z"+index);
        }
        if(brojZadataka.length != brojVjezbi) greske.push("brojZadataka");
        console.log(greske);
        console.log("array " + greske.length);
        if( greske.length != 0 ){
            let errorMessage= "Pogrešan parametar ";
            
            for (let index = 0; index < greske.length; index++) {
                if(index == 0) errorMessage += greske[index];
                else errorMessage += "," + greske[index];
            }
            res.status(500).send({status:"error", data: errorMessage});
        }
        else{
        res.status(200).send({brojVjezbi, brojZadataka});
        }
   });
});
app.post("/vjezbe", function(req, res){
    console.log(req.body);
    let brojVjezbi = req.body['brojVjezbi'];
    let brojZadataka = req.body['brojZadataka'];
    
    let greske =[]
    if(brojVjezbi > 14 || brojVjezbi < 1 ) greske.push("brojVjezbi");
    for (let index = 0; index < brojZadataka.length; index++) {
        if(!is_numeric(brojZadataka[index])) {
            greske.push("z"+index);
            continue;
        }
        if( brojZadataka[index] <0 || brojZadataka[index] >9 ) greske.push("z"+index);
    }
    if(brojZadataka.length != brojVjezbi) greske.push("brojZadataka");
    console.log(greske);
    console.log("array " + greske.length);
    if( greske.length != 0 ){
        let errorMessage= "Pogrešan parametar ";
        
        for (let index = 0; index < greske.length; index++) {
            if(index == 0) errorMessage += greske[index];
            else errorMessage += "," + greske[index];
        }
        res.send({status:"error", data: errorMessage});
    }
    else{
        let novalinija= brojVjezbi+",";
        for (let index = 0; index < brojZadataka.length; index++) {
            if(index== 0 ) novalinija += brojZadataka[index];
            else novalinija += "," +brojZadataka[index];
        }
        
        fs.writeFile("./public/data/vjezbe.csv", novalinija , function(err){
            if(err) throw err;
            res.status(200).send({brojVjezbi, brojZadataka});
        });
    }
});
app.post("/unosVjezbi", function(req, res){
    let brojVjezbi = req.body.brojVjezbi;
    htmlText="<form id=\"forma\">";
    for (let index = 0; index < brojVjezbi; index++) {
        htmlText +="<label for=\"z"+index+"\">"+"z"+index+"</label><br>"
        htmlText +="<input type=\"text\" id=\"z"+index+"\" name=\"z"+index+"\" value=\"4\"><br>"
    }
    htmlText+="</form><input type=\"button\" value=\"Posalji\" onclick=\"pozivPosaljiPodatke(document.forms.forma)\">";
    console.log(htmlText);
    //res.setHeader({'Access-Control-Allow-Origin': '*'})
    res.status(200).send(htmlText);
});
app.listen(3000);