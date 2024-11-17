import React, { useState } from 'react';
import './TaskPage.css';

const TaskPage = () => {
  const [status, setStatus] = useState('In Progress');
  const [priority, setPriority] = useState('Low');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div className="task-page">
      <div className="sidebar">
        <ul>
          <li>Tasks</li>
          <li>Projects</li>
          <li>My Tasks</li>
          <li>Calendar</li>
          <li>Time Manage</li>
          <li>Settings</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Tasks</h1>
          <button className="add-task-btn">+ Add a task</button>
        </div>
        <div className="task-details">
          <h2>Task 1: Landing page and Dashboard of M App</h2>
          <div className="task-status">
            <label>Status: </label>
            <input type="radio" value="In Progress" checked={status === 'In Progress'} onChange={handleStatusChange} /> In Progress
          </div>
          <div className="task-due-date">
            <label>Due Date: </label>
            <span>28-10-2024</span>
          </div>
          <div className="task-assigned">
            <label>Assigned to: </label>
            <span>Employee 1, Employee 2, Employee 3</span>
          </div>
          <div className="task-assigned-by">
            <label>Assigned by: </label>
            <span>Employee 1</span>
          </div>
          <div className="task-description">
            <label>Description: </label>
            <textarea placeholder="Description"></textarea>
          </div>
          <div className="task-attachments">
            <label>Attachments: </label>
            <div className="attachment">
              <span>Landing-page.pdf</span>
              <button>Download</button>
            </div>
            <div className="attachment">
              <span>Landing-page.pdf</span>
              <button>Download</button>
            </div>
          </div>
          <div className="task-comments">
            <label>Comments: </label>
            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={index} className="comment">{comment}</div>
              ))}
            </div>
            <textarea value={newComment} onChange={handleCommentChange} placeholder="Your Comment"></textarea>
            <button onClick={addComment}>Add Comment</button>
          </div>
          <div className="task-status-change">
            <label>Change Status: </label>
            <input type="radio" value="Low" checked={priority === 'Low'} onChange={handlePriorityChange} /> Low
            <input type="radio" value="Normal" checked={priority === 'Normal'} onChange={handlePriorityChange} /> Normal
            <input type="radio" value="Urgent" checked={priority === 'Urgent'} onChange={handlePriorityChange} /> Urgent
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
