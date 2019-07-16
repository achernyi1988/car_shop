import {combineReducers} from 'redux'
import {FETCH_CARS, GET_CAR} from "./types"

const fetchCarsReducer = (state = [], action) =>{
    if(FETCH_CARS === action.type){
        return action.payload;
    }
    return state;
}

export default combineReducers({
    cars : fetchCarsReducer
})