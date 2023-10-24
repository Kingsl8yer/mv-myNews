import {useEffect, useState} from 'react';
import {fetchCommentsByArticleId, postCommentByArticleId} from '../api';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

const CommentList = ({username}) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const {article_id} = useParams();


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(commentText);
        console.log(username);
        const comment = {
            username: username,
            body: commentText
        };
        postCommentByArticleId(article_id, comment).then((data) => {
            setComments((currComments) => {
                return [...currComments, data.comment];
            });
        });
        setCommentText("");
    }

    useEffect(() => {
        fetchCommentsByArticleId(article_id).then((data) => {
            console.log("I am Looping");
            setComments(data.comments);
        })
    }, [article_id]);

    return (
        <div style={{ margin: "auto", width: "50%", paddingBottom: "10px" }}>
            <h3>Comments</h3>
            {comments.map((comment, index) => {
                return <Comment key={index} comment={comment} />;
            })}
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>New Comment</label>
                    <textarea rows="2"
                              value={commentText}
                              onChange={(event) => {
                                  setCommentText(event.target.value);
                              } }
                              />
                </div>
                <button className="ui button blue" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CommentList;