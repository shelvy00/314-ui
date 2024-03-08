import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

// Create a context for managing authentication state
const AuthContext = createContext();

// Donation Goal Card Component
const DonationGoalCard = ({ goal }) => {
  return (
    <div>
      <h2>{goal.title}</h2>
      <p>{goal.description}</p>
      <p>Amount Raised: ${goal.amountRaised}</p>
    </div>
  );
};

// User Profile Page Component
const UserProfilePage = () => {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: JohnDoe</p>
      <p>Email: johndoe@example.com</p>
      <Link to="/donate">Donate Now</Link>
    </div>
  );
};

// Donation Form Component
const DonationForm = () => {
  return (
    <div>
      <h2>Donation Form</h2>
      <form>
        {/* Form inputs here */}
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

// Main App Component
const App = () => {
  const [donationGoals, setDonationGoals] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch donation goals from API
    axios.get('/api/donation-goals')
      .then(response => setDonationGoals(response.data))
      .catch(error => console.error('Error fetching donation goals:', error));
    
    // Simulate user authentication
    setTimeout(() => setUser({ username: 'JohnDoe', email: 'johndoe@example.com' }), 1000);
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/donate">Donate</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home donationGoals={donationGoals} />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/donate" element={<DonationForm />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

// Home Component
const Home = ({ donationGoals }) => {
  return (
    <div>
      <h1>Welcome to Donation App</h1>
      <h2>Donation Goals</h2>
      {donationGoals.map(goal => (
        <DonationGoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default App;
