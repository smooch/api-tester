import React, { Component } from "react";
import Result from "../Result.js";
import ParametersInput from "../ParametersInput.js";
import CallPreview from "../CallPreview.js";

class GetChannels extends Component {
  constructor(props) {
    super(props);
    this.handleCustomUserIdValueChange = this.handleCustomUserIdValueChange.bind(this);
    this.handleUserIdValueChange = this.handleUserIdValueChange.bind(this);
    this.state = {
      responsePayload: null,
      errorPayload: null,
      userIdParamValue: "",
      isCustomUserIdChecked:false,
      anotherArray:[{
        label: "Add a custom userId",
        formHandler: () => {this.handleCustomUserIdValueChange()},
        value: "test",
        type: "checkbox",
        key: ""
      }],
      error: false,
    };
  }

  componentWillMount() {

  }

  handleUserIdValueChange = event => {
    this.setState({ userIdParamValue: event.target.value });
    console.log(this.state.userIdParamValue)
  };

  handleCustomUserIdValueChange = () => {
    this.setState({
      isCustomUserIdChecked: !this.state.isCustomUserIdChecked,
    });

  };

  updateParametersRender = () => {
    this.state.anotherArray.map(obj =>
       <ParametersInput
        label={obj.label}
        formHandler={obj.formHandler}
        value={obj.value}
        type={obj.type}
        key={obj.key}
      />)
  }

  getChannels = (userId) => {
    console.log(userId)
    fetch("/updateappuser", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(userId)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          responsePayload: JSON.stringify(data, null, 2),
          error: false
        });
      })
      .catch(e => {
        this.setState({
          errorPayload: `API call failed: ${e}`,
          error: true
        });
      });
  };

  render() {

    var parametersArray = [{
      label: "userId",
      formHandler: this.handleUserIdValueChange,
      value: this.state.userIdParamValue,
      type: "text"
    }]

    return (
      <div>
        <div className="parameters">
          <h2>Parameters</h2>
          <div>
          {this.state.anotherArray.map(obj =>
             <ParametersInput
              label={obj.label}
              formHandler={obj.formHandler}
              value={obj.value}
              type={obj.type}
              key={obj.key}
            />)}
            {!this.state.isCustomUserIdChecked ? (
              ""
            ) : (
              parametersArray.map(obj =>
                 <ParametersInput
                  label={obj.label}
                  formHandler={obj.formHandler}
                  value={obj.value}
                  type={obj.type}
                  key={obj.key}
                />)
            )}
          </div>
        </div>
        <div className="result-section-dropdown">
          <div className="button-container">
            <button onClick={() => {this.updateAppUser(this.state.userIdParamValue)}}>{this.props.buttonTitle}</button>
          </div>
          <Result
            data={this.state.responsePayload}
            title="Response: "
            error={this.state.error}
            errorPayload={this.state.errorPayload}
          />
        </div>
      </div>
    );
  }
}

export default GetChannels;