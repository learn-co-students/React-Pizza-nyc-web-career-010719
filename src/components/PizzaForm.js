import React, { Component } from "react"

class PizzaForm extends Component {
  render() {
    console.log("props in form", this.props);
    // console.log("topping", this.props.pizza.topping);
    // console.log("topping", this.props.topping);

    return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={this.props.edit} name="topping" type="text" className="form-control" placeholder="Pizza Topping" value={
                this.props.topping
              }/>
        </div>
        <div className="col">
          <select onChange={this.props.edit} name="size" value={this.props.size} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input onClick={this.props.vegetarianEdit} className="form-check-input" type="radio" value="Vegetarian" checked={this.props.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input onClick={this.props.vegetarianEdit} className="form-check-input" type="radio" value="Not Vegetarian" checked={ this.props.topping ? !this.props.vegetarian : null }/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={ () => this.props.editPizza(this.props.id)}>Submit</button>
        </div>
      </div>

    )
  }
}

export default PizzaForm
