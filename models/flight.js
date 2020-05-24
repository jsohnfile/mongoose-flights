const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const destinationSchema = new Schema({
    dairport: {
        type: String,
        enum: ['AUS','DFW', 'DEN', 'LAX', 'SAN']
    },
    arrivals: Date
})

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['United', 'American', 'Southwest']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: function() {
            return 'DEN'
        }
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            const departDate = new Date();
            return departDate.setFullYear(departDate.getFullYear() + 1);
        }
    },
    destinations: [destinationSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema)