
function pozivDohvatiPodatke(){
    vjezbeAjax.dohvatiPodatke(function (err,data) {
       // if(err) return;
        el = document.getElementById('odabirVjezbe');
        vjezbeAjax.iscrtajVjezbe(el, data);
    });
}

function pozivCrtajZadatke(DOMelement, brojZadataka){
    vjezbeAjax.iscrtajZadatke(DOMelement, brojZadataka);
}