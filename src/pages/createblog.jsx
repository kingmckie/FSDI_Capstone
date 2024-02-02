import './createblog.css';
import { useState, useContext, useEffect } from 'react';
import BlogFeed from '../components/blogfeed';
import DataContext from '../state/dataContext';
import { addDoc, collection, getDocs, where } from 'firebase/firestore';
import db from '../firebase';

function CreateBlog() {
  const [blog, setBlog] = useState({
    title: '',
    keywords: '',
    content: '',
    url: '', // New field for URL
  });

  const { user, userBlogs, updateUserBlogs } = useContext(DataContext);

  useEffect(() => {
    // Fetch blogs for the logged-in user when the component mounts
    if (user.isLoggedIn) {
      loadBlogsForUser();
    }
  }, [user.isLoggedIn]); // Trigger the effect when the login state changes

  async function loadBlogsForUser() {
    try {
      const userBlogsQuery = await getDocs(collection(db, 'blogs'), where('authorEmail', '==', user.email));

      const blogs = [];
      userBlogsQuery.forEach((item) => {
        const blog = {
          id: item.id,
          ...item.data(),
        };
        blogs.push(blog);
      });

      updateUserBlogs(blogs); // Update user blogs in the context
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  }

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

    // Save to firebase with additional data like authorEmail
    const newBlog = {
      ...blog,
      authorEmail: user.email,
    };

    addDoc(collection(db, 'blogs'), newBlog)
      .then(() => {
        console.log('Blog post saved successfully.');
        // Clear form after successful save
        setBlog({
          title: '',
          keywords: '',
          content: '',
          url: '', // Clear URL field as well
        });

        // Refresh user's blogs
        loadBlogsForUser();
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

      {/* Display the created blogs using BlogFeed component */}
      <BlogFeed />
    </div>
  );
}

export default CreateBlog;
