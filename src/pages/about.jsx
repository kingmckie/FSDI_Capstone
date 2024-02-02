import './about.css';


function About() {
  return (
    <div className="about">
      <h1 className="about-title">About Us</h1>

      {/* Creator Section */}
      <div className="section">
        <h2>Everald Mark McKie</h2>
        <img src='/images/st kitt.jpg' alt="Creator" />
        <p>
          Welcome to Hares and Wabbit, the most popular social meetup sites for adventures! Our platform was created by Everald Mark McKie, a passionate adventurer who envisioned bringing people together to explore the world around them.
        </p>
      </div>

      {/* Additional Section 1 */}
      <div className="section">
        <h2>John Doe</h2>
        <img src="/images/john doe.jpeg" alt="Placeholder 1" />
        <p>
          Another adventurer, John Doe, joined the Hares and Wabbit community to share thrilling experiences with fellow explorers.
        </p>
      </div>

      {/* Additional Section 2 */}
      <div className="section">
        <h2>Jane Smith</h2>
        <img src="/images/jane smith.jpeg" alt="Placeholder 2" />
        <p>
          Meet Jane Smith, an outdoor enthusiast who found a second home in Hares and Wabbit, connecting with like-minded individuals on exciting journeys.
        </p>
      </div>

      {/* Additional Section 3 */}
      <div className="section">
        <h2>Chris Williams</h2>
        <img src="/images/chris williams.jpeg" alt="Placeholder 3" />
        <p>
          Chris Williams, a nature lover and thrill-seeker, discovered the joy of exploration through Hares and Wabbit, fostering friendships and unforgettable adventures.
        </p>
      </div>
    </div>
  );
}

export default About;

