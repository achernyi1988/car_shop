import React from 'react';
import {connect} from 'react-redux'
import {
    fetchCars, fetchUser, fetchShopOwner,
    withdrawAllReward, getRewardBalance
} from "../redux/action";
import Card from "./Card"

class List extends React.Component {

    componentDidMount() {
        this.props.fetchShopOwner();
        this.props.getRewardBalance();
        this.props.fetchUser();
        this.props.fetchCars();
    }

    onShopAction = () => {
        console.log("onShopAction");
        this.props.getRewardBalance();
        this.props.fetchCars();
    }

    renderWithdraw = () => {

        if (this.props.shopOwner !== this.props.userId ||
            (this.props.companyBalance <= 0)) {
            return null;
        }

        return (
            <div className={"ui container"} style={{marginTop: "50px"}}>
                <button className="ui primary button" onClick={() => this.props.withdrawAllReward()}>
                    Withdraw money
                </button>
            </div>
        )
    }

    render() {
        return (
            <div className="ui container">

                <div className="ui link cards">
                    {this.props.cars.map((car) => {
                        return (
                            <div style={{marginTop: "30px", marginLeft: "70px"}} key={car.vin}>
                                <Card car={car} userId={this.props.userId} onShopAction={this.onShopAction}> </Card>

                            </div>
                        );
                    })}
                    {this.renderWithdraw()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {
        cars: state.cars,
        userId: state.userid,
        shopOwner: state.shop_owner,
        companyBalance: state.company_balance
    };
};


export default connect(mapStateToProps,
    {
        fetchCars, fetchUser,
        getRewardBalance, fetchShopOwner, withdrawAllReward
    })(List)