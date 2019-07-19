import React from "react"
import {connect} from 'react-redux';
import SearchBar from './SearchBar';

import _ from "lodash"
import history from "../history"

class Header extends React.Component {

    isSearched = false;
    onSubmite = () => {
        console.log("Header:onSubmite");
        this.isSearched = true;
    }

    onHome = () => {
        history.push("/")
    }

    onCreateCar = () => {
        history.push("/create")
    }

    render() {
        const empty = _.isEmpty(this.props.car);
        const result = (empty === true) ? "car not found" : "Car found";
        return (
            <div className={"ui container"}>
                <div className="ui blue inverted  menu">
                    <div className="ui category search item">
                        <div className="ui transparent icon input">
                            <SearchBar onSubmiteForm={this.onSubmite}/>
                        </div>
                        {this.isSearched ? result : null}
                    </div>
                    <div className="menu">
                        <button className="ui red button" onClick={this.onCreateCar}>
                            Add a car
                        </button>
                    </div>
                    <div className="right menu">
                        <button className="ui brown button" onClick={this.onHome}>
                            Main page
                        </button>
                    </div>
                </div>


            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {car: state.car};
};


export default connect(mapStateToProps)(Header);