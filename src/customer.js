import React, { Component } from 'react';
import CustomerItem from './components/CustomerItem';
import Form from './components/Form';
import './customer.css';
import { connect } from 'react-redux';
import { createItem, deleteItem, updateItem, readItems } from './redux/actions/actions'
import axios from 'axios';
import uuid from 'uuid';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = { openAddForm: false }
  }

  componentDidMount() {
    this.props.readItems();
    console.log(this.props.customerItems)
  }

  validateEmail = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  handleAddClick = () => this.setState({ openAddForm: true });

  handleAddItem = ({ name, DOB, email, phone }) => {

    if (name == "" || email == "" || !this.validateEmail(email)){
      return
    }

    const newItem = {
      id: uuid.v4(),
      name, DOB, email, phone
    }

    axios.post('/api/customerItems', { ...newItem }).then(({data : {name}}) => {
      console.log(`Item - ${name} added successfully`);
    }).catch(e => console.log("Addition failed , Error ", e));

    this.props.createItem(newItem);
    this.handleCancel();
  }

  handleDeleteItem = (id) => {
    axios.delete(`/api/customerItems/${id}`).then(({data : {name}}) => {
      console.log(`Item - ${name} deleted successfully`);
    }).catch(e => console.log("Deletion failed, Error ",e));

    this.props.deleteItem(id)
  }

  handleUpdateItem = (item) => {
    axios.put(`/api/customerItems/${item.id}`,{item}).then( ({data : {name}}) => {
      console.log(`Item - ${name} updated successfully`);
    }).catch(e => console.log('Updation failed, Error ',e));

    this.props.updateItem(item);
  }

  handleCancel = () => this.setState({ openAddForm: false });

  render() {
    return (
      <>
        {/* Heading */}
        <h1><i className="fas fa-list-alt"></i> Customer Application </h1>

        {/* Customer component starts */}
        <div className="customer" >

          <div className="heading customer-row">
            <div className="customer-item-name">Name</div>
            <div className="customer-item-DOB">DOB</div>
            <div className="customer-item-email">Email</div>
            <div className="customer-item-phone">Phone</div>
            <div className="operations"> Operations</div>
          </div>

          {this.props.customerItems.length > 0 ? this.props.customerItems.map((item, i) => {
            return <CustomerItem key={item.name + "-" + item.DOB + item.email+ item.phone  + "-" + item.id} id={item.id}
              name={item.name} DOB={item.DOB} email={item.email} phone={item.phone}
              handleDelete={this.handleDeleteItem}
              handleUpdate={this.handleUpdateItem}
              closeForm={this.handleCancel} />
          }) : (
              <div className="customer-row">
                <div className="msg">List is empty.</div>
              </div>
            )}

        </div>
        {/* Customer component ends */}

        {!this.state.openAddForm ? (
          <span onClick={this.handleAddClick} className="add btn"><i className="fas fa-plus"></i></span>
        ) : (
            <div className="customer"><Form addItem={this.handleAddItem} closeForm={this.handleCancel} /></div>
          )}
      </>
    )
  }
}

const mapStateToProps = ({ customerItems }) => ({
  customerItems
})

export default connect(mapStateToProps, { createItem, deleteItem, updateItem, readItems })(Customer);