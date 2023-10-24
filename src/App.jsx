import "./App.css";
import { Routes, Route} from "react-router-dom";
import ArticlesList from "./components/ArticlesList.jsx";
import Header from "./components/Header";
import ArticleMain from "./components/ArticleMain";

function App() {
  return (
    <div>
      <Header />
      <Routes>
          <Route path="/"  element={<ArticlesList />} />
          <Route path="/articles"  element={<ArticlesList />} />
          <Route path="/articles/:article_id" element={<ArticleMain />} />
      </Routes>
    </div>
  );
}

export default App;
