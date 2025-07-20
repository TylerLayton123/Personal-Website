import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import ParticleBackground from '../components/ParticleBackground';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';
import './Projects.css';

const Projects = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const projects = [
    {
      title: 'Graduate Project - 25/26',
      description: "\tThis project is unfinished since I am still in school. The idea is to create an application/website" +
        " designed for 2D visualization of networks that can handle large amounts of data. It will allow users to visualize various" +
        " search algorithms in action, providing both an educational and interactive experience. Users will also be able to input custom data to" +
        " generate personalized network visualizations and interact with them through an intuitive, responsive interface. The primary goal" +
        " of this tool is to be both educational and practical, helping users visualize and analyze network data effectively. " +
        "Some key features of the application include network creation through a graphical interface, with options to add nodes/edges, customize data," +
        " and group information. I also plan to implement the ability for users to upload their own data rather than starting from scratch." +
        " \n\tAnother major feature will be the inclusion of search functionalities within the network, along with statistics such as search time and nodes/edges visited." +
        " Potential search algorithms to be included are depth-first search, breadth-first search, Dijkstra’s algorithm, A*, and Uniform Cost search." +
        " These are all algorithms I have studied throughout my time at RPI, and I look forward to conducting further research as I develop the application." +
        " Finally, I want to implement the ability to export the visual graph as a PDF and the corresponding data as a CSV." +
        " Much more research will need to be done, and I am excited to start working on this project next year." +
        " Some additional features I am considering include tutorial videos, real-time collaboration, and further customization options such as background colors and node shapes." +
        " The tech stack I envision (though subject to change as well) includes HTML, CSS, JavaScript, React, and D3.js for the frontend, with either Python or Node.js handling data processing on the backend."

    },
    {
      title: 'Personal Website - Summer 25/Current',
      description: "\tFor this summer I wanted to make a personal website where I could display my entire academic career and not be limited to " +
        "just one side of an 8.5 by 11 piece of paper. I also wanted to put on this website other passions I had such as the Universal Picture which" +
        " I always thought was an interesting theory. This website was made using JavaScript, CSS, Node.js, and React. It is also hosted on a personal server" +
        " I will continue to update this website since I had a lot of fun making it and I hope it provides people with insight into my academic journey!"
    },
    {
      title: ' Multidisciplinary Capstone Design / Design Lab - (Spring 25)',
      description: "\tThis capstone project/class is offered at RPI is a great way for students to work with people of different majors" +
        " and is intended to prepare students" +
        " to enter the workforce. A team of six students are given a multidisciplinary design project by a sponsor" +
        " to work on throughout the semester. Sponsored by Lockheed Martin and in association with Georgia Tech and Purdue University, our" +
        " team was tasked with continuing a project from a previous semester. The project had a variety of moving parts and everyone had a" +
        " specific role in the group. I was the frontend developer mostly working on the client application improving its user interface and" +
        " integrating new technology into the system. This multidisciplinary design project was an excellent experience and gave me a sense" +
        " of how different majors interact and work together to complete the same project. Overall, I learned many new skills such as" +
        " communicating progress or problems that the group had with the project to the sponsors from Lockheed Martin."
    },
    {
      title: 'Unity Game - Fall 25/Current',
      description: "\tThis is more of a passion project than a serious project. I enjoy playing games and I wanted to see if I could make one." +
        " A friend and I started creating a 2D game in space where the player drifts around searching for materials and building a spaceship to" +
        " land in different planets. This game might never get finished, but I still work on it every now and then just for fun."
    },
    {
      title: 'Computer Building - Fall 24',
      description: "\tThis may not count as a project, but I wanted to share it anyway since I had a lot of fun building it. I wanted a computer"+
      " that I could play video games on, but I didn't want to buy a prebuilt one. I felt like I had to build one myself since I am a CS/CSE major."+
      " After doing lots of research and picking parts on an online PC builder, I felt like I created my perfect computer. Not too crazy, but also not"+
      " too inefficient that it can't run the games I like to play. The process of building it was a very enjoyable experience and I learned a lot about how computers function. I had to look up what"+
      " certain pins were on the motherboard, carefully install the graphics card, and figure out everything by myself. In the end, I got a great"+
      " final set up that I can take pride in, since I made it all myself. Here are the final specs: \n\t- Monitor: 3840x2160 pixel @ 165Hz\n\t- Graphics Card:"+
      " NVIDIA GeForce RTX 4070 SUPER\n\t- CPU: AMD Ryzen 7\n\t- Motherboard: ASUS TUF Gaming B650-E WIFI\n\t- SSD: 2TB\n\t- Case: AIR 903 MAX mid-tower"+
      " \n\t- etc: Phantom Spirit heat sink and 750 Watt power supply "
    },
    {
      title: 'Ontologies - Fall 24',
      description: "\tThis course provides an introduction to ontologies, their uses, and an overview of their application in semantically" +
        " enabled systems. Ontologies encode term meanings and are used to improve communication and enable computer programs to function" +
        " more effectively. I teamed up with 3 other students to design an Ontology based on National Parks in the US showing certain statistics such as popularity," +
        " hikes, animals, climate, etc. We used a software called Protégé, an open-source ontology editor and framework."
    },
    {
      title: 'RCOS - Fall 23',
      description: "\tRensselaer Center for Open Source Software is a project based class where students have the opportunity to start or join" +
        " a current open source project. This semester, another student and I started our own open source project which can be found on my github" +
        " The project name is called Jump and the goal was to create a sort of game which has a clear background. Basically this platforming game is" +
        " overlaid on top of the screen so that you can still see what is behind the game window. This was coded in Python using the library pygame."
    },
    {
      title: 'RCOS - Fall 22',
      description: "\tRensselaer Center for Open Source Software is a project based class where students have the opportunity to start or join" +
        " a current open source project. The project I joined this semester was called \"Open Circuits\" which is an analog and digital circuit simulator similar to LTspice." +
        " I collaborated with a team of students to further develop the user-interface of this circuit simulator which will help other students better understand analog circuit design."
    }
  ];

  return (
    <div className="projects-page">
      <ParticleBackground contentSection="true" />

      <Header setSettingsOpen={setSettingsOpen} />

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <main className="projects-content">
        <div className="projects-title-box">
          <h1 className="projects-title">Projects</h1>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
