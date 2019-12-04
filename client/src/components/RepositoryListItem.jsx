import React from "react";

const RepositoryListItem = ({ repo }) => (
  <div className="card card-body mb-3">
    <div className="row">
      <div className="col-md-2"></div>
      <div className="col-md-6">
        <h6>Name: {repo.name}</h6>
        <h6>
          URL:{" "}
          <a target="_blank" href={repo.html_url}>
            Repository
          </a>
        </h6>
        <h6>Private: {repo.private ? "YES" : "NO"}</h6>
        <h6>Owner: {repo.owner.login}</h6>
      </div>
    </div>
  </div>
);

export default RepositoryListItem;
