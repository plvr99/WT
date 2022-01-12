let assert = chai.assert;
describe('VjezbeAjax', function () {
  describe('dodajInputPolja()', function () {
    it('Broj input polja je 0', function () {
      let div = document.getElementById("zadaci");
      vjezbeAjax.dodajInputPolja(div, 0);
      let brojPolja = div.children.length;
      div.innerHTML = '';
      assert.equal(0, brojPolja, 'Broj polja je nula!');
    });
    it('Broj input polja 2', function () {
      let div = document.getElementById("zadaci");
      vjezbeAjax.dodajInputPolja(div, 2);
      setTimeout(() => {
        let brojPolja = div.children[0].children.length;
        div.innerHTML = '';
        //brojimo elemente u formi (label, br, input);
        assert.equal(9, brojPolja, 'Broj polja nije nula!');
      }, 100)

    });
  });

  chai.should();
  describe('posaljiPodatke()', function () {
    beforeEach(function () {
      this.xhr = sinon.useFakeXMLHttpRequest();

      this.requests = [];
      this.xhr.onCreate = function (xhr) {
        this.requests.push(xhr);
      }.bind(this);
    });

    afterEach(function () {
      this.xhr.restore();
    });
    it('Salju se podaci iz DOM objekta', function (done) {
      let data = { "brojVjezbi": 4, "brojZadataka": [1, 2, 3, 4] };
      let dataJson = JSON.stringify(data);
      let forma = document.createElement("form");
      for (let i = 0; i < data.brojZadataka.length; i++) {
        input = document.createElement("input");
        input.value = data.brojZadataka[i];
        forma.appendChild(input);
      }
      vjezbeAjax.posaljiPodatke(forma, function (err, data) {
        assert.equal(err, null, 'Nema errora');
        assert.exists(data);
        done();
      });
      //this.requests[0].requestBody.should.equal(forma);
      this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
    });
    it('Neispravni podaci 1', function (done) {
      let niz = [100, 200, 3, -4, 5, 6, 8];
      let errData = { status: "error", data: "Pogrešan parametar z0,z1,z3" };
      let dataJson2 = JSON.stringify(errData);
      let forma = document.createElement("form");
      for (let i = 0; i < niz.length; i++) {
        input = document.createElement("input");
        input.value = niz[i];
        forma.appendChild(input);
      }
      vjezbeAjax.posaljiPodatke(forma, function (err, data) {
        assert.equal(err, 'Pogrešan parametar z0,z1,z3', 'Neispravni podaci');
        assert.deepEqual(data, null, 'Neispravni podaci');
        done();
      });
      this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson2);
    });
    it('Neispravni podaci 2', function (done) {
      let niz = [1, 2, 3, -4, 5, 6];
      let errData = { status: "error", data: "Pogrešan parametar z3" };

      let dataJson2 = JSON.stringify(errData);
      let forma = document.createElement("form");
      for (let i = 0; i < niz.length; i++) {
        input = document.createElement("input");
        input.value = niz[i];
        forma.appendChild(input);
      }
      vjezbeAjax.posaljiPodatke(forma, function (err, data) {
        assert.equal(err, 'Pogrešan parametar z3', 'Neispravni podaci');
        assert.deepEqual(data, null, 'Neispravni podaci');
        done();
      });
      this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson2);
    });
  });

  describe('dohvatiPodatke()', function () {
    beforeEach(function () {
      this.xhr = sinon.useFakeXMLHttpRequest();

      this.requests = [];
      this.xhr.onCreate = function (xhr) {
        this.requests.push(xhr);
      }.bind(this);
    });

    afterEach(function () {
      this.xhr.restore();
    });
    it("metoda ispravno vraca vjezbe", function (done) {
      var data = {brojVjezbi: 3,brojZadataka: [1, 2, 3]};
      var dataJson = JSON.stringify(data);
      vjezbeAjax.dohvatiPodatke((err, podaci) => {
        podaci.should.deep.equal(data);
        done();
      });
      this.requests[0].respond(200, { "Content-Type": "text/json" }, dataJson);
    });
    it("dolazi do greske prilikom citanja podataka", function () {
      var data = {status:"error", data:"Greska prilikom citanja podataka"};
      var dataJson = JSON.stringify(data);
      vjezbeAjax.dohvatiPodatke((err, dat) => {
        err.should.deep.equal(data);
        //done();
      });
      this.requests[0].respond(404, { "Content-Type": "text/json" }, dataJson);
    });
  });
  describe('iscrtajVjezbe()', function () {
    it('Dodaju se vjezbe', function () {
      let div = document.getElementById("odabirVjezbe");

      let objekat = { brojVjezbi: 2, brojZadataka: [1, 2] };
      vjezbeAjax.iscrtajVjezbe(div, objekat);

      let brojPolja = div.children.length;
      div.innerHTML = '';
      assert.equal(2, brojPolja, 'Broj vjezbi na formi je 2!');
    });

  });
  describe('iscrtajZadatke()', function () {
    it('zadaci se pojavljuju', function () {
      let div = document.createElement('listaZadataka');
      div.innerHTML='';
      vjezbeAjax.iscrtajZadatke(div, 5);
      let brojPolja = div.children[0].children.length; //ul ima children li
      div.innerHTML = '';
      assert.equal(5, brojPolja, 'Broj zadataka je 5');
  });
  it('0 zadataka nacrtano', function () {
      let div = document.createElement('zadaci');

      vjezbeAjax.iscrtajZadatke(div, 0);
      let brojPolja = div.children.length;
      div.innerHTML = '';
      assert.equal(1, brojPolja, 'Broj zadataka je 0');
  });
  });

});