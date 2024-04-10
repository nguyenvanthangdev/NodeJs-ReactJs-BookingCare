import React, { Component } from "react";
//import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter :" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api new a user modal
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        centered
      >
        <ModalHeader
          className="text-white"
          toggle={() => {
            this.toggle();
          }}
        >
          Create a new user
        </ModalHeader>
        <ModalBody>
          <div className="row ">
            <form className="ml-5">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "email");
                    }}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "password");
                    }}
                    value={this.state.password}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "firstName");
                    }}
                    value={this.state.firstName}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "lastName");
                    }}
                    value={this.state.lastName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="1234 Main St"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                  value={this.state.address}
                />
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn px-3"
            color="primary"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            Add New
          </Button>{" "}
          <Button
            className="btn px-3"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
