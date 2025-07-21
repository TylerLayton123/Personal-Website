import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import ParticleBackground from '../components/ParticleBackground';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';
import './Experiences.css';

const Experiences = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const Experiences = [
    {
      title: 'Frontend Developer',
      location: "Troy, NY",
      date: "Jan 2025 – May 2025",
      employer: "Multidisciplinary Capstone Design / Design Lab",
      description: "- The Design Lab is a \"class\" at RPI which provides a capstone experience intended to prepare students to enter the" +
        " workforce. A team of six students all with different majors are given a multidisciplinary design project by a sponsor to work on throughout" +
        " the semester. \n- Sponsored by Lockheed Martin and in association with Georgia Tech and Purdue University, our team was tasked with" +
        " continuing a project from a previous semester. The project had a variety of moving parts and everyone had a specific role in the group." +
        " I was the frontend developer mostly working on the client application improving its user interface and integrating new technology into" +
        " the system.\n- This multidisciplinary design project was an excellent experience and gave me a sense of how different majors interact" +
        " and work together to complete the same project. Overall, I learned many new skills such as communicating progress or problems that the" +
        " group had with the project to the sponsors from Lockheed Martin."
    },
    {
      title: 'Software Engineering Intern ',
      location: "Clifton, NJ",
      date: "May 2024 - Aug 2024",
      employer: "L3Harris",
      description: "- Working in the Space and Airborne Systems department of L3Harris, I was tasked with designing" +
        " an application from scratch that employees can use to create and manipulate Jenkins files. This" +
        " application reduced the amount of time it takes to write a Jenkins file by 80% saving the company both time and money" +
        "\n- Led a small team of interns to develop both the back-end and front-end using Python and the" +
        " library Tkinter, incorporating my own research and ideas into the project." +
        "\n- Gained a lot more experience with Python, how to develop a full application, and how to work on" +
        " a team with other employees/interns. "

    },
    {
      title: 'Project Lead Developer',
      location: "Troy, NY",
      date: "Sep 2023 – Dec 2023",
      employer: "Rensselaer Center for Open Source (RCOS)",
      description: "- Directed a small team of students to create an open-source game coded in Python utilizing the" +
        "library pygame \n- Designed and implemented a user-friendly jumping mechanic within the game, enabling players to navigate across platforms" +
        "\n- This project helped me to understand how to lead a compact group of developers as well as improve upon my Python coding skills  "
    },
    {
      title: 'Software Engineering Intern ',
      date: "May 2023 – Aug 2023",
      location: "Clifton, NJ",
      employer: "L3Harris",
      description: "- During my first summer at L3Harris I was tasked with improving the user experience of an internally used application that" +
        " would help employees interpret signals sent between two endpoints\n- This “Message Analyzer” not only assisted employees, but also helped" +
        " me to learn Java and gain experience collaborating with other employees"
    },
    {
      title: 'Frontend Engineer',
      date: "Sep 2022 – Dec 2022",
      location: "Troy, NY",
      employer: "Rensselaer Center for Open Source (RCOS)",
      description: "- Collaborated in a team to develop the user-interface of an open-source analog circuit simulator to" +
        " help students understand the concepts of analog circuit design \n- Implemented previous academic knowledge and work experience" +
        " into the simulation to create a more accurate circuit design"
    },
  ];

  return (
    <div className="Experiences-page">
      <ParticleBackground contentSection="true" />

      <Header setSettingsOpen={setSettingsOpen} />

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <main className="Experiences-content">
        <div className="Experiences-title-box">
          <h1 className="Experiences-title">Experiences</h1>
        </div>

        <div className="Experiences-grid">
          {Experiences.map((experience, index) => (
            <div key={index} className="Experiences-card">
              <div className="Experiences-row vertical-stack">
                <h2 className="Experiences-title-left">{experience.title}</h2>
                <h2 className="Experiences-title-right">{experience.date}</h2>
              </div>

              <div className="Experiences-row vertical-stack">
                <h3 className="Experiences-left">{experience.employer}</h3>
                <h3 className="Experiences-right">{experience.location}</h3>
              </div>

              <p>{experience.description}</p>
            </div>
          ))}
        </div>
      </main>


      <Footer />
    </div>
  );
};

export default Experiences;
