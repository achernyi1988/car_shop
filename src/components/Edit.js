import React from 'react';
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form';
import {fetchCar, editCar} from "../redux/action";
import ipfs from "../ethereum/api/ipfs_client";
import _ from "lodash"

class Edit extends React.Component {

    required = value => value ? undefined : 'Required';

    constructor(props){
        super(props);
        this.state = {submitBtnStyle: "ui primary button"};
    }
    componentDidMount() {
        this.props.fetchCar(this.props.match.params.id);
    }

    renderField = ({input, label, type, meta: {touched, error, warning}}) => {
        return (

            <div>
                <label>{label}</label>
                <div>
                    <input {...input} placeholder={"..."} type={type}/>
                    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                </div>
            </div>
        );
    }

    onSubmit = async (value) => {
        console.log("onSubmit", value);

        this.setState({submitBtnStyle: "ui primary button loading"});

        if (!_.isEmpty(value.capture_image)) {

            const reader = new window.FileReader();
            reader.readAsArrayBuffer(value.capture_image[0]);
            reader.onloadend = () => {
                console.log(Buffer.from(reader.result));
                ipfs.files.add(Buffer.from(reader.result), (error, result) => {
                    if (error) {
                        console.error("onSubmit", error);
                        return;
                    }
                    console.log("hash ", result[0].hash)

                    this.props.editCar(value.vin, value.model, value.year,
                        value.price, result[0].hash);

                })
            }
        }
        else {
            this.props.editCar(value.vin, value.model, value.year,
                value.price, value.image);
        }


    }


    file_upload = ({input, type, meta: {touched, error, warning}}) => {
        console.log("file_upload");
        delete input.value

        return (
            <div>
                <label htmlFor={input.name}>
                    <input {...input} type={type}/>
                    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                </label>
            </div>
        )
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className={"ui container"}>

                    <div>
                        <Field
                            component={this.renderField}
                            name="vin"
                            type="text"
                            label="enter car's VIN"
                        />
                    </div>

                    <div>
                        <Field
                            component={this.renderField}
                            name="model"
                            type="text"
                            label="enter car's model"
                            validate={this.required}
                        />
                    </div>

                    <div>
                        <Field
                            component={this.renderField}
                            name="year"
                            type="text"
                            label="enter car's year"
                            validate={this.required}
                        />
                    </div>

                    <div>
                        <Field
                            component={this.renderField}
                            name="price"
                            type="text"
                            label="enter car's price"
                            validate={this.required}
                        />
                    </div>
                    <div>
                        <Field
                            component={this.file_upload}
                            label="Shop Logo"
                            name="capture_image"
                            type="file"
                            accept='.jpg, .png, .jpeg'
                        />
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <button type="submit" className={this.state.submitBtnStyle}>Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: {
            vin: state.car.vin,
            model: state.car.model,
            year: state.car.year,
            price: state.car.price,
            image: state.car.image
        }
    }

};


export default connect(mapStateToProps, {
    fetchCar, editCar
})(reduxForm(
    {
        form: 'EditCar', enableReinitialize: true
    })(Edit));