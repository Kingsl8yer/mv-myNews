import "./App.css";
import { Routes, Route} from "react-router-dom";
import { useState } from "react";
import ArticlesList from "./components/ArticlesList.jsx";
import Header from "./components/Header";
import ArticleMain from "./components/ArticleMain";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [user, setUser] = useState("jessjelly");
  return (
    <div>
      <Header />
      <Routes>
          <Route path="/"  element={<ArticlesList />} />
          <Route path="/articles"  element={<ArticlesList />} />
          <Route path="/articles/:article_id" element={<ArticleMain username={user}/>} />
          <Route path="*"  element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
