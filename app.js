const express = require('express');
const session = require('express-session');
const app = express();
const ejs = require('ejs');
const port = 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    cookie: { maxAge: 60000 },
    saveUninitialized: true
}))
app.set('view engine','ejs');


app.listen(port,function(){
    console.log(`Serveur Express lancé sur le port : ${port}`)
})

const articles=[
    {
        titre: "Débuter avec Node.js",
        categorie: "Front-end"
    },
    {
        titre: "Débuter avec PHP",
        categorie: "Backend"
    },
    {
        titre: "Débuter avec Nyolo",
        categorie: "Front-end"
    },
    {
        titre: "Débuter avec Npouet",
        categorie: "Front-end"
    },
]


app.get('/', function(request, response) {


    const data = {articles:articles};
    response.render('pages/test',data);
});

app.get('/:nom', function(request, response) {
    const data = {
        nom: request.params.nom,
        articles:articles
    };
    response.render('pages/home',data);
});

app.use(function(request,response){
    response.status(404).send('Page inexistante')
});

