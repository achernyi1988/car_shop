import React from 'react';
import {Link} from 'react-router-dom'

const Card = (props) => {

    return (
        <div className="ui container">
            <div className="row">
                <div className="row-md-6">

                    <div className="ui card" key={props.car.vin}>
                        <Link to={`/show/${props.car.vin}`}>

                        <img style={{objectFit: "cover", width: "100%", height: "155px"}} src={`https://ipfs.io/ipfs/${props.car.image}`} alt=""/>

                        </Link>
                        <div className="content">
                            <Link to={`/show/${props.car.vin}`}>
                                <div className="header">    {props.car.model}</div>
                                <div className="meta">
                                    <div>{props.car.price} ether</div>
                                </div>
                            </Link>
                            <i className="right floated red remove icon"/>
                            <i className="right floated yellow pencil alternate icon "/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Card;