import React, { Component } from 'react'
import Form from './Form';

export default class CustomerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      DOB: "",
      email: "",
      phone: "",
      openEditForm: false,
    }
  }

  componentDidMount() {
    const { name, DOB, email, phone } = this.props;
    this.setState({ name, DOB, email, phone });
  }

  handleUpdate = ({ name, DOB, email, phone }) => {
    const updatedItem = {
      id : this.props.id, name, DOB, email, phone
    } 
    this.props.handleUpdate(updatedItem);
    this.handleCancel();
  }

  handleEditClick = () => this.setState({ openEditForm: true })
  handleDelete = () => this.props.handleDelete(this.props.id);
  handleCancel = () => this.setState({openEditForm : false});

  render() {
    return (
      <>
        {
          !this.state.openEditForm ? (
            <div className="customer-row">
              <div className="customer-item-name">{this.state.name}</div>
              <div className="customer-item-DOB">{this.state.DOB}</div>
              <div className="customer-item-email">{this.state.email}</div>
              <div className="customer-item-phone">{this.state.phone}</div>
              <div className="operations">
                <span onClick={this.handleEditClick} className="btn edit" ><i className="fas fa-pen"></i></span>
                <span onClick={this.handleDelete} className="btn delete"><i className="fas fa-trash"></i></span>
              </div>
            </div>
          ) : (
            <Form name={this.state.name} DOB={this.state.DOB} email={this.state.email} phone={this.state.phone}
            closeForm={this.handleCancel} updateItem={this.handleUpdate} />
          )
        }
      </>
    )
  }
}