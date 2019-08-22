import React, { Component } from 'react'

//Form component which is used as EDIT_ITEM_FORM as well as CREATE_ITEM_FORM
export default class Form extends Component {
  constructor(props) {
    super(props);

    //initializing state 
    this.state = {
      name: !this.props.name ? "" : this.props.name, 
      DOB: !this.props.DOB ? "" : this.props.DOB,
      email: !this.props.email ? "" : this.props.email,
      phone: !this.props.phone ? "" : this.props.phone,
    };
  }

  //funtion that upadtes state on input change
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  //function that sends the final data when user presses Submit
  handleSubmit = () => {
    const { name, DOB, email, phone } = this.state;
    if(this.props.name && this.props.email){
      this.props.updateItem({ name, DOB, email, phone });
    }
    else{
      this.props.addItem({ name, DOB, email, phone });
    }
  }

  //calls parent function to close form
  handleCancel = () => this.props.closeForm();

  render() {
    return (
      <form className="customer-row" >
        <div className="customer-item-name">
          <input value={this.state.name} onChange={this.handleChange}
            name="name" placeholder="customer name" type="text" />
        </div>
        <div className="customer-item-DOB">
          <input value={this.state.DOB} onChange={this.handleChange}
            name="DOB" placeholder="date of birth" type="text" />
        </div>
        <div className="customer-item-email">
          <input value={this.state.email} onChange={this.handleChange}
            name="email" placeholder="email address" type="text" />
        </div>
        <div className="customer-item-phone">
          <input value={this.state.phone} onChange={this.handleChange}
            name="phone" placeholder="phone number" type="text" />
        </div>
        <div className="operations">
          <span onClick={this.handleSubmit} className="btn done" >
            <i className="fas fa-check" />
          </span>
          <span onClick={this.handleCancel} className="btn cancel">
            <i className="fas fa-times" />
          </span>
        </div>
      </form>
    )
  }
}