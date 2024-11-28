const RRoute = require("../model/Route")
const axios = require("axios")

const createRoute = async (req, res) => {
    const {origins, destinations } = req.query;
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


module.exports = {createRoute, getAllRoutes, deleteRoute,getSingle}