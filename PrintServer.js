var ptp = require('pdf-to-printer');
const pg        = require('pg');
const express   = require('express');
const app       = express();


app.use(express.static("public"));

const config = {
    user: 'postgres',
    database: 'postgres',
    password: '2624',
    port: 5432       
};

const pool = new pg.Pool(config);

app.get('/data', (req, res, next) => {
    pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query("SELECT * FROM printtest " + Fdate, function (err, result) {
            done(); 
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
       })
   })
});

console.log(Fdate)
var Fdate
function dateT(startdate,enddate){
   Fdate = "where job_date between '" + startdate + "' and '" + enddate + "'"
   console.log(Fdate)
}
app.get('/data/:date/:date2', (req, res) => {
    res.send('Id is'+req.params.date)
    var startdate=req.params.date
    console.log(startdate)
    var enddate=req.params.date2
    console.log(enddate)
    dateT(startdate,enddate)
  })


var myVar = setInterval(myTimer, 2000);
        function myTimer(){
pool.connect(function (err, client, done) {
    if (err) {
        console.log("Can not connect to the DB" + err);
    }
    client.query('SELECT * FROM printtest', function (err, result) {
         done();
         if (err) {
             console.log(err);
         }
         //console.log(result.rows)
         var t = result.rows;
                for (var y in t) {
                    var printname = result.rows[y].print_name;
                    var printfile = result.rows[y].print_file;
                    var printflat = result.rows[y].print_flat;
                    var jobnumber = result.rows[y].job_number;
                    client.query("UPDATE printtest SET print_flat = 1 WHERE job_number ="+ jobnumber)
                        const options = {
                            printer: printname
                        };
                        if (printflat == 0){
                            Cprint()
                        }
                        function Cprint(){
                        ptp
                            .print("//MSI/share/" + printfile, options)
                            .then(console.log)
                            .catch((error) => {
                                client.query("UPDATE printtest SET print_flat = 0 WHERE job_number ="+ jobnumber)
                            })
                        }
                }
    })
})
        }

var server = app.listen(8000, function () { 
	console.log('Server is listening at port 8000...'); 
}); 
