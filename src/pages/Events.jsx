import "./../styles/Events.css";

function Events() {

  const events = [
    {
      title: "Hackathon 2026",
      date: "15 July 2026",
      location: "JIT Auditorium"
    },
    {
      title: "AI Workshop",
      date: "20 July 2026",
      location: "CSE Seminar Hall"
    },
    {
      title: "Placement Training",
      date: "25 July 2026",
      location: "Main Block"
    }
  ];

  return (
    <div className="events-page">

      <div className="events-hero">

        <div className="hero-badge">🎉 EVENTS HUB</div>

        <h1 className="hero-title">Events</h1>
        <h2 className="hero-subtitle">Don't miss what's happening on campus.</h2>

        <p className="hero-desc">
          Discover upcoming workshops, hackathons, and training
          sessions, and register before seats run out.
        </p>

        <div className="hero-icon">📅</div>

      </div>

      <div className="events-grid">

        {events.map((event, index) => (

          <div
            key={index}
            className="event-card"
          >

            <h2>{event.title}</h2>

            <p><span className="event-icon">📅</span>{event.date}</p>

            <p><span className="event-icon">📍</span>{event.location}</p>

            <button className="register-btn">
              Register
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Events;
