import React from 'react'
import styles from './About.module.css';
export default function About() {
  return (
    <>
      <body>

        <header>
          <h1>About Our iNotebook App</h1>
        </header>

        <section className={styles.about-content}>
          <div className={styles.container}>
            <h2>Our Story</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          </div>
        </section>

        <section className={styles.team-section}>
          <div className="container">
            <h2>Meet Our Team</h2>

            <div className={styles.team-member}>
              <img src="team-member1.jpg" alt="Team Member 1" />
                <h3>John Doe</h3>
                <p>Co-Founder</p>
            </div>

            <div className={styles.team-member}>
              <img src="team-member2.jpg" alt="Team Member 2" />
                <h3>Jane Smith</h3>
                <p>Lead Developer</p>
            </div>

            {/* <!-- Add more team members as needed --> */}

          </div>
        </section>

        <footer>
          <p>&copy; 2023 iNotebook. All rights reserved.</p>
        </footer>

      </body>
    </>
  )
}