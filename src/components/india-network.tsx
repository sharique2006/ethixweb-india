
"use client";

const cities = [
  { name: "Delhi", x: 45, y: 27 },
  { name: "Mumbai", x: 31, y: 60 },
  { name: "Hyderabad", x: 52, y: 58 },
  { name: "Bengaluru", x: 43, y: 75 },
  { name: "Kolkata", x: 76, y: 44 },
];

export default function IndiaNetwork() {
  return (
    <section className="india-network">
      <div className="container india-network-grid">
        <div className="india-network-copy">
          <div className="original-eyebrow">
            <span className="eyebrow-pulse" />
            OUR PRESENCE
          </div>

          <h2>
            Indian Operations
            <br />
            <span>Network.</span>
          </h2>

          <p>
            One connected network. Five major cities. We bring digital
            systems, AI solutions and automation to businesses across India.
          </p>

          <a href="/contact" className="original-primary-button">
            Connect with us <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div
          className="india-network-map india-five-city-map"
          role="img"
          aria-label="Map of India highlighting Delhi, Mumbai, Hyderabad, Bengaluru and Kolkata"
        >
          <div className="india-network-glow" />

          <img
            src="/images/in.svg"
            alt=""
            aria-hidden="true"
            className="india-network-india"
          />

          <div className="india-city-markers">
            {cities.map((city) => (
              <div
                className="india-city-marker"
                key={city.name}
                style={{
                  left: `${city.x}%`,
                  top: `${city.y}%`,
                }}
              >
                <span className="india-city-pin" />
                <span className="india-city-name">{city.name}</span>
              </div>
            ))}
          </div>

          <span className="india-network-caption">
            INDIA / CONNECTED OPERATIONS
          </span>
        </div>
      </div>
    </section>
  );
}
