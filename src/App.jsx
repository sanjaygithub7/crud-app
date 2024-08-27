import React, { useEffect, useState } from 'react';
import { Button, EditableText, InputGroup, Toaster } from '@blueprintjs/core';

const Apptoaster = Toaster.create({
  position: "top"
});

export default function App() {
  const [user, setUser] = useState([]);  // Empty state for storing user values

  // Add User
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");  // 3 empty states for adding user
  const [website, setWebsite] = useState("");

  // Fetching data from server
  useEffect(() => {  // This hook for performing a logic after rendering
    fetch('https://jsonplaceholder.typicode.com/users')  // Fetching data from URL
      .then((response) => response.json())  // The fetched data should be in JSON format
      .then((json) => setUser(json))  // Now update the fetched data into state
  }, []);

  // Logic for adding user
  function addUser() {
    const username = name.trim();
    const useremail = email.trim();  // This method removes unwanted space
    const userwebsite = website.trim();

    if (username && useremail && userwebsite) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          username,  // POST method for sending data to the server
          useremail,
          userwebsite
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"  // Correct the header
        }
      })
      .then((response) => response.json())
      .then(data => {
        console.log('Response data:', data);  // Debugging output
        setUser([...user, { id: user.length + 1, name: username, email: useremail, website: userwebsite }]);
        Apptoaster.show({
          message: "Added Data Successfully",
          intent: "success",
          timeout: 3000
        });
        setName("");
        setEmail("");
        setWebsite("");
      })
      .catch(error => {
        console.error("Error:", error);
        Apptoaster.show({
          message: "Failed to Add Data",
          intent: "danger",
          timeout: 3000
        });
      });
    }
  }
  const handleEdit = (id, key, value) => {
    setUser((users) => {
      return users.map(user => {
          return user.id === id ? {...user, [key]: value } : user;
      })
  })
  };

  function updateuser(id){
    const users=user.find((user)=>user.id===id)

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(users),
      headers: {
        "Content-type": "application/json; charset=UTF-8"  // Correct the header
      }
    })
    .then((response) => response.json())
    .then(data => {
      console.log('Response data:', data);  // Debugging output
      Apptoaster.show({
        message: "User Updated Sucessfully",
        intent: "success",
        timeout: 3000
      });
     
    })
    .catch(error => {
      console.error("Error:", error);
      Apptoaster.show({
        message: "Failed to Add Data",
        intent: "danger",
        timeout: 3000
      });
    });

  }

  function deleteuser(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
          method: "DELETE",
      })
      .then( response => response.json())    
      .then(data => {
              setUser((user) => {
                  return user.filter(user => user.id !== id)
              })

              AppToaster.show({
                  message: "user deleted successfully",
                  intent: 'success',
                  timeout: 3000
              })

      })
  }



  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-3 mt-4">  {/* Changed class to className */}
      <table className="w-full text-sm text-left rtl:text-right">  {/* Changed class to className */}
        <thead className="text-xs text-white uppercase ">  {/* Changed class to className */}
          <tr>
            <th scope="col" className="px-6 py-3">  {/* Changed class to className */}
              ID
            </th>
            <th scope="col" className="px-6 py-3">  {/* Changed class to className */}
              Name
            </th>
            <th scope="col" className="px-6 py-3">  {/* Changed class to className */}
              Email
            </th>
            <th scope="col" className="px-6 py-3">  {/* Changed class to className */}
              Website
            </th>
            <th scope="col" className="px-6 py-3">  {/* Changed class to className */}
              Action
            </th>
          </tr>
        </thead>
        <tbody className='text-black'>
          {user.map((user) =>  // Now map all data into table format using map function
            <tr className="text-black border" key={user.id}>  {/* Changed class to className */}
              <td scope="row" className="px-6 py-4 ">{user.id}</td>  {/* Changed class to className */}
              <td className="px-6 py-4">
                <EditableText  className="custom-editable-text"
                  value={user.name}
                  onChange={(value) => handleEdit(user.id, 'name', value)}
                />
              </td> {/* Changed class to className */}
              <td className="px-6 py-4 focus:text-black">
                <EditableText  className="custom-editable-text"
                  value={user.email}
                  onChange={(value) => handleEdit(user.id, 'email', value)}
                />
              </td> {/* Changed class to className */}
              <td className="px-6 py-4">
                <EditableText  className="custom-editable-text"
                  value={user.website}
                  onChange={(value) => handleEdit(user.id, 'website', value)}
                />
              </td> {/* Changed class to className */}
              <td className="px-6 py-4 space-x-3">  {/* Changed class to className */}
                <button className='bg-blue-600 text-white font-bold px-2 py-1 rounded-sm' onClick={() => updateuser(user.id)}>Update</button>  {/* Changed class to className */}
                <button className='bg-red-500 text-white font-bold px-2 py-1 rounded-sm' onClick={() => deleteuser(user.id)}>Delete</button>  {/* Changed class to className */}
              </td>
            </tr>)}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td><InputGroup value={name} placeholder='Enter Name...' onChange={(e) => setName(e.target.value)} /></td>
            <td><InputGroup value={email} placeholder='Enter Email...' onChange={(e) => setEmail(e.target.value)} /></td>  {/* Corrected the onChange handler */}
            <td>
              <InputGroup
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder='Enter Website...'
              />
            </td>
            <td><Button intent='success' className='ml-10' onClick={addUser}>Add user</Button></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
