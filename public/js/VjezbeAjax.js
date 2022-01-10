let vjezbeAjax = (function () {

    function dodajInputPolja(DOMelementDIVauFormi, brojVjezbi) {
        let ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3000/unosVjezbi", true);
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                DOMelementDIVauFormi.innerHTML = ajax.responseText;
            }
        }
        ajax.setRequestHeader("Content-Type", "application/json");
        //ajax.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
        //ajax.setRequestHeader('Access-Control-Allow-Origin', '*');
        ajax.send(JSON.stringify({ "brojVjezbi": brojVjezbi }));
    }

    function posaljiPodatke(vjezbeObjekat, callbackFja) {
        let ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3000/vjezbe", true);
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(ajax.responseText);
                let response = JSON.parse(ajax.responseText)
                let err = response.data;
                let data = null;
                if (err == null) data = response;
                callbackFja(err, data)
            }
        }
        var formData = new FormData(vjezbeObjekat);
        let brojZadataka = []
        console.log(formData.values)
        for (var pair of formData.entries()) {
            brojZadataka.push(pair[1]);
        }
        console.log("brojVjezbi " + brojZadataka.length + " broj zadataka " + brojZadataka)
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify({ brojVjezbi: brojZadataka.length, brojZadataka }));
    }

    function info(error, data) {
        console.log("data")
        console.log(data);
        console.log("error")
        console.log(error);
    }

    function dohvatiPodatke(callbackFja) {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "http://localhost:3000/vjezbe", true);
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(ajax.responseText)
                let err = response.data;
                let data = null;
                if (err == null) data = response;
                callbackFja(err, data);
            }
        }
        ajax.send();
    }
    function iscrtajVjezbe(divDOMelement, { brojVjezbi, brojZadataka }) {
        let htmlText = ""
        for (let index = 0; index < brojVjezbi; index++) {
            htmlText += "<div class = \"vjezba\"" +
                "onclick=\"pozivCrtajZadatke(document.getElementById('vjezba" + index + "'), " + brojZadataka[index] + ")\">" +
                "<h2>Vjezba </h2> <div class=\"zadaci\" id=\"vjezba" + index + "\" display=\"style:none\"></div> </div> "
        }
        divDOMelement.innerHTML = htmlText;
    }

    function iscrtajZadatke(vjezbaDOMelement, brojZadataka) {
        vjezbeZadaci = document.getElementsByClassName("zadaci")
        for (let i = 0; i < vjezbeZadaci.length; i++) {
            vjezbeZadaci[i].style.display = "none";
        }
        if (vjezbaDOMelement.innerHTML.length == 0) {
            let htmlText = "<ul>"
            for (let index = 0; index < brojZadataka; index++) {
                htmlText += "<li>Zadatak " + (index + 1) + "</li>"
            }
            htmlText += "</ul>"
            vjezbaDOMelement.innerHTML += htmlText;
        }
        vjezbaDOMelement.style.display = "block"
    }

    return {
        dodajInputPolja: dodajInputPolja,
        posaljiPodatke: posaljiPodatke,
        dohvatiPodatke: dohvatiPodatke,
        iscrtajVjezbe: iscrtajVjezbe,
        iscrtajZadatke: iscrtajZadatke
    }
}());