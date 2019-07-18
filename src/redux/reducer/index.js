import {combineReducers} from 'redux'
import {FETCH_CARS, GET_CAR, USER_ACCOUNT} from "./types"
import {reducer as formReducer} from 'redux-form'

const carsListReducer = (state = [], action) =>{

    console.log("carsListReducer action", action);
    if(FETCH_CARS === action.type){
        return action.payload;
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