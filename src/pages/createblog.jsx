import './createblog.css';
import { useState } from 'react';

import  db from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function CreateBlog() {
  const [blog, setBlog] = useState({
    title: '',
    keywords: '',
    content: '',
    url: '', // New field for URL
  });

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  }

  function saveBlog() {
    // Check for required fields
    if (!blog.title || !blog.content) {
      alert('Title and Content are required fields.');
      return;
    }

    console.log(blog);

    // Save to firebase
    addDoc(collection(db, 'blogs'), blog)
      .then(() => {
        console.log('Blog post saved successfully.');
        // Clear form after successful save
        setBlog({
          title: '',
          keywords: '',
          content: '',
          url: '', // Clear URL field as well
        });
      })
      .catch((error) => {
        console.error('Error saving blog post:', error);
      });
  }

  return (
    <div className="create page">
      <h1>Create a New Blog Post of Your Experience</h1>

      <div className="form">
        <div>
          <label className="form-label">Title</label>
          <input
            name="title"
            value={blog.title}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div>
          <label className="form-label">Keywords</label>
          <input
            name="keywords"
            value={blog.keywords}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div>
          <label className="form-label">Content</label>
          <textarea
            name="content"
            value={blog.content}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div>
          <label className="form-label">URL</label>
          <input
            name="url"
            value={blog.url}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div>
          <button onClick={saveBlog} className="btn btn-primary">
            Save Blog
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
