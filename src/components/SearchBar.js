import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {showCar} from "../redux/action";
import {connect} from 'react-redux';

class SearchBar extends React.Component{

    onSubmit = ({search})=>{

        console.log("onSubmit",search);

        this.props.showCar(search);
        this.props.onSubmiteForm();

    }

    render(){
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div>
                    <Field
                        component="input"
                        name="search"
                        type="text"
                        placeholder="search car by VIN ..."
                    />

                </div>

                <button type="submit">Search</button>
            </form>
        )
    }
}


export default reduxForm({ form: 'SearchBar' }) (connect(null, {
    showCar
})(SearchBar));