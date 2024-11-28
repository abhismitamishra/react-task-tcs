import React, {useState, useEffect} from "react";
import axios from "axios";

const UserListNew = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] =useState(null);

    useEffect( () => {
        fetchData();
    },[]);


    const fetchData = async () => {
        try{
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsers(response.data);
        }catch(error){
            console.error("error fetching users:",error);
        }
    }

    const handleEditClick = (userId) => {
        setEditUserId(userId);
    }

    const handleInputChange = (userId,newName) => {
        setUsers(
            users.map((user) => user.id === userId ? {...user, name:newName} :user
          )
        );
    }

    const handleBlur = () => {
        setEditUserId(null);
    }

    return (
        <>
          <h2>UserList</h2>
          <ul>
            {users.map((user) => (
                <li key={user.id}>
                    { editUserId === user.id ? (<input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleInputChange(user.id, e.target.value)}
                    onBlur={handleBlur} // Exit edit mode on blur
                    autoFocus
                  />)
                  :(<span onClick={() => handleEditClick(user.id)}>{user.name}</span>)
                    }
                
                  </li>

            ))}
          </ul>
        
        </>
    )
}
export default UserListNew;