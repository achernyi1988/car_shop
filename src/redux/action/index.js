import {FETCH_CARS, USER_ACCOUNT,
    GET_CAR, DELETE_CAR, SHOP_OWNER, COMPANY_BALANCE} from "../reducer/types"
import {smartContractData} from "../../ethereum/contractInstance"
import web3 from "../../ethereum/web3"
import history from '../../history'
import {getCarStateEnum} from "../../components/types"

export const fetchCars = () => (dispatch) => {
    console.log("fetchCars");

    smartContractData.then(obj => {

            console.log("fetchCar obj = ", obj);
            obj.instanceSM.methods.getNumberOfCars().call()
                .then(async (length) => {
                    console.log("fetchCars:getNumberOfCars length", length);

                    let cars = [];
                    for (let i = 0; i < length; ++i) {
                        const {model, owner, vendee, price, sold, image, vin, year, state, timestamp} =
                                    await obj.instanceSM.methods.getCarByIndex(i).call()

                        const date = new Date(timestamp * 1000); //convert to Date
                        const eState = getCarStateEnum(state);

                        console.log("fetchCars:getCarByIndex cars", model, owner,vendee, price, sold,
                            image, vin, year, getCarStateEnum(state), date);

                        cars.push({
                            model: web3.utils.hexToString(model), owner, buyer: vendee,
                            price: parseInt(web3.utils.fromWei(price, "ether")),
                            sold, image, vin, year, state : eState, date
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
    ).catch((err) => {
        console.log("fetchCars:err ", err.message);
    });
}


export const fetchCar = (_vin) => (dispatch) => {
    console.log("fetchCar", _vin);

    smartContractData.then(async obj => {

        console.log("fetchCar obj = ", obj);

        const {model, owner, vendee, price, sold, image, vin, year,state, timestamp} = await obj.instanceSM.methods.getCarByVin(parseInt(_vin)).call();

        const date = new Date(timestamp * 1000); //convert to Date
        const eState = getCarStateEnum(state);

        const car = {
            model: web3.utils.hexToString(model), owner, buyer: vendee,
            price: parseInt(web3.utils.fromWei(price, "ether")),
            sold, image, vin, year, state : eState, date
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

export const fetchShopOwner = () => (dispatch) => {
    console.log("fetchShopOwner");

    smartContractData.then(async obj => {

        const owner = await obj.instanceSM.methods.getOwner().call();

        console.log("fetchShopOwner owner", owner);


        dispatch({
            type: SHOP_OWNER, payload: owner
        })

    }).catch((err) => {
        console.log("fetchShopOwner:err ", err.message);

        dispatch({
            type: GET_CAR, payload: {} //send empty
        })
    });
}

export const withdrawAllReward = () => (dispatch) => {
    console.log("withdrawAllReward");

    smartContractData.then(async obj => {

        obj.instanceSM.methods.withdrawAllReward().send({
            from: obj.accounts[0],
            gas: "6000000"
        }).then(()=>{
            console.log("withdrawAllReward done");
            dispatch({
                type: COMPANY_BALANCE, payload: parseInt(0)
            })
        }).catch((err)=>{
            console.log("withdrawAllReward err",err );
        });


    }).catch((err) => {
        console.log("withdrawAllReward:err ", err.message);
    });
}

export const getRewardBalance = () => (dispatch) => {
    console.log("getRewardBalance");

    smartContractData.then(async obj => {

        obj.instanceSM.methods.getRewardBalance().call()
        .then((balance)=>{
            console.log("getRewardBalance done", balance);

            dispatch({
                type: COMPANY_BALANCE, payload: parseInt(balance)
            })

        }).catch((err)=>{
            console.log("getRewardBalance err",err );
            dispatch({
                type: COMPANY_BALANCE, payload: parseInt(0)
            })
        });

    }).catch((err) => {
        console.log("withdrawAllReward:err ", err.message);
    });
}



export const showCar = (_vin) => (dispatch) => {
    console.log("showCar", _vin);

    smartContractData.then(async obj => {

        console.log("showCar obj = ", obj);

        const {model, owner,vendee, price, sold, image, vin, year, state, timestamp} =
                                    await obj.instanceSM.methods.getCarByVin(parseInt(_vin)).call();

        const date = new Date(timestamp * 1000); //convert to Date
        const eState = getCarStateEnum(state);

        const car = {
            model: web3.utils.hexToString(model), owner, buyer:vendee,
            price: parseInt(web3.utils.fromWei(price, "ether")),
            sold, image, vin, year, state : eState, date
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
        console.log("deleteCar:err ", err.message);

    });
}

export const buyCar = (_vin, price, shopActionState) => (dispatch) => {
    console.log("buyCar", _vin, web3.utils.toWei(price.toString(), 'ether'));

    smartContractData.then(async obj => {

        console.log("buyCar obj = ", obj);

        obj.instanceSM.methods.buy(parseInt(_vin)).send({
            from: obj.accounts[0],
            gas: "6000000",
            value: web3.utils.toWei(price.toString(), 'ether')
        }).then((result)=>{
            console.log("buyCar:result ", result);
            shopActionState();//update shop status
        }).catch((err) => {
            console.log("buyCar:err ", err.message);
        })
    }).catch((err) => {
        console.log("buyCar:err ", err.message);

    });
}

export const sendDelivery = (_vin, shopActionState) => (dispatch) =>{
    console.log("sendDelivery", _vin);

    smartContractData.then(async obj => {

        console.log("sendDelivery obj = ", obj);

        obj.instanceSM.methods.sendDelivery(parseInt(_vin)).send({
            from: obj.accounts[0],
            gas: "6000000"
        }).then((result)=>{
            console.log("sendDelivery:result ", result);
            shopActionState();//update shop status
        }).catch((err) => {
            console.log("sendDelivery:err ", err.message);
        })
    }).catch((err) => {
        console.log("sendDelivery:err ", err.message);

    });
}

export const  confirmDelivery = (_vin, shopActionState) =>(dispatch) =>{
    console.log("confirmDelivery", _vin);

    smartContractData.then(async obj => {

        console.log("confirmDelivery obj = ", obj);

        obj.instanceSM.methods.confirmDelivery(parseInt(_vin)).send({
            from: obj.accounts[0],
            gas: "6000000"
        }).then((result)=>{
            console.log("confirmDelivery:result ", result);
            shopActionState();//update shop status
        }).catch((err) => {
            console.log("confirmDelivery:err ", err.message);
        })
    }).catch((err) => {
        console.log("confirmDelivery:err ", err.message);

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

    }).catch((err) =>{
        console.log("err" , err)
    })
})