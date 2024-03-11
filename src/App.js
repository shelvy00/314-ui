import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js/auto';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';

// Create a context for managing authentication state
const AuthContext = React.createContext();

const Home = ({ donationGoals }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to Don't Hate!, Donate!</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <img src={image1} alt="Placeholder" style={{ width: '200px', height: '200px' }} />
        <img src={image2} alt="Placeholder" style={{ width: '200px', height: '200px' }} />
        <img src={image3} alt="Placeholder" style={{ width: '200px', height: '200px' }} />
        <img src={image4} alt="Placeholder" style={{ width: '200px', height: '200px' }} />
      </div>
    </div>
  );
};

const DonationForm = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Donation Form</h2>
      <form>
        <input type="text" placeholder="Name" style={{ marginBottom: '10px' }} />
        <input type="email" placeholder="Email" style={{ marginBottom: '10px' }} />
        <input type="tel" placeholder="Phone Number" style={{ marginBottom: '10px' }} />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

const DonationGoalsPage = ({ donationGoals }) => {
  useEffect(() => {
    createPieChart();
  }, [donationGoals]);

  const createPieChart = () => {
    const ctx = document.getElementById('donationPieChart');
    if (ctx && donationGoals.length > 0) {
      Chart.getChart(ctx)?.destroy();

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: donationGoals.map(goal => goal.title),
          datasets: [{
            label: 'Donation Goals',
            data: donationGoals.map(goal => goal.amountRaised),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)'
            ],
            hoverOffset: 4
          }]
        }
      });
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Donation Goals</h1>
      <div style={{ width: '50%', margin: 'auto' }}>
        <canvas id="donationPieChart" width="400" height="400"></canvas>
      </div>
      {donationGoals.map(goal => (
        <DonationGoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

// Request Help Page Component
const RequestHelpPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Request Help</h2>
      <p>Form for requesting help goes here</p>
    </div>
  );
};

const UserProfilePage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>User Profile</h2>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input type="text" placeholder="Name" style={{ marginBottom: '10px' }} />
        <input type="email" placeholder="Email" style={{ marginBottom: '10px' }} />
        <input type="text" placeholder="Address" style={{ marginBottom: '10px' }} />
        <input type="tel" placeholder="Phone Number" style={{ marginBottom: '10px' }} />
        <input type="password" placeholder="Password" style={{ marginBottom: '10px' }} />
        <Link to="/manage-profile" style={{ textDecoration: 'none', marginBottom: '10px' }}>Manage/Delete Profile</Link>
      </form>
    </div>
  );
};

const ManageProfilePage = () => {
  const handleDeleteProfile = () => {
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Manage/Delete Profile</h2>
      <button onClick={handleDeleteProfile}>Delete Profile</button>
    </div>
  );
};

// Create Account Page Component
const CreateAccountPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Create Account</h2>
      <p>Form for creating an account goes here</p>
    </div>
  );
};

// Donation Goal Card Component
const DonationGoalCard = ({ goal }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
      <h3>{goal.title}</h3>
      <p>{goal.description}</p>
      <p>Amount Raised: ${goal.amountRaised}</p>
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
    setTimeout(() => setUser({}), 1000); // Remove user data to simulate logout
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <div>
          <nav style={{ background: '#fff', color: '#000', padding: '10px', borderBottom: '1px solid #000' }}>
            <div style={{ textAlign: 'right', paddingRight: '10px' }}>
              {user && (
<Link to="/profile" style={{ textDecoration: 'none', color: '#ff6600', paddingRight: '10px', fontWeight: 'bold', fontSize: '12px' }}>Create/Manage Accounts</Link>
              )}
            </div>
            <ul style={{ listStyleType: 'none', margin: '0', padding: '0', display: 'flex', justifyContent: 'space-evenly' }}>
              <li><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/donate" style={{ textDecoration: 'none' }}>Donate</Link></li>
              <li><Link to="/donation-goals" style={{ textDecoration: 'none' }}>Donation Goals</Link></li>
              <li><Link to="/request-help" style={{ textDecoration: 'none' }}>Request Help</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home donationGoals={donationGoals} />} />
            <Route path="/donate" element={<DonationForm />} />
            <Route path="/donation-goals" element={<DonationGoalsPage donationGoals={donationGoals} />} />
            <Route path="/request-help" element={<RequestHelpPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/manage-profile" element={<ManageProfilePage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
