import React from 'react';
import {connect} from 'react-redux'
import {fetchCar} from "../redux/action";
import _ from "lodash";
import Card from "./Card"

class Show extends React.Component {


    componentDidMount() {
        this.props.fetchCar(this.props.match.params.id);
    }

    render() {

        if(this.props.match.params.id !== this.props.car.vin){
            return null;
        }
        console.log("render", this.props.car);
        const {car} = this.props;

        if (_.isEmpty(car)) {
            return <div>Not found...</div>
        }
        return (
            <Card car = {car} key={car.vin}> </Card>

        )
    }
}

const mapStateToProps = (state) => {
    return {car: state.car};
};


export default connect(mapStateToProps, {fetchCar})(Show)