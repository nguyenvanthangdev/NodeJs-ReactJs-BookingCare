import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../../store/actions";
import CustomScrollbars from "../../../../components/CustomScrollbars";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      currentPage: 0,
      isOpenModal: false,
      userToDelete: null,
    };
  }

  async componentDidMount() {
    this.props.fetchUserRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = async () => {
    const { userToDelete } = this.state;
    await this.props.deleteAUserRedux(userToDelete.id);
    this.toggle();
  };
  handEditUser = (user) => {
    this.props.handEditUserFromParentKey(user);
  };
  handleModal = (user) => {
    this.setState({
      isOpenModal: true,
      userToDelete: user, // Set the user to delete
    });
  };

  toggle = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
      userToDelete: null, // Reset the user to delete
    });
  };
  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <React.Fragment>
        <CustomScrollbars>
          <div className="custom-table">
            <table className="table px-3">
              <thead className="thead-light">
                <tr>
                  <th scope="col text-center">Email</th>
                  <th className="customcolumn" scope="col">
                    First Name
                  </th>
                  <th className="customcolumn" scope="col">
                    Last Name
                  </th>
                  <th className="customcolumn" scope="col">
                    Address
                  </th>
                  <th className="customcolumn" scope="col">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {arrUsers &&
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td className="customcolumn">{item.firstName}</td>
                        <td className="customcolumn">{item.lastName}</td>
                        <td className="customcolumn">{item.address}</td>
                        <td className="customcolumn">
                          <button
                            type="button"
                            className="btn btn-warning px-3 mx-2"
                            onClick={() => this.handEditUser(item)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger px-3"
                            onClick={() => this.handleModal(item)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CustomScrollbars>
        <Modal
          isOpen={this.state.isOpenModal}
          toggle={() => {
            this.toggle();
          }}
          size="lg"
          centered
        >
          <ModalHeader
            className="text-dark bg-white"
            toggle={() => {
              this.toggle();
            }}
          >
            Thông báo
          </ModalHeader>
          <ModalBody>
            <div>Bạn có muốn xóa không?</div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-danger px-3"
              onClick={this.handleDeleteUser}
            >
              Xác Nhận
            </Button>
            <Button
              className="btn px-3"
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
            >
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
