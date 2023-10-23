import axios from "axios";

const api = axios.create({
    baseURL: "https://mv-news.onrender.com/api",
});

export const fetchArticles =  () => {
    return api.get("/articles")
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

export const fetchArticleById = (id) => {
    return api.get(`/articles/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
}