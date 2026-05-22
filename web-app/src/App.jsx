import { useState } from "react";

function App() {

  const API_BASE_URL = "https://api-gateway-h8sg.onrender.com";

  const [activePage, setActivePage] = useState("home");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [jsonResult, setJsonResult] = useState(null);

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: ""
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [bookingForm, setBookingForm] = useState({
    startingLocation: "",
    endingLocation: "",
    bookingDateTime: "",
    passengers: "",
    cabType: ""
  });

  const [locationForm, setLocationForm] = useState({
    locationName: "",
    address: "",
    latitude: "",
    longitude: ""
  });

  const handleChange = (setter, form) => (e) => {
    setter({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async (e) => {

    e.preventDefault();

    const response = await fetch(
      `${API_BASE_URL}/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerForm)
      }
    );

    const data = await response.json();

    setMessage(data.message);
    setJsonResult(data);

  };

  const loginUser = async (e) => {

    e.preventDefault();

    const response = await fetch(
      `${API_BASE_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginForm)
      }
    );

    const data = await response.json();

    setMessage(data.message);
    setJsonResult(data);

    if (data.user) {
      setUserId(data.user._id);
    }

  };

  const createBooking = async (e) => {

    e.preventDefault();

    const response = await fetch(
      `${API_BASE_URL}/api/bookings/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          ...bookingForm
        })
      }
    );

    const data = await response.json();

    setMessage(data.message);
    setJsonResult(data);

  };

  const addLocation = async (e) => {

    e.preventDefault();

    const response = await fetch(
      `${API_BASE_URL}/api/locations/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          ...locationForm
        })
      }
    );

    const data = await response.json();

    setMessage(data.message);
    setJsonResult(data);

  };

  const loadNotifications = async () => {

    const response = await fetch(
      `${API_BASE_URL}/api/users/${userId}/notifications`
    );

    const data = await response.json();

    setNotifications(data.notifications || []);
    setJsonResult(data);

  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>

      <h1>Cab Booking Platform</h1>

      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setActivePage("home")}>Home</button>

        <button onClick={() => setActivePage("register")}>
          Register
        </button>

        <button onClick={() => setActivePage("login")}>
          Login
        </button>

        <button onClick={() => setActivePage("booking")}>
          Create Booking
        </button>

        <button onClick={() => setActivePage("locations")}>
          Locations
        </button>

        <button onClick={() => setActivePage("inbox")}>
          Inbox
        </button>
      </nav>

      <h3>{message}</h3>

      {activePage === "home" && (
        <div>
          <h2>Welcome to the Cab Booking Platform</h2>

          <p>Logged in User ID:</p>

          <b>{userId}</b>
        </div>
      )}

      {activePage === "register" && (
        <div>

          <h2>Register</h2>

          <form onSubmit={registerUser}>

            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange(setRegisterForm, registerForm)}
            />

            <br /><br />

            <input
              name="surname"
              placeholder="Surname"
              onChange={handleChange(setRegisterForm, registerForm)}
            />

            <br /><br />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange(setRegisterForm, registerForm)}
            />

            <br /><br />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange(setRegisterForm, registerForm)}
            />

            <br /><br />

            <button type="submit">
              Register
            </button>

          </form>

        </div>
      )}

      {activePage === "login" && (
        <div>

          <h2>Login</h2>

          <form onSubmit={loginUser}>

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange(setLoginForm, loginForm)}
            />

            <br /><br />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange(setLoginForm, loginForm)}
            />

            <br /><br />

            <button type="submit">
              Login
            </button>

          </form>

        </div>
      )}

      {activePage === "booking" && (
        <div>

          <h2>Create Booking</h2>

          <form onSubmit={createBooking}>

            <input
              name="startingLocation"
              placeholder="Starting Location"
              onChange={handleChange(setBookingForm, bookingForm)}
            />

            <br /><br />

            <input
              name="endingLocation"
              placeholder="Ending Location"
              onChange={handleChange(setBookingForm, bookingForm)}
            />

            <br /><br />

            <input
              name="bookingDateTime"
              placeholder="2026-05-21T18:00:00"
              onChange={handleChange(setBookingForm, bookingForm)}
            />

            <br /><br />

            <input
              name="passengers"
              placeholder="Passengers"
              onChange={handleChange(setBookingForm, bookingForm)}
            />

            <br /><br />

            <input
              name="cabType"
              placeholder="Economic / Premium / Executive"
              onChange={handleChange(setBookingForm, bookingForm)}
            />

            <br /><br />

            <button type="submit">
              Create Booking
            </button>

          </form>

        </div>
      )}

      {activePage === "locations" && (
        <div>

          <h2>Add Favourite Location</h2>

          <form onSubmit={addLocation}>

            <input
              name="locationName"
              placeholder="Location Name"
              onChange={handleChange(setLocationForm, locationForm)}
            />

            <br /><br />

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange(setLocationForm, locationForm)}
            />

            <br /><br />

            <input
              name="latitude"
              placeholder="Latitude"
              onChange={handleChange(setLocationForm, locationForm)}
            />

            <br /><br />

            <input
              name="longitude"
              placeholder="Longitude"
              onChange={handleChange(setLocationForm, locationForm)}
            />

            <br /><br />

            <button type="submit">
              Save Location
            </button>

          </form>

        </div>
      )}

      {activePage === "inbox" && (
        <div>

          <h2>Notifications Inbox</h2>

          <button onClick={loadNotifications}>
            Load Notifications
          </button>

          <ul>

            {notifications.map((notification, index) => (
              <li key={index}>
                {notification.message}
              </li>
            ))}

          </ul>

        </div>
      )}

      {jsonResult && (
        <div style={{ marginTop: "30px" }}>

          <h2>JSON Response Display</h2>

          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "left"
            }}
          >
            {JSON.stringify(jsonResult, null, 2)}
          </pre>

        </div>
      )}

    </div>
  );

}

export default App;