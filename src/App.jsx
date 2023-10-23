import './App.css';
import { Routes, Route } from 'react-router-dom';
import ArticlesList from "./components/ArticlesList.jsx";
import Header from './components/Header';

function App() {

  return (
   <div>
        <Header/>
        <ArticlesList />

   </div>
  )
}

export default App
