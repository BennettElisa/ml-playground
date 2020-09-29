/* React component to handle predicting and displaying predictions. */
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import train from "../train";
import { setTestData, getUniqueOptionsByColumn } from "../redux";

class Predict extends Component {
  static propTypes = {
    showPredict: PropTypes.bool,
    selectedFeatures: PropTypes.array,
    testData: PropTypes.object,
    setTestData: PropTypes.func.isRequired,
    prediction: PropTypes.object,
    optionsByColumn: PropTypes.object
  };

  handleInput = (event, feature) => {
    const testData = this.props.testData;
    testData[feature] = event.target.value;
    this.props.setTestData(testData);
  };

  handleChangeSelect = (event, feature) => {
    const testData = this.props.testData;
    testData[feature] = event.target.value;
    this.props.setTestData(testData);
  };

  onClickPredict = () => {
    train.onClickPredict();
  };

  render() {
    return (
      <div>
        {this.props.showPredict && (
          <div>
            <h2>Test the Model</h2>
            <form>
              {this.props.selectedFeatures.map((feature, index) => {
                return (
                  <span key={index}>
                    <label>
                      {feature}:
                      <select
                        onChange={event =>
                          this.handleChangeSelect(event, feature)
                        }
                      >
                        {this.props.optionsByColumn[feature].map(
                          (option, index) => {
                            return (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </label>
                  </span>
                );
              })}
            </form>
            <button type="button" onClick={this.onClickPredict}>
              Predict!
            </button>
            {this.props.prediction && (
              <div>
                <h2> The Machine Learning model predicts... </h2>
                <span>
                  {this.props.prediction.predictedLabel} with{" "}
                  {this.props.prediction.confidence} confidence.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    showPredict: state.showPredict,
    selectedFeatures: state.selectedFeatures,
    testData: state.testData,
    prediction: state.prediction,
    optionsByColumn: getUniqueOptionsByColumn(state)
  }),
  dispatch => ({
    setTestData(testData) {
      dispatch(setTestData(testData));
    }
  })
)(Predict);
