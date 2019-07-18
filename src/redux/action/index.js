import {FETCH_CARS, USER_ACCOUNT, GET_CAR} from "../reducer/types"
import {smartContractData} from "../../ethereum/contractInstance"
import web3 from "../../ethereum/web3"


export const fetchCars = () => (dispatch) => {
    console.log("fetchCars");

    smartContractData.then(obj => {

            console.log("fetchCar obj = ", obj);
            obj.instanceSM.methods.getNumberOfCars().call()
                .then(async (length) => {
                    console.log("fetchCars:getNumberOfCars length", length.toNumber());

                    let cars = [];
                    for (let i = 0; i < length; ++i) {
                        const {model, owner, price, sold, vin, year} = await obj.instanceSM.methods.getCarByIndex(i).call()

                        let _price = parseInt(web3.utils.fromWei(price._hex, "ether"));
                        cars.push({
                            model, owner, price: _price,
                            sold, vin: vin.toNumber(), year: year.toNumber()
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

        const {model, owner, price, sold, vin, year} = await obj.instanceSM.methods.getCarByVin(parseInt(_vin)).call();

        let converted_price = parseInt(web3.utils.fromWei(price._hex, "ether"));
        const car = {model, owner, converted_price, sold, vin, year}
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


export const fetchUser = (() => (dispatch) => {
    smartContractData.then(obj => {
        console.log("fetchUser user", obj.accounts[0]);
        dispatch({type: USER_ACCOUNT, payload: obj.accounts.length > 0 ? obj.accounts[0] : 0});

    })
})


// export const getIPFSHash = () => (dispatch) => {
//     console.log("getIPFSHash");
//
//     smartContractData.then(obj => {
//             obj.instanceSM.methods.getIPFS().call().then((result) => {
//                 console.log("getIPFSHash:result ", result);
//                 dispatch({type: types.IPFS_HASH, payload: result.length === 0 ? null : result})
//             }).catch((err) => {
//                 console.log("getIPFSHash:err ", err.message);
//             });
//         }
//     )
// }
//
// export const setCurrentElectorate = (person) => {
//
//     return {type: types.SET_CURRENT_ELECTORATE, payload: person};
// }
//
// export const getCurrentElectorate = () => {
//
//     return {type: types.GET_CURRENT_ELECTORATE};
// }
//
// export const getContractAddress = () => (dispatch) => {
//     console.log("getContractAddess");
//
//     smartContractData.then(obj => {
//             obj.instanceSM.methods.admin().call().then((result) => {
//                 console.log("admin:result ", result);
//                 dispatch({
//                     type: types.WEB3_ADDRESS, payload: {
//                         admin: result.length === 0 ? null : result,
//                         user: obj.accounts[0]
//                     }
//                 })
//             }).catch((err) => {
//                 console.log("admin:err ", err.message);
//             });
//         }
//     )
// }
//
// export const getElectorateVoted = () => async (dispatch) => {
//     console.log("getElectorateVoted");
//
//     const {instanceSM} = await smartContractData.then();// obj =>
//
//     const length = await instanceSM.methods.getNumberOfVoter().call();
//
//     let arr = [];
//     for (let i = 0; i < length; ++i) {
//         const {voter} = await instanceSM.methods.votersArray(i).call()
//         arr.push(voter);
//     }
//     console.log("getElectorateVoted:result ", arr);
//     dispatch({type: types.UPDATE_VOTED_LIST, payload: arr})
//
// }
//
//
// function sendVote(candidate, electorate, dispatch, reject) {
//
//     smartContractData.then(obj => {
//         obj.instanceSM.methods.vote(candidate, electorate).send({
//             from: obj.accounts[0],
//             gas: "2000000"
//         }).then((result) => {
//             console.log("vote:result ", result.events.OnVote.returnValues);
//             dispatch({type: types.SET_VOTE_PROCESS, payload: true})
//         }).catch((err) => {
//             reject(err);
//         });
//     });
//
// }
//
//
// export const vote = (candidate, electorate, onStartVoting) => (dispatch) => {
//     console.log("vote");
//     let attempt = 0;
//     let retry_milliseconds = 25000;
//     dispatch({type: types.SET_VOTE_PROCESS, payload: false})
//     timer(0).then(() => {
//         onStartVoting();
//         return new Promise((resolve, reject) => {
//             sendVote(candidate, electorate, dispatch, reject);
//         }).catch(error => {
//             console.log(`vote:err run ${++attempt}th retry ${error.message} with ${retry_milliseconds} milliseconds`);
//
//             timer(retry_milliseconds).then(() => {
//                 return new Promise((resolve, reject) => {
//                     sendVote(candidate, electorate, dispatch, reject);
//                 }).catch(error => {
//                     console.log(`vote:err run ${++attempt}th retry ${error.message} with ${retry_milliseconds} milliseconds`);
//
//                     timer(retry_milliseconds).then(() => {
//                         return new Promise((resolve, reject) => {
//                             sendVote(candidate, electorate, dispatch, reject);
//                         }).catch(error => {
//                             console.log(`vote:err ${attempt}th retries are finished ${error.message} with ${retry_milliseconds} milliseconds`);
//                         })
//                     })
//                 })
//             })
//         })
//     })
//
// }
//
// export const getCandidates = () => async (dispatch) => {
//     console.log("getCandidates");
//
//     const {instanceSM} = await smartContractData.then();// obj =>
//     const length = await instanceSM.methods.getNumberOfContender().call();
//
//     let arr = [];
//     for (let i = 0; i < length; ++i) {
//         arr.push(await instanceSM.methods.contender(i).call());
//     }
//     arr.sort(function (a, b) {
//         if (a.fullName === 'Против всех') return 0;
//         if (b.fullName === 'Против всех') return 0;
//
//         if (a.fullName < b.fullName)
//             return -1;
//         if (a.fullName > b.fullName)
//             return 1;
//         return 0;
//     });
//
//     console.log("getCandidates:result after sort by alphabet ", arr);
//     dispatch({type: types.UPDATE_CANDIDATE_LIST, payload: arr})
//
// }
//
// export const getElectionResult = () => async (dispatch) => {
//     const {instanceSM} = await smartContractData.then();// obj =>
//     const length = await instanceSM.methods.getNumberOfContender().call();
//
//     let arr = [];
//     for (let i = 0; i < length; ++i) {
//         arr.push(await instanceSM.methods.contender(i).call());
//     }
//     arr.sort(function (a, b) {
//         return b.voteCounter - a.voteCounter
//     });
//     console.log("getCandidates:result after sort ", arr);
//     dispatch({type: types.UPDATE_CANDIDATE_LIST_RESULT, payload: arr})
//
// }