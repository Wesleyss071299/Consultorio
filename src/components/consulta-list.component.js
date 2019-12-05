import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Consulta = props => (
    <tr>
        <td>{props.consulta.username}</td>
        <td>{props.consulta.address}</td>
        <td>{props.consulta.phone}</td>
        <td>{props.consulta.date.substring(0,10)}</td>
        <td>
          <Link to={"/edit/"+props.consulta._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteConsulta(props.consulta._id) }}>delete</a>    
         
        </td>
    </tr>
)

export default class ConsultaList extends Component {

    constructor(props) {
        super(props);
        this.state = {consultas: []};
        this.deleteConsulta = this.deleteConsulta.bind(this)
    }
    
    componentDidMount() {
        axios.get('http://localhost:4000/consultas/')
            .then(response => {
                this.setState({consultas: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    

    
    componentDidUpdate() {
        axios.get('http://localhost:4000/consultas/')
        .then(response => {
            this.setState({consultas: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }
    


    deleteConsulta(id) {
      axios.delete('http://localhost:4000/consultas/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        consultas: this.state.consultas.filter(el => el._id !== id)
      })
    }
    /*
    consultaList() {
        return this.state.consultas.map(function(currentConsulta, i) {
            return <Consulta consulta={currentConsulta} deleteConsulta={this.deleteConsulta} key={i} />;
        });
    }
    */
    consultaList() {
      return this.state.consultas.map(currentconsulta => {
        return <Consulta consulta={currentconsulta} deleteConsulta={this.deleteConsulta} key={currentconsulta._id}/>;
      })
    }

    render() {
        return (
            <div>
                <h3>Consulta List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.consultaList() }
                    </tbody>
                </table>
            </div>
        )
    }
}