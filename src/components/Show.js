import React from 'react';
import {connect} from 'react-redux'
import {fetchCar,fetchUser} from "../redux/action";
import _ from "lodash";
import Card from "./Card"

class Show extends React.Component {


    componentDidMount() {
        this.props.fetchCar(this.props.match.params.id);
        this.props.fetchUser();
    }

    onShopAction = ()=>{
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
            <div className="ui container">
                <Card car = {car} userId = {this.props.userId} key={car.vin} onShopAction={this.onShopAction}> </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {car: state.car,
        userId: state.userid};
};


export default connect(mapStateToProps, {fetchCar, fetchUser})(Show)