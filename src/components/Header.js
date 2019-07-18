import React from "react"
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import {fetchCar} from "../redux/action";
import _ from "lodash"
class  Header extends React.Component{

    isSearched = false;
    findCar=(value)=>{
        this.isSearched = true;
        this.props.fetchCar(value.search);
    }


    render(){
        const empty = _.isEmpty(this.props.car);
        const result = (empty === true ? "Not found a car" :"Found a car" );
        return(
            <div className="ui menu">
                <div className="ui category search item">
                    <div className="ui transparent icon input">
                     <SearchBar
                         onSubmit={value => this.findCar(value)}
                     />
                    </div>
                    { this.isSearched ? result : null}
                </div>


            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {car : state.car};
};


export default connect( mapStateToProps,{fetchCar})(Header);