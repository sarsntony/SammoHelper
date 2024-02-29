import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api';
import { listGenerals } from './graphql/queries';
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // https://docs.amplify.aws/javascript/build-a-backend/graphqlapi/set-up-graphql-api/
  // npx @aws-amplify/cli codegen
  Amplify.configure({
    API: {
      GraphQL: {
        endpoint: 'https://occnmndw4fffxigyer4rpcunrm.appsync-api.us-east-1.amazonaws.com/graphql',
        region: 'us-east-1',
        defaultAuthMode: 'apiKey',
        apiKey: 'da2-f25kzp2vdnevde4ily3luu3o64'
      }
    }
  });

  const client = generateClient();
  const [data, updateData] = useState("initialData");
  useEffect(() => {
    const getData = async () => {
      const result = await client.graphql({
        query: listGenerals,
        variables: {
          server: '체66기'
        }
      });
      updateData(JSON.stringify(result.data));
    }
    getData();
  }, []);
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
