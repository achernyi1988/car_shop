// import React from 'react';
// import {connect} from 'react-redux'
// import {fetchCars} from "../redux/action";
// import {fetchCars, fetchUser} from "../redux/action";
//
//
// class Edit extends React.Component {
//
//
//     componentDidMount(){
//         this.props.fetchCars();
//     }
//
//
//     render() {
//         console.log("render", this.props.cars)
//         return (
//             <div className="ui container">
//                 <div className="row">
//                     <div className="col-md-6">
//
//                     </div>
//                     {this.renderList()}
//                 </div>
//             </div>
//         )
//     }
// }
//
// const mapStateToProps = (state) => {
//     console.log('mapStateToProps', state);
//     return {cars : state.cars};
// };
//
//
// export default connect(mapStateToProps, {fetchCars})(Edit)