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

      <h1>🎉 College Events</h1>

      <div className="events-grid">

        {events.map((event, index) => (

          <div
            key={index}
            className="event-card"
          >

            <h2>{event.title}</h2>

            <p>📅 {event.date}</p>

            <p>📍 {event.location}</p>

            <button>
              Register
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Events;