let studentAjax = (function (){
    function dodajStudenta(student, fnCallback){
        let ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3000/student", true);
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(ajax.responseText)
                console.log("response; " + ajax.responseText)
                if(response.status != "Kreiran student!") fnCallback(response.status, null);
                else fnCallback(null, response.status);
                
            }
        }
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(student));
    }
    function postaviGrupu(index,grupa,fnCallback){
        let ajax = new XMLHttpRequest();
        ajax.open("PUT", "http://localhost:3000/student/"+index, true);
        let response;
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                response = JSON.parse(ajax.responseText)
                fnCallback(null, response.status);
            }
            if(this.status ==404){
                response = JSON.parse(ajax.responseText)
                fnCallback(response.status, null);
            }
        }
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify({grupa: grupa}));
    }
    function dodajBatch(csvStudenti,fnCallback){
        let ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3000/batch/student", true);
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(ajax.responseText)
                console.log("response; " + response.status)
                fnCallback(null, response.status);
                
            }
        }
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify({csv : csvStudenti}));
    }
    return{
        dodajStudenta : dodajStudenta,
        postaviGrupu : postaviGrupu,
        dodajBatch : dodajBatch
    }
}());