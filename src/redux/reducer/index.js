import {combineReducers} from 'redux'
import {DELETE_CAR, FETCH_CARS, GET_CAR, USER_ACCOUNT} from "./types"
import {reducer as formReducer} from 'redux-form'

const carsListReducer = (state = [], action) =>{
    if(FETCH_CARS === action.type){
        return action.payload;
    }

    if(DELETE_CAR === action.type){
        return state.filter( elem => elem.vin !== action.payload.vin); //remove element by VIN
    }
    return state;
}


const userAccountReducer = (state = [], action) =>{
    if(USER_ACCOUNT === action.type){
        return action.payload;
    }
    return state;
}

const currentCarReducer = (state = {}, action) =>{
    if(GET_CAR === action.type){
        return action.payload;
    }
    return state;
}


export default combineReducers({
    form: formReducer,
    cars : carsListReducer,
    userid : userAccountReducer,
    car : currentCarReducer
})