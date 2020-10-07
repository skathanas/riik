const express = require ('express');
const ejs = require ('ejs');
const app = express();
const axios = require ('axios');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// ütlen mis kausta võib kasutada
app.use(express.static('public'));
//?? kuidagi seotud selle views kaustaga
app.set('view engine', ejs);

app.get('/', (req, res) => {
    res.render('index.ejs', {countryIndex: ''}); 
    
});

app.post('/', (req, res) =>{
    let riik = req.body.riik;
    let url = 'https://restcountries.eu/rest/v2/name/' + riik + '?fullText=true';
    console.log(riik);
    axios.get(url)
    .then(function(response){
     // console.log(response.data[0]);
      let countryObject = response.data[0];
     
       
       res.render("index.ejs", {countryIndex: countryObject});
   //   res.write(`<p>${riikData.name} ${riikData.domain}</p>`);
//    res.write(`<p>${ccode} ${capital}</p>`);
  //     res.write(`<p>${region} ${sbregion}</p>`);
    //  res.write(`<p>${population} ${timezone}</p>`);
      // res.write(`<p>${cur1} ${cur2} ${cur3} </p>`);
       //res.write(`<p><img src=${flag}></p>`);
       
    })
    .catch(function(error){
        console.log(error);
    });

});
app.listen(3000, ()=>{
    console.log("server is running on port 3000");
});