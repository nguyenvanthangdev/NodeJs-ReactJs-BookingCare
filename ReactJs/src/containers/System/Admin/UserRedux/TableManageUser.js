import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../../store/actions";
import CustomScrollbars from "../../../../components/CustomScrollbars";
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      currentPage: 0,
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
  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id);
  };
  handEditUser = (user) => {
    this.props.handEditUserFromParentKey(user);
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
