const { GraphQLServer } = require("graphql-yoga");


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length;
const resolvers = {
    Query: {
        info: () => "This is the API of a Hackernews Clone",
        feed: () => links
    },
    Mutation: {
        post: (root, args) => {
            const newLink = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(newLink);
            return newLink;
        },
        updateLink: (root, args) => {
            let nSel;
            for (let nLink in links) {
                if (links[nLink].id == args.id) {
                    nSel = nLink;
                    links[nLink].description = args.description;
                    links[nLink].url = args.url;
                }
            }
            return links[nSel];
        },
        deleteLink: (root,args) => {
            let nSel;
            for (let nLink in links) {
                if (links[nLink].id === args.id) {
                    nSel = nLink;
                    links.splice(nLink,1);
                }
            }
            return links[nSel];
        }
    },
    Link: {
        id: (root) => root.id,
        url: (root) => root.url,
        description: (root) => root.description
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => {
    console.log('El servidor esta corriendo en localhost:4000');
})