const Flight = require('../models/flight');

module.exports = {
    create,
    delete: deleteDestination
}
function deleteDestination(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        flight.destinations.id(req.params.did).remove();
        flight.save(function(err){
            res.redirect(`/flights/${flight._id}`)
        });
    });
}

function create(req, res){
    Flight.findById(req.params.id, function(err, flight){
        flight.destinations.push(req.body);
        flight.save(function(err){
            res.redirect(`/flights/${flight._id}`)
        })
    })  
}

