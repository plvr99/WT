function pozivDodajInputPolja(DOMelementDIVauFormi, brojVjezbi) {
    vjezbeAjax.dodajInputPolja(DOMelementDIVauFormi, brojVjezbi)
}

function pozivPosaljiPodatke(vjezbeObjekat) {
    vjezbeAjax.posaljiPodatke(vjezbeObjekat, function (err, data) {
        if (err) alert(err);
        else alert('Uspjesno unesene vjezbe')
    });
}