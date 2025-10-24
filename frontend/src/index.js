import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import { AuthProvider } from "./CheckAuth";

// Apollo Client initialisation 
// Will have to be changed eventually to include authorisation (might be done on backend instead, or needed in both)
const client = new ApolloClient({
  link: new HttpLink({ 
    // Change port to the port you are using in your docker file (probably 8000)
    uri: "/graphql/",
  }),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

