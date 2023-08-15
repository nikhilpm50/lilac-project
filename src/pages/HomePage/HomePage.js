import React, { useEffect, useState } from "react";
import "./style.css";
import PostCard from "../../components/PostCard/PostCard";
import CircularProgress from '@mui/material/CircularProgress';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseContext";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {posts.map((post, index) => (
            <PostCard
              key={index}
              imageSrc={post.image}
              title={post.title}
              description={post.description}
              postId={post.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
