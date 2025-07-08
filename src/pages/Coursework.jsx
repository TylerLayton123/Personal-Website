import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import ParticleBackground from '../components/ParticleBackground'; // Import ParticleBackground
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';
import './CourseWork.css';

const CourseWork = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSemester, setActiveSemester] = useState(0);

  // Sample coursework data
  const courseworkData = [
    {
      semester: "Senior - S25",
      courses: [
        {
          name: "Advanced Algorithms",
          description: "Explored complex algorithm design and analysis techniques including dynamic programming, greedy algorithms, and NP-completeness.",
          grade: "A"
        },
        {
          name: "Machine Learning",
          description: "Studied supervised and unsupervised learning algorithms, neural networks, and model evaluation techniques.",
          grade: "A-"
        },
        {
          name: "Database Systems",
          description: "Learned relational database design, SQL, normalization, and transaction processing.",
          grade: "B+"
        },
        {
          name: "Software Engineering",
          description: "Covered software development methodologies, requirements engineering, and testing strategies.",
          grade: "A"
        },
        {
          name: "Computer Networks",
          description: "Examined network architectures, protocols, and security fundamentals.",
          grade: "A-"
        }
      ]
    },
    {
      semester: "Senior - F24",
      courses: [
        {
          name: "Data Structures",
          description: "Implemented fundamental data structures including trees, graphs, and hash tables.",
          grade: "A"
        },
        {
          name: "Operating Systems",
          description: "Studied process management, memory allocation, and file systems.",
          grade: "B+"
        },
        {
          name: "Web Development",
          description: "Built full-stack applications using modern frameworks and APIs.",
          grade: "A"
        },
        {
          name: "Linear Algebra",
          description: "Explored matrix operations, vector spaces, and eigenvalues.",
          grade: "A-"
        },
        {
          name: "Discrete Mathematics",
          description: "Covered logic, set theory, combinatorics, and graph theory.",
          grade: "B+"
        }
      ]
    },
    {
      semester: "Junior - S24",
      courses: [
        {
          name: "Object-Oriented Programming",
          description: "Learned design patterns and principles of object-oriented design.",
          grade: "A"
        },
        {
          name: "Computer Architecture",
          description: "Studied CPU design, memory hierarchy, and assembly programming.",
          grade: "A-"
        },
        {
          name: "Probability & Statistics",
          description: "Covered probability distributions, statistical inference, and hypothesis testing.",
          grade: "B+"
        },
        {
          name: "Human-Computer Interaction",
          description: "Explored UI/UX design principles and evaluation methods.",
          grade: "A"
        },
        {
          name: "Calculus III",
          description: "Multivariate calculus, vector fields, and multiple integration.",
          grade: "B"
        }
      ]
    },
    {
      semester: "Junior - F23",
      courses: [
        {
          name: "Object-Oriented Programming",
          description: "Learned design patterns and principles of object-oriented design.",
          grade: "A"
        },
        {
          name: "Computer Architecture",
          description: "Studied CPU design, memory hierarchy, and assembly programming.",
          grade: "A-"
        },
        {
          name: "Probability & Statistics",
          description: "Covered probability distributions, statistical inference, and hypothesis testing.",
          grade: "B+"
        },
        {
          name: "Human-Computer Interaction",
          description: "Explored UI/UX design principles and evaluation methods.",
          grade: "A"
        },
        {
          name: "Calculus III",
          description: "Multivariate calculus, vector fields, and multiple integration.",
          grade: "B"
        }
      ]
    },
    {
      semester: "Sophmore - S23",
      courses: [
        {
          name: "Object-Oriented Programming",
          description: "Learned design patterns and principles of object-oriented design.",
          grade: "A"
        },
        {
          name: "Computer Architecture",
          description: "Studied CPU design, memory hierarchy, and assembly programming.",
          grade: "A-"
        },
        {
          name: "Probability & Statistics",
          description: "Covered probability distributions, statistical inference, and hypothesis testing.",
          grade: "B+"
        },
        {
          name: "Human-Computer Interaction",
          description: "Explored UI/UX design principles and evaluation methods.",
          grade: "A"
        },
        {
          name: "Calculus III",
          description: "Multivariate calculus, vector fields, and multiple integration.",
          grade: "B"
        }
      ]
    },
    {
      semester: "Sophmore - F22",
      courses: [
        {
          name: "Object-Oriented Programming",
          description: "Learned design patterns and principles of object-oriented design.",
          grade: "A"
        },
        {
          name: "Computer Architecture",
          description: "Studied CPU design, memory hierarchy, and assembly programming.",
          grade: "A-"
        },
        {
          name: "Probability & Statistics",
          description: "Covered probability distributions, statistical inference, and hypothesis testing.",
          grade: "B+"
        },
        {
          name: "Human-Computer Interaction",
          description: "Explored UI/UX design principles and evaluation methods.",
          grade: "A"
        },
        {
          name: "Calculus III",
          description: "Multivariate calculus, vector fields, and multiple integration.",
          grade: "B"
        }
      ]
    },
    {
      semester: "Freshman - S22",
      courses: [
        {
          name: "Object-Oriented Programming",
          description: "Learned design patterns and principles of object-oriented design.",
          grade: "A"
        },
        {
          name: "Computer Architecture",
          description: "Studied CPU design, memory hierarchy, and assembly programming.",
          grade: "A-"
        },
        {
          name: "Probability & Statistics",
          description: "Covered probability distributions, statistical inference, and hypothesis testing.",
          grade: "B+"
        },
        {
          name: "Human-Computer Interaction",
          description: "Explored UI/UX design principles and evaluation methods.",
          grade: "A"
        },
        {
          name: "Calculus III",
          description: "Multivariate calculus, vector fields, and multiple integration.",
          grade: "B"
        }
      ]
    },
    {
      semester: "Freshman - F21",
      courses: [
        {
          name: "Object-Oriented Programming",
          description: "Learned design patterns and principles of object-oriented design.",
          grade: "A"
        },
        {
          name: "Computer Architecture",
          description: "Studied CPU design, memory hierarchy, and assembly programming.",
          grade: "A-"
        },
        {
          name: "Probability & Statistics",
          description: "Covered probability distributions, statistical inference, and hypothesis testing.",
          grade: "B+"
        },
        {
          name: "Human-Computer Interaction",
          description: "Explored UI/UX design principles and evaluation methods.",
          grade: "A"
        },
        {
          name: "Calculus III",
          description: "Multivariate calculus, vector fields, and multiple integration.",
          grade: "B"
        }
      ]
    }
  ];

  return (
    <div className="course-work-page">
      {/* Particle Background - positioned absolutely */}
      <ParticleBackground contentSection='true'/>
      
      
      {/* Content Container with higher z-index */}
      <div className="content-container">
        <Header setSettingsOpen={setSettingsOpen} />

        <Settings 
          isOpen={settingsOpen} 
          onClose={() => setSettingsOpen(false)} 
        />

        <main className="coursework-container">
          <div className="coursework-header">
            <h1>Academic Coursework</h1>
            {/* <p>Detailed overview of my academic journey and completed courses</p> */}
          </div>
          
          <div className="semester-selector">
            {courseworkData.map((semester, index) => (
              <button
                key={index}
                className={`semester-tab ${activeSemester === index ? 'active' : ''}`}
                onClick={() => setActiveSemester(index)}
              >
                {semester.semester}
              </button>
            ))}
          </div>
          
          <div className="semester-courses">
            <h2 className="semester-title">{courseworkData[activeSemester].semester}</h2>
            <div className="courses-grid">
              {courseworkData[activeSemester].courses.map((course, index) => (
                <div className="course-card" key={index}>
                  <div className="course-header">
                    <h3>{course.name}</h3>
                    <span className={`course-grade grade-${course.grade.toLowerCase()}`}>{course.grade}</span>
                  </div>
                  <p>{course.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        
      </div>
      <Footer />
    </div>
  );
};

export default CourseWork;