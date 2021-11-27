let assert = chai.assert;
let data = Data.stringovi();
  
describe('TestoviParser', function() {
 describe('dajTacnost()', function() {
   
   it("Svi testovi padaju", function(){
       let result = TestoviParser.dajTacnost(data.sviNetacni);

       assert.equal(result.tacnost, "0%");
       assert.equal(result.greske.length, 2);
   });
   it('Svi testovi prolaze', function() {
    let result = TestoviParser.dajTacnost(data.sviTacniString);
   
    assert.equal(result.tacnost, "100%");
    assert.equal(result.greske.length, 0);
  });
   it("Trecina testova prolazi (jedan test prolazi)", function(){
       let result = TestoviParser.dajTacnost(data.trecina);

       assert.equal(result.tacnost, "33.3%");
       assert.equal(result.greske.length, 2);
   })
   it('String koji je proslijeđen funkciji nije ispravan' ,function(){
    let result = TestoviParser.dajTacnost(data.netacanJSONstring);

    assert.equal(result.tacnost, "0%");
    assert.equal(result.greske, "Testovi se ne mogu izvršiti");
   })
   it("Dvije trecine testova prolazi", function(){
    let result = TestoviParser.dajTacnost(data.dvijeTrecine);

    assert.equal(result.tacnost, "66.7%");
    assert.equal(result.greske.length, 1);
})
 });
 describe('porediRezultate()' ,function(){
    it("Isti nazivi, svi testovi padaju", function(){
        let result = TestoviParser.porediRezultate(data.sviTacniString, data.sviNetacni);
        assert.equal(result.promjena, "0%");
        assert.equal(result.greske.length, 2);
    });
    it("Isti nazivi, svi testovi prolaze", function(){
        let result = TestoviParser.porediRezultate(data.sviTacniString, data.sviTacniString);
        assert.equal(result.promjena, "100%");
        assert.equal(result.greske.length, 0);
    });
    it("Imamo razliku u oba rezultata", function(){
        let result = TestoviParser.porediRezultate(data.trecina, data.dvijeTrecine);
        //(2+1) / (2+3)
        assert.equal(result.promjena, "60%");
        assert.equal(result.greske.length, 3);
        assert.equal(result.greske[0], "Tabela crtaj() AA");
        assert.equal(result.greske[2], "Tabela crtaj() BB");
    });
    it("JSON string nije ispravan", function(){
        let result = TestoviParser.porediRezultate(data.netacanJSONstring, data.sviTacniString);
        assert.equal(result.promjena, "0%");
        assert.equal(result.greske, "Testovi se ne mogu izvršiti");
        
    });
 });
});
