import { useEffect, useState } from 'react';
import './blogfeed.css';

import { getDocs, collection } from 'firebase/firestore';
import  db from '../firebase';

function BlogFeed() {
  const [blogs, setBlogs] = useState([]);

  async function loadBlogsFromDB() {
    try {
      const allBlogsQuery = await getDocs(collection(db, 'blogs'));

      const allBlogs = [];
      allBlogsQuery.forEach((item) => {
        const blog = {
          id: item.id,
          ...item.data(),
        };
        allBlogs.push(blog);
      });

      setBlogs(allBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  }

  // Fetch blogs when the component mounts
  useEffect(() => {
    loadBlogsFromDB();
  }, []);

  return (
    <div className="blogfeed page">
      <h1>All my Blog Posts. Please enjoy the creative and curious nature of mankind</h1>

      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          {/* Add more elements to display other blog information */}
        </div>
      ))}
    </div>
  );
}

export default BlogFeed;
