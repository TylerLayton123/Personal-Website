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
      totalCredits: "15",
      semesterGPA: "3.88",
      courses: [
        {
          name: "DESIGN & ANALYSIS OF ALGORITHM",
          number: "CSCI 4020",
          grade: "B",
          credit: "4",
          description: ""
        },
        {
          name: "OPERATING SYSTEMS",
          number: "CSCI 4210",
          grade: "A-",
          credit: "4",
          description: ""
        },
        {
          name: "MULTIDISCIPLINARY CAP DESIGN",
          number: "ECSE 4900",
          grade: "A",
          credit: "3",
          description: ""
        },
        {
          name: "GAUGE THEORY OF HIGHER COGNITI",
          number: "PSYC 4962",
          grade: "A",
          credit: "4",
          description: ""
        }
      ]
    },
    {
      semester: "Senior - F24",
      totalCredits: "20",
      semesterGPA: "3.66",
      courses: [
        {
          name: "ONTOLOGIES",
          number: "CSCI 4340",
          grade: "A",
          credit: "4",
          description: ""
        },
        {
          name: "PROGRAMMING LANGUAGES",
          number: "CSCI 4430",
          grade: "A-",
          credit: "4",
          description: ""
        },
        {
          name: "SOFTWARE DESIGN & DOCUMENTATIO",
          number: "CSCI 4440",
          grade: "A",
          credit: "4",
          description: ""
        },
        {
          name: "INTERMEDIATE MICROECON THEORY",
          number: "ECON 2010",
          grade: "B-",
          credit: "4",
          description: ""
        },
        {
          name: "MONEY & BANKING",
          number: "ECON 4130",
          grade: "A",
          credit: "4",
          description: ""
        }
      ]
    },
    {
      semester: "Junior - S24",
      totalCredits: "15",
      semesterGPA: "3.37",
      courses: [
        {
          name: "PRINCIPLES OF SOFTWARE",
          number: "CSCI 2600",
          grade: "B",
          credit: "4",
          description: ""
        },
        {
          name: "INTRO TO ARTIFICIAL INTELLIG",
          number: "CSCI 4150",
          grade: "B+",
          credit: "4",
          description: ""
        },
        {
          name: "INTRODUCTION TO ELECTRONICS",
          number: "ECSE 2050",
          grade: "B+",
          credit: "4",
          description: ""
        },
        {
          name: "PD: LEADERSHIP COMPETENCIES",
          number: "ENGR 4010",
          grade: "A",
          credit: "1",
          description: ""
        },
        {
          name: "PD - TECH ISSUES & SOLUTIONS",
          number: "STSO 4100",
          grade: "A",
          credit: "2",
          description: ""
        }
      ]
    },
    {
      semester: "Junior - F23",
      totalCredits: "21",
      semesterGPA: "3.85",
      courses: [
        {
          name: "RCOS == 4 CREDITS",
          number: "CSCI 2961",
          grade: "A",
          credit: "4",
          description: ""
        },
        {
          name: "ROBOTICS I",
          number: "CSCI 4480",
          grade: "A",
          credit: "3",
          description: ""
        },
        {
          name: "SIGNALS & SYSTEMS",
          number: "ECSE 2410",
          grade: "A",
          credit: "3",
          description: ""
        },
        {
          name: "ENGINEERING PROBABILITY",
          number: "ECSE 2500",
          grade: "B",
          credit: "3",
          description: ""
        },
        {
          name: "COMP ARCHITECTURE & NETWORKS",
          number: "ECSE 2660",
          grade: "A",
          credit: "4",
          description: ""
        },
        {
          name: "INTRO ENGINEERING DESIGN",
          number: "ENGR 2050",
          grade: "A",
          credit: "4",
          description: ""
        }
      ]
    },
    {
      semester: "Sophomore - Summer 23",
      totalCredits: "1",
      semesterGPA: "0.00",
      courses: [
        {
          name: "INTERNSHIP",
          number: "ILEA 4400",
          grade: "S",
          credit: "1",
          description: ""
        }
      ]
    },
    {
      semester: "Sophomore - S23",
      totalCredits: "17",
      semesterGPA: "3.76",
      courses: [
        {
          name: "INTRODUCTION TO ALGORITHMS",
          number: "CSCI 2300",
          grade: "B+",
          credit: "4",
          description: ""
        },
        {
          name: "ELECTRIC CIRCUITS",
          number: "ECSE 2010",
          grade: "A",
          credit: "4",
          description: ""
        },
        {
          name: "CPTR COMPONENTS & OPER",
          number: "ECSE 2610",
          grade: "A",
          credit: "4",
          description: ""
        },
        {
          name: "ECSE ENRICHMENT SEMINAR",
          number: "ECSE 2900",
          grade: "A",
          credit: "1",
          description: ""
        },
        {
          name: "PHYSICS II",
          number: "PHYS 1200",
          grade: "A-",
          credit: "4",
          description: ""
        }
      ]
    },
    {
      semester: "Sophomore - F22",
      totalCredits: "17",
      semesterGPA: "3.68",
      courses: [
        {
          name: "FOUNDATIONS OF COMPUTER SCI",
          number: "CSCI 2200",
          grade: "B",
          credit: "4",
          description: ""
        },
        {
          name: "RCOS == 4 CREDITS",
          number: "CSCI 2961",
          grade: "A",
          credit: "4",
          description: ""
        },
        {
          name: "INTRODUCTION TO ECSE",
          number: "ECSE 1010",
          grade: "A",
          credit: "4",
          description: ""
        },
        {
          name: "ENGINEERING COMMUNICATIONS",
          number: "ENGR 1400",
          grade: "A",
          credit: "1",
          description: ""
        },
        {
          name: "EMBEDDED CONTROL",
          number: "ENGR 2350",
          grade: "A-",
          credit: "4",
          description: ""
        }
      ]
    },
    {
      semester: "Freshman - S22",
      totalCredits: "16",
      semesterGPA: "3.39",
      courses: [
        {
          name: "INTRODUCTION TO BIOLOGY",
          number: "BIOL 1010",
          grade: "B",
          credit: "3",
          description: ""
        },
        {
          name: "INTRODUCTION TO BIOLOGY LAB",
          number: "BIOL 1015",
          grade: "A",
          credit: "1",
          description: ""
        },
        {
          name: "DATA STRUCTURES",
          number: "CSCI 1200",
          grade: "B",
          credit: "4",
          description: ""
        },
        {
          name: "PRINCIPLES OF ECONOMICS",
          number: "IHSS 1200",
          grade: "A",
          credit: "4",
          description: ""
        },
        {
          name: "MULTIVAR CALC & MATRIX ALGEBRA",
          number: "MATH 2010",
          grade: "B+",
          credit: "4",
          description: ""
        }
      ]
    },
    {
      semester: "Freshman - F21",
      totalCredits: "18",
      semesterGPA: "3.83",
      courses: [
        {
          name: "COMPUTER SCIENCE I",
          number: "CSCI 1100",
          grade: "A-",
          credit: "4",
          description: ""
        },
        {
          name: "PHYSICS I",
          number: "PHYS 1100",
          description: "",
          grade: "A",
          credit: "4"
        },
        {
          name: "ENGR PROCESSES",
          number: "ENGR 1300",
          description: "",
          grade: "S",
          credit: "1"
        },
        {
          name: "INTRO DIFFERENTIAL EQUATIONS",
          number: "MATH 2400",
          description: "",
          grade: "A",
          credit: "4"
        },
        {
          name: "INTRO TO BETTER WORLD ENGR",
          number: "ENGR 1700",
          description: "",
          grade: "S",
          credit: "1"
        },
        {
          name: "SCIENCE, TECHNOLOGY & SOCIETY",
          number: "STSO 1110",
          description: "",
          grade: "A-",
          credit: "4"
        }
      ]
    }
  ];

  return (
    <div className="course-work-page">
      {/* Particle Background - positioned absolutely */}
      <ParticleBackground contentSection='true' />


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
            <h2>BS in Computer Science & Computer Systems Engineering</h2>
            <h2>Currently pursuing Masters in Computer Science</h2>
            <h2>Current overall GPA: 3.68</h2>
            <h2>Cum Laude</h2>
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
            <h2 className="semester-title">{courseworkData[activeSemester].semester}
              {courseworkData[activeSemester].semester === "Freshman - F21" && " (Calculus I and II credits brought in from HS)"}</h2>
              <h2 className="semester-description">Total Credits: {courseworkData[activeSemester].totalCredits} <br />
                Semester GPA: {courseworkData[activeSemester].semesterGPA}</h2>
            <div className="courses-grid">
              {courseworkData[activeSemester].courses.map((course, index) => (
                <div className="course-card" key={index}>
                  <div className="course-header">
                    <h3>{course.name}</h3>
                    
                    <span className={course.grade === "B+" ? `course-grade grade-bp` : `course-grade grade-${course.grade.toLowerCase()}`}>{course.grade}</span>
                  </div>
                  <p>Subject/Number: {course.number}</p>
                  <p>Credits: {course.credit}</p>
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