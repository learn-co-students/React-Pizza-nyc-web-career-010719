import React, {Component} from "react"

class PizzaForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      topping: props.pizza.topping,
      size: props.pizza.size,
      vegetarian: props.pizza.vegetarian,
      id: props.pizza.id
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      topping: props.pizza.topping,
      size: props.pizza.size,
      vegetarian: props.pizza.vegetarian,
      id: props.pizza.id
    })
  }

   handleTopping = (e) => {
    this.setState({topping: e.target.value})
    console.log(e.target.value);
  }

  handleSize = (e) => {
    this.setState({size: e.target.value})
    console.log(e.target.value);
  }

  handleVegatarian = (e) => {
    if (e.target.value == "Vegetarian"){
      this.setState({vegetarian: true})
      console.log(e.target.value);
    }
    else {
      this.setState({vegetarian: false})
      console.log(e.target.value);
    }
  }

  handleSubmit = () => {
    this.props.postEdit(this.state)
  }


  render(){
    return(
        <div className="form-row" >
          <div className="col-5">
              <input type="text" className="form-control" placeholder="Pizza Topping" value={
                  this.state.topping
                } onChange={this.handleTopping}/>
          </div>
          <div className="col">
            <select value={this.state.size} className="form-control" onChange={this.handleSize}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Vegetarian" checked={this.state.vegetarian == true} onChange={this.handleVegatarian}/>
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Not Vegetarian" checked={this.state.vegetarian == false} onChange={this.handleVegatarian}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>

    )
  }
}

export default PizzaForm
