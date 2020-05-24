const Flight = require('../models/flight');

module.exports = {
    create
}

function create(req, res){
    Flight.findById(req.params.id, function(err, flight){
        console.log('flight ID: ', flight._id)
        flight.destinations.push(req.body);
        flight.save(function(err) {
            if (err) return res.render(`flights/${flight._id}`);
            console.log(flight);
            res.redirect(`/flights/${flight._id}`);
        })
    })    
}
