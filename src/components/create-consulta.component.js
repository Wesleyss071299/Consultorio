import React, { Component } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateConsulta extends Component {
  constructor(props) {
    super(props);

    this.onChangeConsultaUsername = this.onChangeConsultaUsername.bind(this);
    this.onChangeConsultaAddress = this.onChangeConsultaAddress.bind(this);
    this.onChangeConsultaPhone = this.onChangeConsultaPhone.bind(this);
    this.onChangeConsultaDate = this.onChangeConsultaDate.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      address: "",
      phone: "",
      date: new Date()
    };
  }

  onChangeConsultaUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeConsultaAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeConsultaPhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeConsultaDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Consulta Username: ${this.state.username}`);
    console.log(`Consulta Address: ${this.state.address}`);
    console.log(`Consulta Phone: ${this.state.phone}`);
    console.log(`Consulta Date: ${this.state.date}`);

    const newConsulta = {
      username: this.state.username,
      address: this.state.address,
      phone: this.state.phone,
      date: this.state.date
    };

    axios
      .post("http://localhost:4000/consultas/add", newConsulta)
      .then(res => console.log(res.data));

    this.setState({
      username: "",
      address: "",
      phone: "",
      date: ""
    });

    this.props.history.push('/');
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Consulta</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeConsultaUsername}
            />
          </div>

          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeConsultaAddress}
            />
          </div>

          <div className="form-group">
            <label>Phone: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangeConsultaPhone}
            />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeConsultaDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Consulta"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
