import { useState } from 'react'

import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:3000/images', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          setMessage('File uploaded successfully');
        } else {
          setMessage('Failed to upload file');
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setMessage('Internal Server Error');
      });
  };
  return (
    <>
      <div>
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>Upload</button>
      {message && <p>{message}</p>} 
      </div>
      
    </>
  )
}

export default App
