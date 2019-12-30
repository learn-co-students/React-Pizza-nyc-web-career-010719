import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class PizzaList extends Component {

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
          {
            this.props.pizzas.map(pizza => <Pizza topping={pizza.topping} size={pizza.size} vegetarian={pizza.vegetarian} id={pizza.id} edit={this.props.renderClickedPizza}/>)
          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
