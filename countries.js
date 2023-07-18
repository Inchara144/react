const mongoose = require("mongoose")

const countriesSchema = mongoose.Schema(
    {
        name:String,
        countryid:Number
    }
)

module.exports = mongoose.model("Countries",countriesSchema)