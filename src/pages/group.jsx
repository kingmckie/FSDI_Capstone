import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import DataContext from '../state/dataContext';
import ChatDetail from '../components/ChatDetail';
import { getDatabase } from 'firebase/database';




import './group.css'; // Import your CSS file for styling
import db from '../firebase';

function Group() {
  const { id } = useParams();
  const { user } = useContext(DataContext);
  const [chatData, setChatData] = useState(null);
/*
  useEffect(() => {
    const chatRef = ref(db, `chats/${id}`);

    // Set up real-time listener
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      // Handle the data update, e.g., set it to state
      setChatData(data);
    });

    // Cleanup function
    return () => {
      // Detach the listener when the component unmounts
      unsubscribe();
    };
  }, [id]);*/

  const events = [
    {
      id: 1,
      title: 'Outdoor Adventure',
      description: 'Join us for an exciting outdoor adventure!',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Adventure Park',
      image: '/images/hash house harriers.jpeg',
    },
    {
      id: 2,
      title: 'Tech Meetup',
      description: 'A meetup for tech enthusiasts and professionals.',
      date: '2024-02-20',
      time: '6:30 PM',
      location: 'Tech Hub',
      image: '/images/tech meetups.jpeg',
    },
    {
      id: 3,
      title: 'Hiking Expedition',
      description: 'Explore nature with our hiking expedition.',
      date: '2024-03-05',
      time: '9:00 AM',
      location: 'Mountain Trail',
      image: '/images/usmc silkies.jpg',
    },
    {
      id: 4,
      title: 'Car Enthusiasts Meetup',
      description: 'Connect with fellow car enthusiasts.',
      date: '2024-03-10',
      time: '7:00 PM',
      location: 'Auto Club Garage',
      image: '/images/car enthusiasts.jpg',
    },
    // Add more events as needed
  ];

  return (
    <div className="group-container">
      <h1 className="group-title">Group Page</h1>

      <div className="events-container">
        {events.map((event) => (
          <div key={event.id} className="event">
            <h2>{event.title}</h2>
            <img src={event.image} alt={event.title} />
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>

            {/* Link to the ChatDetail component */}
            <Link to={`/chat/${event.id}`} className="chat-button">
              Chat in {event.title}
            </Link>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Group;







