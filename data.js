let Data =(function () {
    const stringovi = function(){
        return{
    sviTacniString: '{\
        "stats": {\
          "suites": 2,\
          "tests": 2,\
          "passes": 2,\
          "pending": 0,\
          "failures": 0,\
          "start": "2021-11-05T15:00:26.343Z",\
          "end": "2021-11-05T15:00:26.352Z",\
          "duration": 9\
        },\
        "tests": [\
          {\
            "title": "should draw 3 rows when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
            "file": null,\
            "duration": 1,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          },\
          {\
            "title": "should draw 2 columns in row 2 when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",\
            "file": null,\
            "duration": 0,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          }\
        ],\
        "pending": [],\
        "failures": [],\
        "passes": [\
          {\
            "title": "should draw 3 rows when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
            "file": null,\
            "duration": 1,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          },\
          {\
            "title": "should draw 2 columns in row 2 when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",\
            "file": null,\
            "duration": 0,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          }\
        ]\
      }\
      ',
    
       sviNetacni :'{\
        "stats": {\
          "suites": 2,\
          "tests": 2,\
          "passes": 0,\
          "pending": 0,\
          "failures": 2,\
          "start": "2021-11-05T15:00:26.343Z",\
          "end": "2021-11-05T15:00:26.352Z",\
          "duration": 9\
        },\
        "tests": [\
          {\
            "title": "should draw 3 rows when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
            "file": null,\
            "duration": 1,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          },\
          {\
            "title": "should draw 2 columns in row 2 when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",\
            "file": null,\
            "duration": 0,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          }\
        ],\
        "pending": [],\
        "failures": [\
            {\
              "title": "should draw 3 rows when parameter are 2,3",\
              "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
              "file": null,\
              "duration": 1,\
              "currentRetry": 0,\
              "speed": "fast",\
              "err": {}\
            },\
            {\
              "title": "should draw 2 columns in row 2 when parameter are 2,3",\
              "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",\
              "file": null,\
              "duration": 0,\
              "currentRetry": 0,\
              "speed": "fast",\
              "err": {}\
            }\
          ],\
        "passes": []\
      }',
    
       trecina : '{\
        "stats": {\
          "suites": 2,\
          "tests": 3,\
          "passes": 1,\
          "pending": 0,\
          "failures": 2,\
          "start": "2021-11-05T15:00:26.343Z",\
          "end": "2021-11-05T15:00:26.352Z",\
          "duration": 9\
        },\
        "tests": [\
          {\
            "title": "should draw 3 rows when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
            "file": null,\
            "duration": 1,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          },\
          {\
            "title": "should draw 2 columns in row 2 when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",\
            "file": null,\
            "duration": 0,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          },\
          {\
            "title": "ashould draw 2 AA",\
            "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",\
            "file": null,\
            "duration": 0,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          }\
        ],\
        "pending": [],\
        "failures": [\
            {\
              "title": "should draw 3 rows when parameter are 2,3",\
              "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
              "file": null,\
              "duration": 1,\
              "currentRetry": 0,\
              "speed": "fast",\
              "err": {}\
            },\
            {\
                "title": "ashould draw 2 AA",\
                "fullTitle": "Tabela crtaj() AA",\
                "file": null,\
                "duration": 0,\
                "currentRetry": 0,\
                "speed": "fast",\
                "err": {}\
              }\
          ],\
          "passes": [\
            {\
              "title": "should draw 3 rows when parameter are 2,3",\
              "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
              "file": null,\
              "duration": 1,\
              "currentRetry": 0,\
              "speed": "fast",\
              "err": {}\
            }\
          ]\
      }',
       netacanJSONstring :'{\
        "stats": {\
          "suites": 2,\
          "tests": {3,\
          "passes": 1,\
          "pending": [0,\
          "failures": 2,\
          "start": "2021-11-05T15:00:26.343Z",\
          "end": "2021-11-05T15:00:26.352Z",\
          "duration": 9\
        },\
        "tests": [\
          {\
            "title": "should draw 3 rows when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
            "file": null,\
            "duration": 1,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          },\
          {\
            "title": "should draw 2 columns in row 2 when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",\
            "file": null,\
            "duration": 0,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          }\
        ],\
        "pending": [],\
        "failures": [\
            {\
              "title": "should draw 3 rows when parameter are 2,3",\
              "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
              "file": null,\
              "duration": 1,\
              "currentRetry": 0,\
              "speed": "fast",\
              "err": {}\
            },\
            {\
              "title": "should draw 2 columns in row 2 when parameter are 2,3",\
              "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",\
              "file": null,\
              "duration": 0,\
              "currentRetry": 0,\
              "speed": "fast",\
              "err": {}\
            }\
          ],\
          "passes": [\
            {\
              "title": "should draw 3 rows when parameter are 2,3",\
              "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
              "file": null,\
              "duration": 1,\
              "currentRetry": 0,\
              "speed": "fast",\
              "err": {}\
            }\
          ]\
      }',
       dvijeTrecine: '{\
        "stats": {\
          "suites": 2,\
          "tests": 3,\
          "passes": 2,\
          "pending": 0,\
          "failures": 1,\
          "start": "2021-11-05T15:00:26.343Z",\
          "end": "2021-11-05T15:00:26.352Z",\
          "duration": 9\
        },\
        "tests": [\
          {\
            "title": "should draw 3 BB",\
            "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
            "file": null,\
            "duration": 1,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          },\
          {\
            "title": "should draw 2 columns in row 2 when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",\
            "file": null,\
            "duration": 0,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          },\
          {\
            "title": "should draw 3 rows when parameter are 2,3",\
            "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
            "file": null,\
            "duration": 1,\
            "currentRetry": 0,\
            "speed": "fast",\
            "err": {}\
          }\
        ],\
        "pending": [],\
        "failures": [\
            {\
                "title": "should draw 3 BB",\
                "fullTitle": "Tabela crtaj() BB",\
                "file": null,\
                "duration": 1,\
                "currentRetry": 0,\
                "speed": "fast",\
                "err": {}\
            }\
          ],\
        "passes": [\
            {\
              "title": "should draw 3 rows when parameter are 2,3",\
              "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",\
              "file": null,\
              "duration": 1,\
              "currentRetry": 0,\
              "speed": "fast",\
              "err": {}\
            },\
            {\
              "title": "should draw 2 columns in row 2 when parameter are 2,3",\
              "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",\
              "file": null,\
              "duration": 0,\
              "currentRetry": 0,\
              "speed": "fast",\
              "err": {}\
            }\
          ]\
      }'
    }
}
return{
    stringovi : stringovi
}
}());