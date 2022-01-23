function dodavanjeStudenta(forma) {
    console.log(forma);
    var student = {}
    var formData = new FormData(forma);
    console.log(formData.values)
    for (var pair of formData.entries()) {
        student[pair[0]] = pair[1];
    }
    console.log(student);
    studentAjax.dodajStudenta(student, function(err,data){
        let ajaxstatus = document.getElementById('ajaxstatus');
        ajaxstatus.innerHTML=''
        let text = document.createElement("p");
        (err != null) ? text.innerText = err : text.innerText = data;
        ajaxstatus.appendChild(text);
    })
}

function promjenaGrupeZaStudenta(forma){
    let index= null;
    let grupa = null;
    var formData = new FormData(forma);
    for (var pair of formData.entries()) {
        if (pair[0] == "index") index = pair[1];
        if (pair[0] == "grupa") grupa = pair[1];
    }
    studentAjax.postaviGrupu(index, grupa, function(err,data){
        let ajaxstatus = document.getElementById('ajaxstatus');
        ajaxstatus.innerHTML=''
        let text = document.createElement("p");
        (err != null) ? text.innerText = err : text.innerText = data;
        ajaxstatus.appendChild(text);
    })
}

function posaljiBatchStudent(dataDOMelemt){
    let csvString = dataDOMelemt.value;
    studentAjax.dodajBatch(csvString, function(err, data){
        let ajaxstatus = document.getElementById('ajaxstatus');
        ajaxstatus.innerHTML=''
        let text = document.createElement("p");
        (err != null) ? text.innerText = err : text.innerText = data;
        ajaxstatus.appendChild(text);
    })
}