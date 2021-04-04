import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [foo, setFoo] = useState("N/A");

  useEffect(() => {
    fetch("/api")
      .then((res) => {
        console.log("🚀 ~ file: App.tsx ~ line 11 ~ .then ~ res", res);

        return res.json();
      })
      .then((data) => {
        console.log("🚀 ~ file: App.tsx ~ line 12 ~ .then ~ data", data);
        setFoo(data.message);
      })
      .catch((err) => setFoo(err.message));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. \n message from
          server: {foo}
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
