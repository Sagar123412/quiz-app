import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/home/Home'
import Quiz from './pages/quiz/Quiz'
import Result from './pages/result/Result'
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState();

   const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };  
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact> 
            <Home name={name} setName={setName} fetchQuestions={fetchQuestions} />
          </Route>
          <Route path="/quiz" exact> 
            <Quiz 
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
            />
          </Route>
          <Route path="/result" exact> 
            <Result score={score} name={name} />
          </Route>
        </Switch>
      </div>
    {/* <Footer />     */}
    </BrowserRouter>
  );
}

export default App;
