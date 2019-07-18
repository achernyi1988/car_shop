import React from 'react';
import {connect} from 'react-redux'
import {fetchCars, fetchUser} from "../redux/action";

class List extends React.Component {


    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchCars();


        // const d = new Date();
        // console.log("timestamp", d.toLocaleString());
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
    return {cars : state.cars,
            user_id: state.userid};
};


export default connect(mapStateToProps, {fetchCars, fetchUser})(List)