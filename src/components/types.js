
const CarStateNum = {
    IDLE: 0,
    BUY : 1,
    SEND_DELIVERY : 2,
    SOLD : 3
}

const keys = Object.keys(CarStateNum).sort(function(a, b){
    return CarStateNum[a] - CarStateNum[b];
}); //sorting is required since the order of keys is not guaranteed.


export const getCarStateEnum = function(ordinal) {
    return keys[ordinal];
}


export const CarState = {
    IDLE: "IDLE",
    BUY : "BUY",
    SEND_DELIVERY : "SEND_DELIVERY",
    SOLD : "SOLD"
}
