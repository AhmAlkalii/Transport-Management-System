const RRoute = require("../model/Route")
const axios = require("axios")


//If mode of transport and departure time not specifed 
const createRouteBaseFunc = async (req, res) => {
    const {origins, destinations } = req.body;
    const params = {
        origins,
        destinations,
        key : process.env.Distance_KEY
    }

    try{

        if(!origins || !destinations ||!params){
            throw new Error("Please check all feilds")
        }


        const response  = await axios.get('https://api.distancematrix.ai/maps/api/distancematrix/json', { params });
        const distance = response.data.rows[0].elements[0].distance.text;
        const duration = response.data.rows[0].elements[0].duration.text;
        

        console.log('Distance:', distance);  
        console.log('Duration:', duration); 
        if(!distance || !duration){
            throw new Error("No distance or duration check api")
        }
        

        const route = await RRoute.create({origins, destinations, duration, distance})

        return res.status(200).json(response.data); 

    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}


const createRouteExpanded = async (req, res) => {
    const {origins, destinations, departure_time } = req.body;

    //Tell frontend to convert the departuretime to utc before sending
    // const unixTimestamp = Math.floor(new Date(isoDate).getTime() / 1000);

    const params = {
        origins,
        destinations,
        departure_time,
        key : process.env.Distance_KEY
    }

    try{

        if(!origins || !destinations || !departure_time){
            throw new Error("Please check all feilds")
        }


        const response  = await axios.get('https://api.distancematrix.ai/maps/api/distancematrix/json', { params });
        const distance = response.data.rows[0].elements[0].distance.text;
        const duration = response.data.rows[0].elements[0].duration.text;
        

        console.log('Distance:', distance);  
        console.log('Duration:', duration); 
        if(!distance || !duration){
            throw new Error("No distance or duration check api")
        }
        

        const route = await RRoute.create({origins, destinations, duration, distance})

        console.log(response.data)
        return res.status(200).json(response.data); 

    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}



const getAllRoutes = async (req, res) => {
    const routes = await RRoute.find({}).sort({createdAt: -1})

    res.status(200).json(routes)
}

const getSingle = async (req, res) => {
    const {id} = req.params

    const routes = await RRoute.findById({_id: id})
    res.status(200).json({routes})
}

const deleteRoute  = async(req, res) => {
    const {id} = req.params

    try{
        const route = await RRoute.findByIdAndDelete({_id: id})

        res.status(204).json("Route Deleted✅")
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}


module.exports = {createRouteBaseFunc, createRouteExpanded, getAllRoutes, deleteRoute,getSingle}