const axios = require("axios");

const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLObjectType
} = require("graphql");

// RepositoryType
const RepositoryType = new GraphQLObjectType({
  name: "Repositories",
  fields: () => ({
    name: { type: GraphQLString },
    html_url: { type: GraphQLString },
    private: { type: GraphQLBoolean },
    owner: { type: OwnerType },
    license: { type: LicenseType }
  })
});

// OwnerType
const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    login: { type: GraphQLString },
    avatar_url: { type: GraphQLString },
    url: { type: GraphQLString },
    following: { type: GraphQLString }
  })
});

// LicenseType
const LicenseType = new GraphQLObjectType({
  name: "License",
  fields: () => ({
    name: { type: GraphQLString },
    watchers: { type: GraphQLInt }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    login: { type: GraphQLString },
    avatar_url: { type: GraphQLString },
    name: { type: GraphQLString },
    company: { type: GraphQLString }
  })
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    repositories: {
      type: new GraphQLList(RepositoryType),
      args: {
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log("CALLED RESOLVE WITH", parent, args);
        return axios
          .get(`https://api.github.com/users/${args.username}/repos`)
          .then(res => res.data);
      }
    },
    user: {
      type: UserType,
      args: {
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log("CALLED RESOLVE WITH", parent, args);
        return axios
          .get(`https://api.github.com/users/${args.username}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
