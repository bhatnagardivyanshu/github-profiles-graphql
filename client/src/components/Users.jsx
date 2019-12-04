import React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

const USERS_QUERY = gql`
  query UsersQuery($username: String!) {
    user(username: $username) {
      login
      name
      avatar_url
      company
    }
  }
`;

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      getUserProfile: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.setState({
      getUserProfile: true
    });
  }

  onInputChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-md-3 col-md-3 text-center">
          <input
            className="form-control"
            type="text"
            onChange={this.onInputChange}
            value={this.state.username}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-success" onClick={this.onButtonClick}>
            Get User Profile
          </button>
        </div>
        <div className="col-md-12 mt-5">
          {this.state.username && this.state.getUserProfile ? (
            <div>
              <Query
                query={USERS_QUERY}
                variables={{ username: this.state.username }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <div>Loading...</div>;
                  if (error) {
                    console.log(error);
                    return <div>Oops! {error.message}</div>;
                  }
                  console.log({ data });
                  return (
                    <div>
                      <div className="card card-body mb-3">
                        <div className="row">
                          <div className="col-md-2">
                            <p>
                              <img
                                width={100}
                                height={100}
                                src={data.user.avatar_url}
                                alt="Avatar"
                              />
                            </p>
                          </div>
                          <div className="col-md-6">
                            <h6>Login: {data.user.login}</h6>
                            <h6>Name: {data.user.name}</h6>
                            <h6>Company: {data.user.company}</h6>
                          </div>
                          <div className="col-md-3">
                            <Link
                              to={`/repos/${data.user.login}`}
                              className="btn btn-secondary"
                            >
                              Repositories
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </Query>
            </div>
          ) : (
            <p className="text-center">Please enter a username</p>
          )}
        </div>
      </div>
    );
  }
}

// const Users = () => {
//   // const { loading, error, data } = useQuery(USERS_QUERY);

//   // if (loading) return <div>Loading...</div>;
//   // if (error) {
//   //   console.log(error);
//   //   return <div>Oops! Something's not right!</div>;
//   // }
//   // console.log({ data });
//   return (
//     <div>
//       <div className="card card-body mb-3">
//         <div className="row">
//           <div className="col-md-2">
//             <p>
//               <img
//                 width={100}
//                 height={100}
//                 src={data.user.avatar_url}
//                 alt="Avatar"
//               />
//             </p>
//           </div>
//           <div className="col-md-6">
//             <h6>Login: {data.user.login}</h6>
//             <h6>Name: {data.user.name}</h6>
//             <h6>Company: {data.user.company}</h6>
//           </div>
//           <div className="col-md-3">
//             <Link
//               to={`/repos/${data.user.login}`}
//               className="btn btn-secondary"
//             >
//               Repositories
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Users;

Users.defaultProps = {
  users: []
};
