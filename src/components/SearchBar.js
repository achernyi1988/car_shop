import React from 'react';
import { reduxForm, Field } from 'redux-form';



const SearchBar = ({ handleChange, handleSubmit, value }) => (
    <form onSubmit={handleSubmit}>
        <div>
            <Field
                component="input"
                name="search"
                onChange={handleChange}
                type="text"
                placeholder="search car by VIN ..."
                value={value}
            />
        </div>
    </form>
)
export default reduxForm({ form: 'SearchBar' })(SearchBar)