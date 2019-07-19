import React from 'react';
import {connect} from 'react-redux'
import {fetchCars, fetchUser} from "../redux/action";
import Card from "./Card"

class List extends React.Component {


    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchCars();


        // const d = new Date();
        // console.log("timestamp", d.toLocaleString());
    }


    render() {

        return (

            this.props.cars.map((car) => {

                return (

                    <Card  car = {car} key={car.vin}> </Card>
                );
            })

        )
    }
}

const mapStateToProps = (state) => {

    return {
        cars: state.cars,
        user_id: state.userid
    };
};


export default connect(mapStateToProps, {fetchCars, fetchUser})(List)