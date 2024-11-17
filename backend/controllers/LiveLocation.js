const Location = require("../models/Location");

const liveLocation = (ws) => {
    ws.on('message', async(message) => {
        try{
            const data = JSON.parse(message);
            const {helmetId, longitude, latitude} = data;
            const locationId = req.body.locationID || new mongoose.Types.ObjectId();

            const location = new Location({
                locationID: locationId,
                helmetID: helmetId,
                longitude,
                latitude,
                timestamp: Date.now(),
            });

            await location.save();

            ws.send(JSON.stringify({
                success: true, 
                message: "Live location saved successfully",
                locationID: locationId
            }));
        } catch(error){
            console.error("Error in saving live location: ", error);
            ws.send(JSON.stringify({
                error: "Error in saving live location"
            }));
        }
    });
};

module.exports = {liveLocation};
