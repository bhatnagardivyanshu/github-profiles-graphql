import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import RepositoryListItem from "./RepositoryListItem";

const REPOS_QUERY = gql`
  query Repositories($username: String!) {
    repositories(username: $username) {
      name
      html_url
      private
      owner {
        login
        avatar_url
      }
    }
  }
`;

const RepositoryList = ({ match }) => {
  let {
    params: { username }
  } = match;
  // console.log("GETCHING REPO FOR ", username);

  return (
    <div>
      <Query query={REPOS_QUERY} variables={{ username }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) {
            console.log(error);
            return <div className="error">Error: {error.message}</div>;
          }
          return (
            <div>
              <h3>User's Repos</h3>
              <ul>
                {/* {{{}}} */}
                {data.repositories.map(repo => (
                  <RepositoryListItem repo={repo} key={repo.name} />
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    </div>
  );

  // let { loading, error, data } = useQuery(REPOS_QUERY, {
  //   variables: {
  //     username
  //   },
  // });

  // if (loading) return <div>Loading...</div>;
  // if (error) {
  //   console.log(error);
  //   return <div>Failed to fetch the repos</div>;
  // }

  // return (
  //   <div>
  //     <h3>User's Repos</h3>
  //     <ul>
  //       {/* {{{}}} */}
  //       {data.repositories.map(repo => (
  //         <RepositoryListItem repo={repo} key={repo.name} />
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default RepositoryList;
