import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]); // Store the user list
  const [editUserId, setEditUserId] = useState(null); // Track the user being edited

  // Fetch users when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle clicking on a user name to switch to edit mode
  const handleEditClick = (userId) => {
    setEditUserId(userId); // Set the clicked user's ID to edit mode
  };

  // Handle changes to the input field
  const handleInputChange = (userId, newName) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, name: newName } : user // Update the name for the edited user
      )
    );
  };

  // Handle input blur to exit edit mode
  const handleBlur = () => {
    setEditUserId(null); // Exit edit mode
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editUserId === user.id ? (
              // If the current user is being edited, show an input field
              <input
                type="text"
                value={user.name}
                onChange={(e) => handleInputChange(user.id, e.target.value)}
                onBlur={handleBlur} // Exit edit mode on blur
                autoFocus
              />
            ) : (
              // Otherwise, display the user name and switch to edit mode on click
              <span onClick={() => handleEditClick(user.id)}>{user.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
