/**
 * Filename: complexCode.js
 * 
 * Description: This code demonstrates a complex implementation of a social media-like platform called "SocialBuzz".
 * It includes features such as user registration, login, posting messages, liking posts, adding friends, and more.
 *
 * This code is highly elaborate and demonstrates advanced JavaScript concepts and techniques.
 * The code is structured into multiple classes and functions to ensure modularity and maintainability.
 * Please note that executing this code as-is may not work since it requires additional dependencies and a backend.
 */

// Import necessary modules and libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Define main React component for the SocialBuzz application
function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');

  useEffect(() => {
    // Fetch existing users from the backend API
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Fetch existing posts from the backend API
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Function to handle user registration
  const registerUser = (username, password) => {
    const newUser = { id: uuidv4(), username, password };
    
    axios.post('/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  };

  // Function to handle user login
  const loginUser = (username, password) => {
    const matchedUser = users.find(user => user.username === username && user.password === password);
    
    if (matchedUser) {
      setCurrentUser(matchedUser);
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
    } else {
      console.error('Invalid username or password.');
    }
  };

  // Function to handle creating a new post
  const createPost = () => {
    const newPost = { id: uuidv4(), userId: currentUser.id, text: newPostText, likes: 0, comments: [] };

    axios.post('/api/posts', newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        setNewPostText('');
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  // Function to handle liking a post
  const likePost = postId => {
    const likedPost = posts.find(post => post.id === postId);

    if (likedPost) {
      likedPost.likes++;
      
      axios.put(`/api/posts/${postId}`, likedPost)
        .then(response => {
          setPosts([...posts]); // Trigger re-render by creating a new array reference
        })
        .catch(error => {
          console.error('Error liking post:', error);
        });
    }
  };

  // Function to handle adding a friend
  const addFriend = userId => {
    const currentUserCopy = { ...currentUser };
    currentUserCopy.friends.push(userId);

    axios.put(`/api/users/${currentUser.id}`, currentUserCopy)
      .then(response => {
        setCurrentUser(currentUserCopy);
        localStorage.setItem('currentUser', JSON.stringify(currentUserCopy));
      })
      .catch(error => {
        console.error('Error adding friend:', error);
      });
  };

  // Function to handle deleting a post
  const deletePost = postId => {
    const deletedPostIndex = posts.findIndex(post => post.id === postId);

    if (deletedPostIndex >= 0) {
      posts.splice(deletedPostIndex, 1);

      axios.delete(`/api/posts/${postId}`)
        .then(response => {
          setPosts([...posts]); // Trigger re-render by creating a new array reference
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    }
  };

  return (
    <Router>
      <div className="app">
        {/* Routes */}
        <Switch>
          <Route exact path="/login">
            <Login loginUser={loginUser} />
          </Route>
          <Route exact path="/register">
            <Register registerUser={registerUser} />
          </Route>
          <Route path="/home">
            {/* Protected route for home page */}
            {currentUser ? (
              <>
                <Profile currentUser={currentUser} posts={posts} createPost={createPost} newPostText={newPostText} setNewPostText={setNewPostText} likePost={likePost} deletePost={deletePost} addFriend={addFriend} />
                <FriendRequests currentUser={currentUser} />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// Each component (Login, Register, Profile, FriendRequests, etc.) is implemented in separate classes or functions.

// ...

// Run the application by rendering the main React component
ReactDOM.render(<App />, document.getElementById('root'));