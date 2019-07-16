import React from 'react';
import {connect} from 'react-redux'
import {fetchCars} from "../redux/action";

class CarList extends React.Component {


    componentDidMount(){
        this.props.fetchCars();
    }

    render() {

        return (
            <div className="ui container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="ui card">
                            <a className="image" href="#">
                                <img src="/images/bmw.jpg"/>
                            </a>
                            <div className="content">
                                <a className="header" href="#">Steve Jobes</a>
                                <div className="meta">
                                    <a>Last Seen 2 days ago</a>
                                </div>
                            </div>
                        </div>

                        <div className="ui card">
                            <a className="image" href="#">
                                <img src="/images/bmw-i8.jpg"/>
                            </a>
                            <div className="ui content">


                                <a className="header" href="#">Steve Jobes</a>
                                <div className="meta">
                                    <a>Last Seen 2 days</a>
                                </div>

                                <i className="right floated red remove icon"></i>

                                <i className="right floated yellow pencil alternate icon "></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state)
    return state;
        //article: state.article


};


export default connect(mapStateToProps, {fetchCars})(CarList)