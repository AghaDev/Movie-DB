const express = require("express");
const app = express();
const port = 3000;
const movies = 
    [{ title: 'Jaws', year: 1975, rating: 8, id:1},
    { title: 'Avatar', year: 2009, rating: 7.8, id:2},
    { title: 'Brazil', year: 1985, rating: 8, id:3},
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2, id:4}, ]

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

 app.get('/movies/get/id/:id', function(request, response){
    let id= parseInt(request.params.id);
    let movie= movies.find((movie)=> movie.id === id);
    if (!movie) {
       response.statues(404).send(`statues:${response.statusCode}, message: the movie ${id} does not exist,`,);
     } else {
       response.send(movie);
     }
 });

 app.get('/movies/add', (request, response) => {
    const title = request.query.title;
    const year = request.query.year;
    let rating = request.query.rating;
  
    if (!title || !year || year.length !== 4 || isNaN(year)) {
      response.status(403).json({
        status: 403,
        error: true,
        message: 'you cannot create a movie without providing a title and a year',
      });
    } else {
      if (!rating || isNaN(rating)) {
        rating = 4;
      }
  
      const newMovie = { title, year: parseInt(year), rating: parseFloat(rating) };
      movies.push(newMovie);
  
      response.status(200).json({ status: 200, data: movies });
    }
  });
  let length=movies.length-1;
  console.log();


  app.delete('/movies/delete/:id', (request, response) => {
    const movieId = parseInt(request.params.id);
    const i = movies.findIndex((movie) => movie.id === movieId);
  
    if (i!== -1) {
      movies.splice(i, 1);
      res.status(200).json({ status: 200, data: movies });
    } else {
      res.status(404).json({
        status: 404,
        error: true,
        message: `The movie with ID ${movieId} does not exist`,
      });
    }
  });

  app.put('/movies/update/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const { title: newTitle, rating: newRating } = req.query;
  
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);
  
    if (movieIndex !== -1) {
      const movie = movies[movieIndex];
  
      if (newTitle) {
        movie.title = newTitle;
      }
  
      if (newRating) {
        movie.rating = parseFloat(newRating);
      }
  
      res.status(200).json({ status: 200, data: movies });
    } else {
      res.status(404).json({
        status: 404,
        error: true,
        message: `The movie with ID ${movieId} does not exist`,
      });
    }
  });