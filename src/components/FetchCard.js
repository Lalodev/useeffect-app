import { useEffect, useState, useCallback } from "react";
import getPosts from "../helpers/getPosts";
import getUser from "../helpers/getUser";

/*const initialUser = {
  name: "Luis",
  email: "correo@correo.com",
};*/

/*const initialPosts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];*/

const FetchCard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const updateUser = () => {
    getUser().then((newUser) => {
      setUser(newUser);
    });
  };

  const updatePosts = useCallback(() => {
    getPosts(user.id).then((newPosts) => {
      setPosts(newPosts);
    });
  }, [user.id]);

  useEffect(() => {
    updateUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      updatePosts();
    }
  }, [user, updatePosts]);

  return (
    <div>
      <button onClick={updateUser}>Another User</button>
      <h3>{user.name}</h3>
      <h3>{user.email}</h3>
      <br />
      <h2>Posts - user: {user.id}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchCard;
