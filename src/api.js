import axios from "axios";

const api = axios.create({
    baseURL: "https://mv-news.onrender.com/api",
});

export const fetchArticles =  (filterByTopic, sortBy, order) => {
    return api.get('/articles',{
        params:{
            topic: filterByTopic,
            sort_by: sortBy,
            order: order
        }
    })
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
    return api.patch(`/article/${id}`, inc_votes)
        .then((res) => res.data)
}

export const fetchTopics = () => {
    return api.get("/topics")
        .then((res) => res.data)
}

export const deleteCommentById = (id) => {
    return api.delete(`/comments/${id}`)
        .then((res) => res.data)
}