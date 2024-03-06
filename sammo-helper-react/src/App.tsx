import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import GeneralTable from './components/GeneralTable';

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>삼모 헬퍼 v0.1</h2>
      <p>턴 수집기만 작동중입니다</p>
      <Link to='/turns'>턴수집기</Link>
    </div>
  );
}

function App() {
  // https://docs.amplify.aws/javascript/build-a-backend/graphqlapi/set-up-graphql-api/
  // npx @aws-amplify/cli codegen
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turns" element={<GeneralTable />} />
      </Routes>
    </Router>
  );
/*
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
  */
}

export default App;
