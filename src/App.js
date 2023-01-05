import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          일어나.. 코딩해야지... 개발 안 할래..?
        </p>
       <p>
        개발 안해..? 진짜...? 내가 깃허브도 파고 배포까지 했는데...??
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
