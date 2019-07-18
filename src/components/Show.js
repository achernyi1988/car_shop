import React from 'react';
import {connect} from 'react-redux'
import {fetchCar} from "../redux/action";
import _ from "lodash";


class Edit extends React.Component {


    componentDidMount(){
        this.props.fetchCar(this.props.match.params.id);
    }

    render() {
        const {car} = this.props;

        if(_.isEmpty(car)){
            return <div>Not found...</div>
        }
        return (
            <div className="ui container">
                <div className="row">
                    <div className="col-md-6">

                        <div className="ui card" key={car.vin} >
                            <img src="/images/bmw.jpg" alt="bmw"/>
                            <div className="content">
                                <div className="header">    {car.model}</div>
                                <div className="meta">
                                    <div>{car.price} ether </div>
                                </div>
                                <i className="right floated red remove icon"/>
                                <i className="right floated yellow pencil alternate icon "/>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    return {car : state.car};
};


export default connect(mapStateToProps, {fetchCar})(Edit)