import { useEffect, useState } from 'react';
import './blogfeed.css';

import { getDocs, collection } from 'firebase/firestore';
import  db from '../firebase';
import { useContext } from 'react';
import DataContext from '../state/dataContext';

function BlogFeed() {
  const [blogs, setBlogs] = useState([]);
  const { userBlogs } = useContext(DataContext);

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
        <div className='blog-card' key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          {blog.url && (
            <p>
              URL: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
            </p>
          )}
          {/* Add more elements to display other blog information */}
        </div>
      ))}
    </div>
  );
}

export default BlogFeed;
