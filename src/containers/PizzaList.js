import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class PizzaList extends Component {

  renderAllPizzas = () => {
    return this.props.allPizzas.map(pizza => {
      return <Pizza pizza={pizza} editPizza={this.props.editPizza}/>
    })

  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {this.renderAllPizzas()}
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
