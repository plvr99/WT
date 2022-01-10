chai.should();
 
describe('VjezbeAjax', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
 
    this.requests = [];
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });
 
  afterEach(function() {
    this.xhr.restore();
  });
 
  it('should parse the fetched response data as JSON', function(done) {
    var data = { brojVjezbi: 8, brojZadataka : [4,3,2,1,2,3,4,5]};
    var dataJson = JSON.stringify(data);
   
    vjezbeAjax.dohvatiPodatke(function(err, result) {
      result.should.deep.equal(data);
      done();
    });
   
    this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
  });


  it('should parse the fetched response data as JSON', function(done) {
    var brojVjezbi=8;
    htmlText="<form id=\"forma\">";
    for (let index = 0; index < brojVjezbi; index++) {
        htmlText +="<label for=\"z"+index+"\">"+"z"+index+"</label><br>"
        htmlText +="<input type=\"text\" id=\"z"+index+"\" name=\"z"+index+"\" value=\"4\"><br>"
    }
    htmlText+="</form><input type=\"button\" value=\"Posalji\" onclick=\"pozivPosaljiPodatke(document.forms.forma)\">";
    vjezbeAjax.dodajInputPolja(document.getElementById('zadaci'), brojVjezbi);
    done();
    this.requests[0].respond(200, { 'Content-Type': 'text/html' }, htmlText);
  });

  it('test za ispravne podatke' , function(done){
    var data = { brojVjezbi: 8, brojZadataka : [4,4,4,4,4,4,4,4]};
    var dataJson = JSON.stringify(data);
    vjezbeAjax.posaljiPodatke(document.forms.forma,function (err, result) {
      result.should.deep.equal(data);
      done();
    })
    this.requests[0].respond(200, { 'Content-Type': 'text/html' }, dataJson);
  }); 
  
});