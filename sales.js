const mongoose = require("mongoose")

const salesSchema = mongoose.Schema(
    {
        countryid:Number,
        category:String
    }
)

module.exports = mongoose.model("Sales",salesSchema)