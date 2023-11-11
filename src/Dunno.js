/*import React, { useState, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const YourMajesticComponent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [username, setUsername] = useState('user'); 
  const imageUploadInputRef = useRef();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleImageUpload = () => {
    imageUploadInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const postContent = async () => {
    try {
      const response = await fetch('http://localhost:3000/post-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, username }),
      });

      if (response.ok) {
        console.log('Content posted successfully!');
        // You may want to update your React state or perform other actions here
      } else {
        console.error('Content post failed!');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    
    <div>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>

      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={handleUsernameChange} placeholder='username'/>
      </div>

      <div>
        <button onClick={handleImageUpload}>Choose Image</button>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={imageUploadInputRef}
        />
      </div>

      <ReactQuill theme="snow" value={content} onChange={handleEditorChange} style={{ height: '300px' }} />

      <div>
        <img
          style={{ maxWidth: '100%', maxHeight: '300px', display: imagePreview ? 'block' : 'none' }}
          src={imagePreview}
          alt="Image Preview"
        />
      </div>

      <div>
        <button onClick={postContent}>Post</button>
      </div>
    </div>
  );
};

export default YourMajesticComponent;
*/

/*
succesful attemp
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const RichTextEditor = () => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '3.5fr 1fr', // Text editor is 3.5 times larger than the rule box
    gap: '20px',
    padding: '20px',
  };

  const headerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  };

  const appIconStyle = {
    width: '40px', // Adjust the width of the app icon as needed
    height: '40px', // Adjust the height of the app icon as needed
  };

  const profileButtonStyle = {
    cursor: 'pointer',
    marginLeft: 'auto', // Push the profile button to the right
  };

  const titleBoxStyle = {
    gridArea: '2 / 1 / 3 / 3', // Spans the full width of the container
    marginBottom: '20px',
  };

  const editorStyle = {
    gridArea: '3 / 1 / 6 / 2', // Spans three rows
    width: '100%', // Set width to 100%
  };

  const ruleBoxStyle = {
    gridArea: '3 / 2 / 6 / 3', // Spans three rows
    marginLeft: '40px',
    padding: '20px',
    background: '#f5f5f5',
    borderRadius: '4px',
  };

  const ruleDropdownStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '8px',
  };

  const buttonContainerStyle = {
    gridArea: '6 / 1 / 7 / 3',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const content = ''; // Initialize your content state
  const handleEditorChange = (value) => {
    // Handle editor content change
    console.log(value);
  };
*/
/*
  return (
    <div>
      { }
      <div style={headerStyle}>
        <div>
          <img src="path/to/app-icon.png" alt="App Icon" style={appIconStyle} />
        </div>
        <div style={profileButtonStyle}>Profile Button</div>
      </div>

      { }
      <div style={containerStyle}>
        { }
        <div style={titleBoxStyle}>
          <input type="text" placeholder="Enter title" style={{ width: '100%' }} />
        </div>

        
        { }
        <div style={editorStyle}>
        <button style={{ marginTop: '10px' }}>Insert Image</button>
          <ReactQuill theme="snow" value={content} onChange={handleEditorChange} style={{ width: '100%', height: '300px' }} />
        </div>

        { }
        <div style={ruleBoxStyle}>
          <h3>Community Rules</h3>
          <div>
            <label htmlFor="rule1" style={{ fontWeight: 'bold' }}>Rule 1:</label>
            <div>Don't be rude to others</div>
          </div>
          <div>
            <label htmlFor="rule2" style={{ fontWeight: 'bold' }}>Rule 2:</label>
            <div>Don't spam</div>
          </div>
          { }
        </div>

        { }
        <div style={buttonContainerStyle}>
          <button>Save Draft</button>
          <button>Post</button>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
*/

import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const RichTextEditor = ({
  initialContent = '',
  onSaveDraft = () => {},
  onPost = () => {},
  appIconSrc = '',
  profileButtonText = 'Profile Button',
  chooseImageButtonText = 'Choose Image',
  saveDraftButtonText = 'Save Draft',
  postButtonText = 'Post',
}) => {
  const [content, setContent] = useState(initialContent);
  const imageUploadInputRef = useRef(null);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '3.5fr 1fr', // Text editor is 3.5 times larger than the rule box
    gap: '20px',
    padding: '20px',
  };

  const headerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  };

  const appIconStyle = {
    width: '40px', // Adjust the width of the app icon as needed
    height: '40px', // Adjust the height of the app icon as needed
  };

  const profileButtonStyle = {
    cursor: 'pointer',
    marginLeft: 'auto', // Push the profile button to the right
  };

  const titleBoxStyle = {
    gridArea: '2 / 1 / 3 / 3', // Spans the full width of the container
    marginBottom: '20px',
  };

  const editorStyle = {
    gridArea: '3 / 1 / 5 / 3', // Spans two rows
    width: '100%', // Set width to 100%
  };

  const ruleBoxStyle = {
    gridArea: '5 / 1 / 7 / 3', // Spans two rows
    padding: '20px',
    background: '#f5f5f5',
    borderRadius: '4px',
  };

  const buttonContainerStyle = {
    marginTop: '10px', // Adjust the top margin
    display: 'flex',
    justifyContent: 'space-between',
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleImageUpload = () => {
    // Trigger the hidden file input
    imageUploadInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the file as needed (you might want to upload it to a server or display preview)
      // For now, let's display it in the editor
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        // Use the ReactQuill API to insert the image
        const range = quillRef.current.getEditor().getSelection();
        quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(
          range.index,
          `<img src="${imageUrl}" alt="Uploaded Image" />`
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDraft = () => {
    onSaveDraft(content);
  };

  const handlePost = () => {
    onPost(content);
  };

  // Create a ref for the ReactQuill instance
  const quillRef = useRef();

  return (
    <div>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <img src={appIconSrc} alt="App Icon" style={appIconStyle} />
        </div>
        <div style={profileButtonStyle}>{profileButtonText}</div>
      </div>

      {/* Main Content */}
      <div style={containerStyle}>
        {/* Title Box */}
        <div style={titleBoxStyle}>
          <input type="text" placeholder="Enter title" style={{ width: '100%' }} />
        </div>

        {/* Text Editor */}
        <div style={editorStyle}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleEditorChange}
            style={{ width: '100%', height: '300px' }}
            ref={quillRef}
          />
        </div>

        {/* "Choose Image" Button */}
        <div>
          <button onClick={handleImageUpload}>{chooseImageButtonText}</button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            ref={imageUploadInputRef}
          />
        </div>

        {/* Rule Box */}
        <div style={ruleBoxStyle}>
          <h3>Community Rules</h3>
          <div>
            <label htmlFor="rule1" style={{ fontWeight: 'bold' }}>Rule 1:</label>
            <div>Follow Reddiquette</div>
          </div>
          <div>
            <label htmlFor="rule2" style={{ fontWeight: 'bold' }}>Rule 2:</label>
            <div>No spam or self-promotion</div>
          </div>
          {/* Add more rules as needed */}
        </div>

        {/* Button Container */}
        <div style={buttonContainerStyle}>
          <button onClick={handleSaveDraft}>{saveDraftButtonText}</button>
          <button onClick={handlePost}>{postButtonText}</button>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;