const Flight = require('../models/flight');

module.exports = {
    create,
    delete: deleteDestination
}
function deleteDestination(req, res) {
    console.log(req.params)
    Flight.findById(req.params.id, function(err, flight){
        console.log("flight: ", flight)
        flight.destinations.id(req.params.did).remove();
        flight.save(function(err){
            console.log("subdoc was removed")
            res.redirect(`/flights/${flight._id}`)
        });
    });
}

function create(req, res){
    Flight.findById(req.params.id, function(err, flight){
        flight.destinations.push(req.body);
        flight.save(function(err){
            console.log(flight.destinations)
            res.redirect(`/flights/${flight._id}`)
        })
    })  
}

