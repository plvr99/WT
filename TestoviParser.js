let TestoviParser = (function () {
    const dajTacnost = function (JSONString) {
        try {
            let obj = JSON.parse(JSONString);
            let brojTestova = obj.stats.tests;
            let brojTacnih = obj.stats.passes;
            console.log(brojTestova + "   " + brojTacnih);
            let procenat = (brojTacnih / brojTestova) *100;
            procenat = Math.round(procenat*10) /10;
            let netacni = [];
            if(brojTestova-brojTacnih > 0){
                netacni = obj.failures.map(x=>x.fullTitle);
            }
            console.log({tacnost: procenat+"%" , greske: netacni});
            return {tacnost: procenat+"%" , greske: netacni};
        } catch (error) {
            console.log({tacnost: "0%" , greske: "Testovi se ne mogu izvršiti"});
            return {tacnost: "0%" , greske: "Testovi se ne mogu izvršiti"};
        }
    }
    /*x = (broj testova koji padaju u rezultatu1 a ne pojavljuju se u rezultatu2 + broj testova koji 
        padaju u rezultatu2)/(broj testova koji padaju u rezultatu1 a ne pojavljuju se u rezultatu2 + broj testova u rezultatu2)*100.*/
    const porediRezultate = function (rezultat1, rezultat2){
        try{
        let obj1 = JSON.parse(rezultat1);
        let obj2 = JSON.parse(rezultat2);
        let failures1= obj1.failures;
        let failures2 = obj2.failures;
        let difference1 = failures1.filter(x => !obj2.tests.includes(x)).map(x => x.fullTitle);
        let difference2 = failures2.filter(x => !failures1.includes(x)).map(x => x.fullTitle);

        difference1.sort();
        difference2.sort();

        for(let i = 0; i < obj1.tests.length; i++){
            if (obj2.tests.find(element => element.title == obj1.tests[i].title) == undefined){
                let x = (difference1.length + failures2.length) / (difference1.length + obj2.tests.length) *100; 
                x = Math.round(x*10) /10;
                console.log(difference1);
                console.log(difference2);
                var arr = difference1.concat(difference2);
                console.log(arr);
                return {promjena: x+"%", greske : arr };
            }
        }

        let brojTestova = obj2.stats.tests;
        let brojTacnih = obj2.stats.passes;
        let procenat = (brojTacnih / brojTestova) *100;
        procenat = Math.round(procenat*10) /10;
        failures2 = failures2.map(x => x.fullTitle);
        failures2.sort();
        return {promjena: procenat+"%" , greske: failures2 };
    }catch(error){
        return {promjena: "0%", greske: "Testovi se ne mogu izvršiti"}
    }

    }
    return {
        dajTacnost: dajTacnost,
        porediRezultate : porediRezultate
    }
 }());
 
 
 