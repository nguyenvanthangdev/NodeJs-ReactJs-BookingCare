import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import CustomScrollbars from "../../../../components/CustomScrollbars";
import {
  getAllUsers1,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../../../utils/emitter";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModaEditlUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModaEditlUser: !this.state.isOpenModaEditlUser,
    });
  };
  getAllUsersFromReact = async () => {
    let response = await getAllUsers1("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  handEditUser = (user) => {
    this.setState({
      isOpenModaEditlUser: true,
      userEdit: user,
    });
  };
  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);

      if (res && res.errCode === 0) {
        this.setState({
          isOpenModaEditlUser: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModaEditlUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModaEditlUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center my-5">
          Quản Lý Tài Khoản Người Dùng
        </div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3 mx-5"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>Create new users
          </button>
        </div>
        <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
          <div className="users-table mt-3 mx-5">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {arrUsers &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
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
                            onClick={() => this.handleDeleteUser(item)}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
