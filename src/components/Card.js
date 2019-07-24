import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteCar, buyCar, sendDelivery, confirmDelivery} from "../redux/action";
import {CarState} from "./types"

const Delete = (props) => {

    console.log("Delete", props.car.vin);
    props.deleteCar(props.car.vin)

}

const Buy = (props) => {

    console.log("Buy", props.car.vin);
    props.buyCar(props.car.vin, props.car.price, props.onShopAction);

}

const SendDelivery = (props) => {

    console.log("SendDelivery", props.car.vin);
    props.sendDelivery(props.car.vin, props.onShopAction)

}

const ConfirmDelivery = (props) => {

    console.log("ConfirmDelivery", props.car.vin);
    props.confirmDelivery(props.car.vin, props.onShopAction)

}

const getCarState = (props) => {

    const display_owner = props.car.owner !== props.userId ? "none" : "" ;

    let display_buyer = "";
    if(props.car.buyer){
        display_buyer = props.car.buyer !== props.userId ? "none" : "" ;
    }

    switch (props.car.state) {
        case CarState.IDLE:
            return {text: "Buy", bg: "white", button_name: "ui green  button", func: Buy};
        case CarState.BUY:
            return {text: "Send delivery", bg: "olive", button_name: "ui yellow  button", display: display_owner, func: SendDelivery};
        case CarState.SEND_DELIVERY:
            return {text: "Confirm delivery", bg: "yellow", button_name: "ui red  button",  display: display_buyer, func: ConfirmDelivery};
        case CarState.SOLD:
            return {bg: "green", display: "none"};
        default:
            console.log("Card CarState default");
            return {text: "Buy", bg: "white", button_name: "ui green  button", func: Buy};
    }
}

const renderButtonActions = (props) => {
    if (props.car.owner !== props.userId) {
        return null;
    }
    else {
        return (
            <div>
                <div onClick={() => Delete(props)}>
                    <i className="right floated red remove large icon"/>
                </div>
                <Link to={`/edit/${props.car.vin}`}>
                    <i className="right floated yellow pencil alternate large icon "/>
                </Link>
            </div>
        )
    }
}

const Card = (props) => {

    const carConfig = getCarState(props);

    return (
        <div className="ui container">
            <div className="row">
                <div className="row-md-6">

                    <div style={{backgroundColor: carConfig.bg}} className="ui card" key={props.car.vin}>
                        <div className="image">
                            <Link to={`/show/${props.car.vin}`}>

                                <img style={{objectFit: "cover", width: "100%", height: "155px"}}
                                     src={`https://ipfs.io/ipfs/${props.car.image}`} alt=""/>
                            </Link>
                        </div>
                        <div className="content">
                            <Link to={`/show/${props.car.vin}`}>
                                <div className="header">    {props.car.model}</div>
                                <div className="meta">
                                    <span className="date">Last update {props.car.date.toLocaleString()}</span>
                                    <div>{props.car.price} ether</div>
                                    <div>VIN: {props.car.vin} </div>
                                    <div>Release year: {props.car.year} </div>
                                </div>
                            </Link>
                            {renderButtonActions(props, carConfig)}
                            <button type="button" style={{marginLeft: "50px", display: carConfig.display}}
                                    className={carConfig.button_name}
                                    onClick={() => carConfig.func(props)}>
                                {carConfig.text}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default connect(null, {deleteCar, buyCar, sendDelivery, confirmDelivery})(Card)