const express = require("express");
const app = express();
const port = 3000;
const movies = 
    [{ title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }]

const listOfMovies = (movies) => 
{
    let list=''
    for (let i = 0; i < movies.length; i++){
        list += movies[i].title + " , "
    }
    return list;
}


app.get("/", (request, response) => {
    response.send("ok");
});

app.get("/test", (request, response) => {
    response.send(" {status:200, message:'ok'}");
});

var time = new Date().getHours()  + ":" + new Date().getMinutes()

console.log(time)
app.get("/time", (request, response) => {
    response.send(" {status:200, message:"+ time+ "}");
});

app.get('/hello/:ID', (request, response) => {
    const ID = request.params.ID;
    response.send(" {status:200, message: hello "+ ID+ "}");
});

app.get('/search', (request, response) => {

    const searchQuery = request.query.s;
  
    if(searchQuery)
    {
      res.send(" {status:200, message: hello "+ searchQuery+ "}");
    }
    else{res.send(" {status:500,error:true, message:'you have to provide a search'}")}
  });

  app.get("/movies/create", (request, response) => {
    response.send(" {status:200, message:'ok'}");
});


app.get("/movies/read", (request, response) => {
    response.send(" {status:200, data:"+listAllMovies(movies) +"}");
});


app.get("/movies/update", (request, response) => {
    response.send(" {status:200, message:'ok'}");
});


app.get("movies/delete", (request, response) => {
    response.send(" {status:200, message:'ok'}");
});

app.get('/movies/get/by-date', function(request, response){
    response.send(`status:${response.statusCode}, message: ${movies.sort((a, b)=>{return a.year - b.year}).map(e=>{return ` title: ${e.title}, year: ${e.year},rating: ${e.rating} ||`})}`);
 });
 app.get('/movies/get/by-rating', function(request, response){
    response.send(`status:${response.statusCode}, message: ${movies.sort((a, b)=>{return b.rating - a.rating}).map(e=>{return ` title: ${e.title}, year: ${e.year},rating: ${e.rating} ||`})}`);
 });
 app.get('/movies/get/by-title', function(request, response){
    response.send(`status:${reponse.statusCode}, message: ${movies.sort((a, b)=>{  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;if (a.title.toLowerCase() > b.title.toLowerCase()) return 1; return 0;}).map(e=>{return ` title: ${e.title}, year: ${e.year},rating: ${e.rating} ||`})}`);
 });