import React from 'react';
import {connect} from 'react-redux'
import {fetchCars, fetchUser} from "../redux/action";
import Card from "./Card"

class List extends React.Component {


    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchCars();
    }

    onShopAction = ()=>{
        console.log("onShopAction");
        this.props.fetchCars();
    }

    render() {
        return (
            this.props.cars.map((car) => {
                return (
                    <div style={{marginTop: "10px"}} key={car.vin}>
                        <Card car={car} userId = {this.props.userId} onShopAction={this.onShopAction}> </Card>
                    </div>
                );
            })

        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {
        cars: state.cars,
        userId: state.userid
    };
};


export default connect(mapStateToProps, {fetchCars, fetchUser})(List)