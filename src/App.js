import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
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

const DonationForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age, reason, amount });
    // Clear form fields after submission
    setName('');
    setAge('');
    setReason('');
    setAmount('');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Donation Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={{ marginBottom: '10px' }} />
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" style={{ marginBottom: '10px' }} />
        <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for donation" style={{ marginBottom: '10px' }} />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount requested" style={{ marginBottom: '10px' }} />
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
};

const DonationGoalsPage = ({ donationGoals, addDonationGoal, deleteDonationGoal, donateToGoal }) => {
  useEffect(() => {
    createPieCharts();
  }, [donationGoals]);

  const createPieCharts = () => {
    donationGoals.forEach(goal => {
      const ctx = document.getElementById(`donationPieChart-${goal.id}`);
      if (ctx) {
        Chart.getChart(ctx)?.destroy();

        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Amount Raised', 'Amount Needed'],
            datasets: [{
              label: 'Donation Goal',
              data: [goal.amountRaised, goal.amountNeeded - goal.amountRaised],
              backgroundColor: [
                'rgb(75, 192, 192)',
                'rgb(255, 99, 132)'
              ],
              hoverOffset: 4
            }]
          }
        });
      }
    });
  };

  const handleAddDonationGoal = (data) => {
    const newGoal = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID for the new goal
      title: data.reason,
      description: `Requested by ${data.name}, ${data.age} years old`,
      amountRaised: 0,
      amountNeeded: parseFloat(data.amount)
    };
    addDonationGoal(newGoal);
  };

  const handleDeleteGoal = (id) => {
    deleteDonationGoal(id);
  };

  const handleDonateToGoal = (id, amount) => {
    donateToGoal(id, amount);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Donation Goals</h1>
      <DonationForm onSubmit={handleAddDonationGoal} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {donationGoals.map(goal => (
          <div key={goal.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', cursor: 'pointer' }}>
            <Link to={`/private-goal/${goal.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
              <canvas id={`donationPieChart-${goal.id}`} width="200" height="200"></canvas>
              <p>Amount Raised: ${goal.amountRaised}</p>
              <p>Amount Needed: ${goal.amountNeeded}</p>
            </Link>
          </div>
        ))}
      </div>
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
    // Implement deletion logic here
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Manage/Delete Profile</h2>
      <button onClick={handleDeleteProfile}>Delete Profile</button>
    </div>
  );
};

const CreateAccountPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Create Account</h2>
      <p>Form for creating an account goes here</p>
    </div>
  );
};

const PrivateDonationGoal = () => {
  const { id } = useParams();

  // Dummy data for testing
  const donationGoal = {
    id: id,
    title: "Test Donation Goal",
    description: "This is a test donation goal.",
    amountRaised: 100,
    amountNeeded: 500
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{donationGoal.title}</h2>
      <p>{donationGoal.description}</p>
      <p>Amount Raised: ${donationGoal.amountRaised}</p>
      <p>Amount Needed: ${donationGoal.amountNeeded}</p>
      <input type="number" placeholder="Enter amount to donate" />
      <button>Donate</button>
    </div>
  );
};

const App = () => {
  const [donationGoals, setDonationGoals] = useState([]);

  const addDonationGoal = (goal) => {
    setDonationGoals([...donationGoals, goal]);
  };

  const deleteDonationGoal = (id) => {
    setDonationGoals(donationGoals.filter(goal => goal.id !== id));
  };

  const donateToGoal = (id, amount) => {
    setDonationGoals(donationGoals.map(goal => {
      if (goal.id === id) {
        return { ...goal, amountRaised: parseFloat(goal.amountRaised) + parseFloat(amount) };
      }
      return goal;
    }));
  };

  return (
    <Router>
      <div>
        <nav style={{ background: '#fff', color: '#000', padding: '10px', borderBottom: '1px solid #000' }}>
          <div style={{ textAlign: 'right', paddingRight: '10px' }}>
            <Link to="/user-profile" style={{ textDecoration: 'none', color: '#ff6600', paddingRight: '10px', fontWeight: 'bold', fontSize: '12px' }}>Create/Manage Accounts</Link>
          </div>
          <ul style={{ listStyleType: 'none', margin: '0', padding: '0', display: 'flex', justifyContent: 'space-evenly' }}>
            <li><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></li>
            <li><Link to="/donation-goals" style={{ textDecoration: 'none' }}>Donation Goals</Link></li>
            <li><Link to="/create-account" style={{ textDecoration: 'none' }}>Create Account</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home donationGoals={donationGoals} />} />
          <Route path="/donation-goals" element={<DonationGoalsPage donationGoals={donationGoals} addDonationGoal={addDonationGoal} deleteDonationGoal={deleteDonationGoal} donateToGoal={donateToGoal} />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/manage-profile" element={<ManageProfilePage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/private-goal/:id" element={<PrivateDonationGoal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
