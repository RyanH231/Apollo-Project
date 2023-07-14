import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone"

const typeDefs = `#graphql
        type Pokemon {
            id: Int
            name: String
            type: String
        },

        type Query
        {
            GetAllPokemon: [Pokemon],
            GetPokemonByName(name: String!): Pokemon
        }
`;

const pokemon = [
    {
        id:1,
        name:"Charmander",
        type:"Fire"
    },
    {
        id:2,
        name:"Squirtle",
        type:"Water"
    },
    {
        id:3,
        name:"Bulbasaur",
        type:"Grass"
    }
];


const resolvers = {
    Query:
    {
        GetAllPokemon(){
            return pokemon;
        },
        GetPokemonByName(parent, args, contextValue, info) {
            return pokemon.find((mon) => mon.name === args.name);
       }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const {url} = startStandaloneServer(server, {
    listen:{port:4000},
});