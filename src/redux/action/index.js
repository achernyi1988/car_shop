import {FETCH_CARS, USER_ACCOUNT, GET_CAR, DELETE_CAR} from "../reducer/types"
import {smartContractData} from "../../ethereum/contractInstance"
import web3 from "../../ethereum/web3"
import history from '../../history'

export const fetchCars = () => (dispatch) => {
    console.log("fetchCars");

    smartContractData.then(obj => {

            console.log("fetchCar obj = ", obj);
            obj.instanceSM.methods.getNumberOfCars().call()
                .then(async (length) => {
                    console.log("fetchCars:getNumberOfCars length", length);

                    let cars = [];
                    for (let i = 0; i < length; ++i) {
                        const {model, owner, price, sold, image, vin, year} = await obj.instanceSM.methods.getCarByIndex(i).call()


                        console.log("fetchCars:getCarByIndex cars", model, owner, price, sold, image, vin, year);

                        cars.push({
                            model: web3.utils.hexToString(model), owner,
                            price: parseInt(web3.utils.fromWei(price, "ether")),
                            sold, image, vin: vin, year: year
                        });
                    }
                    console.log("fetchCars:getCarByIndex cars", cars);

                    dispatch({
                        type: FETCH_CARS, payload: cars
                    })

                }).catch((err) => {
                console.log("fetchCars:err ", err.message);
            });
        }
    )
}


export const fetchCar = (_vin) => (dispatch) => {
    console.log("fetchCar", _vin);

    smartContractData.then(async obj => {

        console.log("fetchCar obj = ", obj);

        const {model, owner, price, sold, image, vin, year} = await obj.instanceSM.methods.getCarByVin(parseInt(_vin)).call();

        const car = {
            model: web3.utils.hexToString(model), owner,
            price: parseInt(web3.utils.fromWei(price, "ether")),
            sold, image, vin: vin, year: year
        }

        console.log("fetchCar:getCarByVin car", car);

        dispatch({
            type: GET_CAR, payload: car
        })

    }).catch((err) => {
        console.log("fetchCar:err ", err.message);

        dispatch({
            type: GET_CAR, payload: {} //send empty
        })
    });
}

export const showCar = (_vin) => (dispatch) => {
    console.log("showCar", _vin);

    smartContractData.then(async obj => {

        console.log("showCar obj = ", obj);

        const {model, owner, price, sold, image, vin, year} = await obj.instanceSM.methods.getCarByVin(parseInt(_vin)).call();


        const car = {
            model: web3.utils.hexToString(model), owner,
            price: parseInt(web3.utils.fromWei(price, "ether")),
            sold, image, vin: vin, year: year
        }
        console.log("showCar:getCarByVin car", car);


        dispatch({
            type: GET_CAR, payload: car
        })

        history.push(`/show/${_vin}`);

    }).catch((err) => {
        console.log("showCar:err ", err.message);

        dispatch({
            type: GET_CAR, payload: {} //send empty
        })
    });
}

export const deleteCar = (_vin) => (dispatch) => {
    console.log("deleteCar", _vin);

    smartContractData.then(async obj => {

        console.log("deleteCar obj = ", obj);

        obj.instanceSM.methods.deleteCar(parseInt(_vin)).send({
            from: obj.accounts[0],
            gas: "6000000"
        }).then((result)=>{
            console.log("deleteCar:result ", result);

            dispatch({
                type: DELETE_CAR, payload: { vin: _vin }
            })
            history.push(`/`);
        }).catch((err) => {
            console.log("deleteCar:err ", err.message);



        })
    }).catch((err) => {
        console.log("showCar:err ", err.message);

    });
}


export const createCar = (vin, model, year, price, image_hash) => (dispatch) => {
    console.log("createCar", vin, model, year, price, image_hash);

    smartContractData.then(async obj => {

        console.log("createCar obj = ", obj);

        obj.instanceSM.methods.addCar(vin, web3.utils.asciiToHex(model), year, price, image_hash).send({
            from: obj.accounts[0],
            gas: "6000000"
        })
            .then((result) => {


                console.log("createCar:result ", result);
                //jump to main page
                history.push(`/`);
            }).catch((err) => {
            console.log("showCar1:err ", err.message);

        });

    }).catch((err) => {
        console.log("showCar:err ", err.message);

    });
}


export const editCar = (vin, model, year, price, image_hash) => (dispatch) => {
    console.log("editCar", vin, model, year, price, image_hash);

    smartContractData.then(async obj => {

        console.log("editCar obj = ", obj);

        obj.instanceSM.methods.editCar(vin, web3.utils.asciiToHex(model), year, price, image_hash).send({
            from: obj.accounts[0],
            gas: "6000000"
        })
            .then((result) => {


                console.log("editCar:result ", result);
                //jump to main page
                history.push(`/show/${vin}`);
            }).catch((err) => {
            console.log("editCar:err ", err.message);

        });

    }).catch((err) => {
        console.log("editCar:err ", err.message);

    });
}

export const fetchUser = (() => (dispatch) => {
    smartContractData.then(obj => {
        console.log("fetchUser user", obj.accounts[0]);
        dispatch({type: USER_ACCOUNT, payload: obj.accounts.length > 0 ? obj.accounts[0] : 0});

    })
})