const Flight = require('../models/flight');

module.exports = {
    create
}

function create(req, res){
    console.log(req.body, ' info on creating the review')
    console.log(req.params.id, ' movie id that we are writing the review for')
    // First step is we have to find the movie we want to add the
    // review too
    Flight.findById(req.params.id, function(err, flight){
        console.log(movie, ' this is the movie document')
        flight.destinations.push(req.body); // add the review to the reviews array
        flight.save(function(err){
            res.redirect(`/flights/${flight._id}`)
        })
    })    
}