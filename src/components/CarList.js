import React from 'react';
import {connect} from 'react-redux'
import {fetchCars} from "../redux/action";

class CarList extends React.Component {


    componentDidMount(){
        this.props.fetchCars();
    }

    renderList = () =>{

        return this.props.cars.map((car) => {

            return (
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
            );
        })
    }

    render() {
        console.log("render", this.props.cars)
        return (
            <div className="ui container">
                <div className="row">
                    <div className="col-md-6">

                    </div>
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    return {cars : state.cars};
};


export default connect(mapStateToProps, {fetchCars})(CarList)