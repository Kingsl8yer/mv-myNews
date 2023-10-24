import axios from "axios";

const api = axios.create({
    baseURL: "https://mv-news.onrender.com/api",
});

export const fetchArticles =  () => {
    return api.get("/articles")
        .then((res) => res.data)
}

export const fetchArticleById = (id) => {
    return api.get(`/articles/${id}`)
        .then((res) => res.data)
}

export const fetchCommentsByArticleId = (id) => {
    return api.get(`/articles/${id}/comments`)
        .then((res) => res.data)
}

export const postCommentByArticleId = (id, comment) => {
    return api.post(`/articles/${id}/comments`, comment)
        .then((res) => res.data)
}

export const updateArticleVotes = (id, inc_votes) => {
    return api.patch(`/articles/${id}`, inc_votes)
        .then((res) => res.data)
}