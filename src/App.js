import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';


const RichTextEditor = ({
  onSaveDraft,
  appIconSrc,
  profileButtonText = 'profile',
  chooseImageButtonText = 'Choose Image',
  saveDraftButtonText = 'Save Draft',
  postButtonText = 'Post',
}) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const imageUploadInputRef = useRef(null);
  const [title, setTitle] = useState('');

  const containerStyle = {
    background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    height: '100vh',
    marginTop: '0px', 
  };

  const profileButtonStyle = {
    cursor: 'pointer',
    marginLeft: 'auto',
  };
  
  const headerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '20px',
    marginLeft: '20px',
  };

  const appIconStyle = {
    width: '40px',
    height: '40px',
  };

  const greyBoxStyle = {
    background: 'grey',
    borderRadius: '4px',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: '3.5fr 1fr',
    gap: '20px',
    marginLeft: '40px',
    marginRight: '40px',
    marginBottom: '20px',
    borderTop: '4000px',
  };

  const titleBoxStyle = {
    background: 'white',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '20px', // Adjusted margin-top
  };

  const editorStyle = {
    background: 'white',
    paddingBottom: '50px',
    borderRadius: '4px',
    marginBottom: '20px', // Adjusted margin-bottom
  };

  const buttonContainerStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const rulesContainerStyle = {
    marginTop: '59px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: '20px', // Adjusted margin-right
  };

  const ruleBoxStyle = {
    background: '#f5f5f5',
    borderRadius: '4px',
    padding: '20px',
    height: '380px',
    width: '100%',
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleImageUpload = () => {
    imageUploadInputRef.current.click();
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage({
          file,
          dataURL: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handlePost = async () => {
    try {
      // Get the current date
      const currentDate = new Date();
  
      // Get the username (replace 'YourUsername' with the actual logic to retrieve the username)
      const username = 'YourUsername';
      const upvotes = 0;
  
      if (image) {
        // Upload image
        const formData = new FormData();
        formData.append('image', image.file);
  
        const uploadResponse = await axios.post('/upload', formData);
        const imageUrl = uploadResponse.data.imageUrl;
  
        // Save content to MongoDB with image and additional details
        await axios.post('/saveContent', {
          title: 'Your Title', // Replace with the actual title
          content,
          imageUrl,
          date: currentDate,
          username,
          upvotes,
          IsPost: 1,
        });
      } else {
        // Save content to MongoDB without image and additional details
        await axios.post('/saveContent', {
          title: 'Your Title', // Replace with the actual title
          content,
          date: currentDate,
          username,
          upvotes,
          IsPost: 1,
        });
      }
  
      // Clear the content and image state
      setContent('');
      setImage(null);
  
      // Trigger any additional post actions or UI updates as needed
    } catch (error) {
      console.error('Error posting content:', error);
      // Handle error, display a message, or perform other actions
    }
  };
  

  const handleSaveDraft = async () => {
    try {
      // Check if both title and content are present
      if (!title || !content) {
        // Handle the case where either title or content is missing
        console.error('Title and content are required.');
        return;
      }
  
      // Send a request to save the draft with Is_post set to 0
      await axios.post('/saveDraft', {
        title,
        content,
        imageUrl: image ? image.file : null,
        Is_post: 0, // Set Is_post to 0 for drafts
        username: 'user123', // Replace with the actual username or fetch it from the user's session
      });
  
      // Clear the content, title, and image state
      setContent('');
      setTitle(''); // Clear the title state
      setImage(null);
  
      // Trigger any additional actions or UI updates as needed
    } catch (error) {
      console.error('Error saving draft:', error);
      // Handle error, display a message, or perform other actions
    }
  };
  

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <img src={appIconSrc} alt="App Icon" style={appIconStyle} />
        </div>
        <div style={profileButtonStyle}>{profileButtonText}</div>
      </div>

      {/* Main Content */}
      <div style={containerStyle}>
        {/* Grey Box */}
        <div style={greyBoxStyle}>
          {/* Text Box Area */}
          <div>
            {/* "Choose Image" Button */}
<div>
  <button className="btn btn-info" onClick={handleImageUpload}>
    {chooseImageButtonText}
  </button>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    style={{ display: 'none' }}
    ref={imageUploadInputRef}
  />
</div>

            {/* Title Box */}
            <div style={titleBoxStyle}>
              <input
                type="text"
                placeholder="Enter title"
                style={{ width: '100%', fontWeight: 'bold' }}
              />
            </div>

            {/* Text Editor */}
            <div style={editorStyle}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleEditorChange}
                style={{ width: '100%', height: '300px' }}
              />
            </div>
          </div>

          {/* Rules Area */}
          <div style={rulesContainerStyle}>
            <div style={ruleBoxStyle}>
              <h3>Community Rules</h3>
              <div>
                <label htmlFor="rule1" style={{ fontWeight: 'bold' }}>
                  Rule 1:
                </label>
                <div>Don't be mean</div>
              </div>
              <div>
                <label htmlFor="rule2" style={{ fontWeight: 'bold' }}>
                  Rule 2:
                </label>
                <div>No spam or self-promotion</div>
              </div>
              {/* Add more rules as needed */}
            </div>
          </div>

          {/* Button Container */}
          <div style={buttonContainerStyle}>
            <button className="btn btn-primary" onClick={handleSaveDraft}>
              {saveDraftButtonText}
            </button>
            <button className="btn btn-success" onClick={handlePost}>
              {postButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
