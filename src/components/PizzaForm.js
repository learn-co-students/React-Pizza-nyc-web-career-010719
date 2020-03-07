import React from "react"

class PizzaForm extends React.Component {

  render() {
    console.log('PizzaForm', this.props);
    return (
      <div className="form-row">
        <div className="col-5">
            <input
              name="topping"
              onChange={this.props.change}
              type="text"
              className="form-control"
              placeholder={this.props.topping}
            />
        </div>
        <div className="col">
          <select
            name="size"
            onChange={this.props.change}
            value={null}
            className="form-control"
          >
            <option value={this.props.size ? this.props.size : "Small"}>
              Current ({this.props.size ? this.props.size : "Small"})
            </option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              name="vegetarian"
              className="form-check-input"
              type="radio"
              value="true"
              checked={!!this.props.vegetarian}
              onChange={this.props.change}
            />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input
              name="not-vegetarian"
              className="form-check-input"
              type="radio"
              value="false"
              checked={!this.props.vegetarian}
              onChange={this.props.change}
            />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button
            type="submit"
            className="btn btn-success"
            onClick={this.props.submit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  };
};

export default PizzaForm;
