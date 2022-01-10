
function pozivDohvatiPodatke(){
    vjezbeAjax.dohvatiPodatke(function (err,data) {
        console.log(err);
        console.log(data);
       // if(err) return;
        el = document.getElementById('odabirVjezbe');
        vjezbeAjax.iscrtajVjezbe(el, data);
    });
}

function pozivCrtajZadatke(DOMelement, brojZadataka){
    vjezbeAjax.iscrtajZadatke(DOMelement, brojZadataka);
}