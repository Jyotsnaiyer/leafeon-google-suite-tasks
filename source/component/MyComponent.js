import React, { useState, useEffect } from 'react';
import SignInComponent from './SignInComponent'; // Ensure you import the SignInComponent if it's in another file

const MyComponent = () => {
  const [comments, setComments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  // Function to fetch data
  const fetchData = async () => {
    if (!accessToken) {
      console.error('Access token is missing');
      return;
    }

    try {
      const commentsResponse = await fetch(`/api/comments?access_token=${accessToken}`);
      const commentsData = await commentsResponse.json();
      if (commentsResponse.ok) {
        setComments(commentsData.comments);
      } else {
        throw new Error(commentsData.error || 'Error fetching comments');
      }

      const tasksResponse = await fetch(`/api/tasks?access_token=${accessToken}`);
      const tasksData = await tasksResponse.json();
      if (tasksResponse.ok) {
        setTasks(tasksData.tasks);
      } else {
        throw new Error(tasksData.error || 'Error fetching tasks');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Effect to trigger fetchData on accessToken change
  useEffect(() => {
    fetchData();
  }, [accessToken]);

  // Function to handle sign-in
  const handleSignIn = (token) => {
    setAccessToken(token);
  };

  return (
    <div>
      {/* Sign-in component */}
      <SignInComponent onSignIn={handleSignIn} />
      {/* Display comments and tasks */}
      <div>
        <h2>Comments</h2>
        {comments.map((comment, index) => ( // Use index as key if comment.content is not unique
          <div key={index}>
            <p>{comment.content}</p>
            <p>Author: {comment.author}</p>
            <p>File: {comment.fileName}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Tasks</h2>
        {tasks.map((task, index) => ( // Use index as key if task.title is not unique
          <div key={index}>
            <h3>{task.title}</h3>
            <p>{task.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
