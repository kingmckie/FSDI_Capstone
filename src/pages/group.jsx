import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link

import './group.css';

function Group() {
  const events = [
    {
      id: 1,
      title: 'Outdoor Adventure',
      description: 'Join us for an exciting outdoor adventure!',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Adventure Park',
      image: '/images/hash house harriers.jpeg', // Add the image file in your project
    },
    {
      id: 2,
      title: 'Tech Meetup',
      description: 'A meetup for tech enthusiasts and professionals.',
      date: '2024-02-20',
      time: '6:30 PM',
      location: 'Tech Hub',
      image: '/images/tech meetups.jpeg', // Add the image file in your project
    },
    {
      id: 3,
      title: 'Hiking Expedition',
      description: 'Explore nature with our hiking expedition.',
      date: '2024-03-05',
      time: '9:00 AM',
      location: 'Mountain Trail',
      image: '/images/usmc silkies.jpg', // Add the image file in your project
    },
    {
      id: 4,
      title: 'Car Enthusiasts Meetup',
      description: 'Connect with fellow car enthusiasts.',
      date: '2024-03-10',
      time: '7:00 PM',
      location: 'Auto Club Garage',
      image: '/images/car enthusiasts.jpg', // Add the image file in your project
    },
    // Add more events as needed
  ];

  return (
    <div className="group">
      <h1>Group Page</h1>

      <div className="events">
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
