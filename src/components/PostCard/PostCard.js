import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import FirebaseContext from "../../FirebaseContext";

const PostCard = ({ title, imageSrc, description, postID }) => {
  const firebase = useContext(FirebaseContext);
  const db = getFirestore(firebase);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const commentRef = collection(db, "comments");
  const postId = "JsYfNoZUZA6h6i4sIKsa";

  const fetchComments = async () => {
    const q = query(commentRef, where("postId", "==", postId));
    try {
      const querySnapshot = await getDocs(q);
      const commentsData = [];
      querySnapshot.forEach((doc) => {
        const commentData = { id: doc.id, ...doc.data(), replies: [] };
        commentsData.push(commentData);
      });

      for (const comment of commentsData) {
        const replyCollectionRef = collection(
          commentRef,
          comment.id,
          "replies"
        );
        const replyQuerySnapshot = await getDocs(replyCollectionRef);
        replyQuerySnapshot.forEach((replyDoc) => {
          comment.replies.push({ id: replyDoc.id, ...replyDoc.data() });
        });
      }

      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    try {
      fetchComments();
    } catch (error) {
      console.error("Error in fetchComments:", error);
    }
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() !== "") {
      const commentData = {
        text: newComment,
        postId: "JsYfNoZUZA6h6i4sIKsa",
        replies: [],
      };

      await addDoc(commentRef, commentData);
      setComments([...comments, commentData]);
      setNewComment("");
    }
  };

  const handleReplySubmit = async (parentCommentId) => {
    if (replyInput.trim() !== "") {
      const newReply = replyInput;

      if (parentCommentId) {
        const parentCommentRef = doc(db, "comments", parentCommentId);
        const repliesCollectionRef = collection(parentCommentRef, "replies");

        const replyData = {
          text: newReply,
          postId: "JsYfNoZUZA6h6i4sIKsa",
        };

        await addDoc(repliesCollectionRef, replyData);

        const updatedComments = comments.map((comment) => {
          if (comment.id === parentCommentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), replyData],
            };
          }
          return comment;
        });

        setComments(updatedComments);
        setReplyTo(null);
        setReplyInput("");
      } else {
        console.error("Invalid parentCommentId");
      }
    }
  };

  return (
    <div className="post-card">
      <div className="title-div">
        <div className="comment-avatar">
          <img src="https://i.pinimg.com/280x280_RS/81/7e/f5/817ef55b2d82aeeb1e47715672ce80bd.jpg" />
        </div>
        <h2 className="post-title">{title}</h2>
      </div>
      <p className="post-description">{description}</p>
      <img className="post-image" src={imageSrc} alt={title} />
      <div className="comment-section">
        <div className="comment-div">
          <div className="comment-avatar"></div>

          <div className="new-comment">
            <textarea
              rows="6"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-input"
            />
            <button
              onClick={handleCommentSubmit}
              className={`comment-button ${newComment.trim() ? "active" : ""}`}
              disabled={!newComment.trim()}
            >
              Comment
            </button>
          </div>
        </div>
        <h3 className="comment-title">Comments</h3>
        <ul className="comments-list">
          {comments &&
            comments.map((comment, parentIndex) => (
              <li key={parentIndex} className="comment">
                <div className="comment-avatar"></div>
                <div className="comment-content">
                  <div className="comment-text-div">
                    <div className="sender-details">
                      <p className="name">Anonymous </p>
                      <p className='time'>3 mins go</p>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                  {replyTo === parentIndex && (
                    <div className="new-reply">
                      <textarea
                        rows="2"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Reply to this comment..."
                        className="comment-input"
                      />
                      <button
                        onClick={handleReplySubmit(comment.id)}
                        className={`reply-button ${
                          newComment.trim() ? "active" : ""
                        }`}
                        disabled={!newComment.trim()}
                      >
                        Reply
                      </button>
                    </div>
                  )}
                  <ul className="replies">
                    {comment.replies &&
                      comment.replies.map((reply, replyIndex) => (
                        <li key={replyIndex} className="comment">
                          <div className="comment-avatar"></div>
                          <div className="comment-content">
                            <div className="comment-text-div">
                              <div className="sender-details">
                                <p className="name">Anonymous </p>
                                <p className='time'>3 mins go</p>
                              </div>
                              <p className="comment-text">{reply.text}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  {replyTo !== parentIndex && (
                    <div className="new-reply">
                      <input
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                        placeholder="Reply to this comment..."
                        className="reply-input"
                      />
                      <button
                        onClick={() => handleReplySubmit(comment.id)} 
                        className={`reply-button ${
                          replyInput.trim() ? "active" : ""
                        }`}
                        disabled={!replyInput.trim()}
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PostCard;
