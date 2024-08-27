import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Toaster, EditableText } from '@blueprintjs/core';

const Apptoaster = Toaster.create({
  position: "top"
});

export default function App() {
  const [users, setUsers] = useState([]); // Empty state for storing user values

  // Add User
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // 3 empty states for adding user
  const [website, setWebsite] = useState("");

  // Fetching data from server
  useEffect(() => { // This hook for performing a logic after rendering
    fetch('https://jsonplaceholder.typicode.com/users') // Fetching data from URL
      .then((response) => response.json()) // The fetched data should be in JSON format
      .then((json) => setUsers(json)) // Now update the fetched data into state
  }, []);

  // Logic for adding user
  function addUser() {
    const username = name.trim();
    const useremail = email.trim(); // This method removes unwanted space
    const userwebsite = website.trim();

    if (username && useremail && userwebsite) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          username, // POST method for sending data to the server
          useremail,
          userwebsite
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8" // Correct the header
        }
      })
      .then((response) => response.json())
      .then(data => {
        console.log('Response data:', data); // Debugging output
        setUsers([...users, { id: users.length + 1, name: username, email: useremail, website: userwebsite }]);
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

  // Logic for updating user details
  const handleEdit = (id, field, value) => {
    setUsers(users.map(user => user.id === id ? { ...user, [field]: value } : user));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-3 mt-4"> {/* Changed class to className */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white"> {/* Changed class to className */}
        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white hover:text-black"> {/* Changed class to className */}
          <tr>
            <th scope="col" className="px-6 py-3"> {/* Changed class to className */}
              ID
            </th>
            <th scope="col" className="px-6 py-3"> {/* Changed class to className */}
              Name
            </th>
            <th scope="col" className="px-6 py-3"> {/* Changed class to className */}
              Email
            </th>
            <th scope="col" className="px-6 py-3"> {/* Changed class to className */}
              Website
            </th>
            <th scope="col" className="px-6 py-3"> {/* Changed class to className */}
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => ( // Now map all data into table format using map function
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={user.id}> {/* Changed class to className */}
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}</td> {/* Changed class to className */}
              <td className="px-6 py-4">
              <EditableText
                    className="custom-editable-text"
                    value={user.name}
                    onChange={(value) => handleEdit(user.id, 'name', value)}
                    onConfirm={(value) => handleEdit(user.id, 'name', value)}

                    /> 
 

              </td> {/* Changed class to className */}
              <td className="px-6 py-4">
              <EditableText
                className="custom-editable-text"
                value={user.email}
                onChange={(value) => handleEdit(user.id, 'email', value)}
                onConfirm={(value) => handleEdit(user.id, 'email', value)}
              />

              </td> {/* Changed class to className */}
              <td className="px-6 py-4">
                <EditableText
                  value={user.website}
                  onChange={(value) => handleEdit(user.id, 'website', value)}
                  onConfirm={(value) => handleEdit(user.id, 'website', value)}
                />
              </td> {/* Changed class to className */}
              <td className="px-6 py-4 space-x-3"> {/* Changed class to className */}
                <button className='bg-blue-600 text-white font-bold px-2 py-1 rounded-sm'>Update</button> {/* Changed class to className */}
                <button className='bg-red-500 text-white font-bold px-2 py-1 rounded-sm'>Delete</button> {/* Changed class to className */}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td><InputGroup value={name} placeholder='Enter Name...' onChange={(e) => setName(e.target.value)} /></td>
            <td><InputGroup value={email} placeholder='Enter Email...' onChange={(e) => setEmail(e.target.value)} /></td> {/* Corrected the onChange handler */}
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
