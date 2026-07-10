//201 // created successfully
//200 // fetched, updated, or deleted successfully
//404 // item not found
//500 // server/database error
//400 // bad user input

const restaurant = require("../models/restaurant");

 const restaurantCreate = async (req, res) =>{
 try { const createRestaurant = await restaurant.create(req.body);
       res.status(201).json(createRestaurant)
    
 } catch (error) {res.status(500).json({Message: error.Message})
    
 }
}

 const restaurantFind = async (req, res) =>{
 try { const findRestaurant = await restaurant.find();
       res.status(200).json(findRestaurant)
    
 } catch (error) {res.status(500).json({Message: error.Message})
    
 }
}

 const restaurantFinds = async (req, res) =>{
 try { const findsRestaurant = await restaurant.findById(req.params.id);
       res.status(200).json(findsRestaurant)
    
 } catch (error) {res.status(500).json({Message: error.Message})
    
 }
}

 const restaurantUpdate = async (req, res) =>{
 try { const updateRestaurant = await restaurant.findAndUpdate(req.params.id);
       res.status(200).json(updateRestaurant)
    
 } catch (error) {res.status(500).json({Message: error.Message})
    
 }
}

 const restaurantDelete = async (req, res) =>{
 try { const deleteRestaurant = await restaurant.findAndDelete(req.params.id);
       res.status(200).json(deleteRestaurant)
    
 } catch (error) {res.status(500).json({Message: error.Message})
    
 }
}
module.exports = {restaurantCreate, restaurantFind, restaurantFinds, restaurantUpdate, restaurantDelete};