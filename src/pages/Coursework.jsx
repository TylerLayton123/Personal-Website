import React, { useRef, useState } from 'react';
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
  const semesterCoursesRef = useRef(null);

  const ScrollToSemesterTop = () => {
    if (semesterCoursesRef.current) {
      const elementPosition = semesterCoursesRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };


  // Sample coursework data
  const courseworkData = [
    {
      semester: "Senior - S25",
      totalCredits: "15",
      semesterGPA: "3.88",
      courses: [
        {
          name: "MULTIDISCIPLINARY CAP DESIGN",
          number: "ECSE 4900",
          grade: "A",
          credit: "3",
          description: "This project based class is also called the Design Lab which provides a capstone experience intended to prepare students" +
            " to enter the workforce. A team of 6 students all with different majors are given a multidisciplinary design project by a sponsor" +
            " to work on throughout the semester. Sponsored by Lockheed Martin and in association with Georgia Tech and Purdue University, our" +
            " team was tasked with continuing a project from a previous semester. The project had a variety of moving parts and everyone had a" +
            " specific role in the group. I was the frontend developer mostly working on the client application improving its user interface and" +
            " integrating new technology into the system. This multidisciplinary design project was an excellent experience and gave me a sense" +
            " of how different majors interact and work together to complete the same project. Overall, I learned many new skills such as" +
            " communicating progress or problems that the group had with the project to the sponsors from Lockheed Martin."
        },
        {
          name: "DESIGN & ANALYSIS OF ALGORITHM",
          number: "CSCI 4020",
          grade: "B",
          credit: "4",
          description: "This course presents fundamental ideas and techniques of modern algorithm design and analysis. After completing this" +
            " course, students should be able to formally analyze and design efficient algorithms for a variety of computational problems." +
            " Topics covered include Greedy Algorithms, Dynamic Programming, Network Flow, NP-Completeness, Linear Programming, Network" +
            " Algorithms, as well as probabilistic and approximate algorithms."
        },
        {
          name: "OPERATING SYSTEMS",
          number: "CSCI 4210",
          grade: "A-",
          credit: "4",
          description: "Discussion of various aspects of computer operating systems design and implementation. Topics include I/O programming," +
            " concurrent processes and synchronization problems, process management and scheduling of processes, virtual memory management," +
            " device management, file systems, deadlock problems, system calls, and interprocess communication. Homeworks and projects were coded in Java."
        },

        {
          name: "GAUGE THEORY OF HIGHER COGNITI",
          number: "PSYC 4962",
          grade: "A",
          credit: "4",
          description: "This class is a lecture class where the proffesor talks about his current research papers and theorys. The class helped a lot " +
            " with editing several of his papers."
        }
      ]
    },
    {
      semester: "Senior - F24",
      totalCredits: "20",
      semesterGPA: "3.66",
      courses: [
        {
          name: "SOFTWARE DESIGN & DOCUMENTATIO",
          number: "CSCI 4440",
          grade: "A",
          credit: "4",
          description: "This was a project based class in which a team of 5 students design a specific project. The emphasis is more on the design" +
            " process of the project such as object oriented modeling, writen and oral communication, project managment, software teting, and documention." +
            " My team used Jira to keep track of issues and github to hold our project. The project is a website called \"Let 'Em Cook\" and is meant to be " +
            " a collection of recipes meant for college students to search up and rate. It can be found on my github."
        },
        {
          name: "PROGRAMMING LANGUAGES",
          number: "CSCI 4430",
          grade: "A-",
          credit: "4",
          description: "This course is a study of the important concepts found in current programming languages. Topics include language" +
            " processing (lexical analysis, parsing, type-checking, interpretation and compilation, run-time environment), the role of abstraction" +
            " (data abstraction and control abstraction), programming paradigms (procedural, functional, object-oriented, logic-oriented, generic)," +
            " and formal language definition."
        },
        {
          name: "ONTOLOGIES",
          number: "CSCI 4340",
          grade: "A",
          credit: "4",
          description: "This course provides an introduction to ontologies, their uses, and an overview of their application in semantically" +
            " enabled systems. Ontologies encode term meanings and are used to improve communication and enable computer programs to function" +
            " more effectively. I teamed up with 3 other students to design an Ontology based on National Parks in the US showing certain statistics such as popularity," +
            " hikes, animals, climate, etc. We used a software called Protégé, an open-source ontology editor and framework."
        },
        {
          name: "INTERMEDIATE MICROECON THEORY",
          number: "ECON 2010",
          grade: "B-",
          credit: "4",
          description: "This course explores how demand and supply determine market prices and analyzes firm pricing and output decisions" +
            " across market structures. It uses calculus to optimize costs and profits. Topics include game theory, externalities, public goods," +
            " asymmetric information, and behavioral economics."
        },
        {
          name: "MONEY & BANKING",
          number: "ECON 4130",
          grade: "A",
          credit: "4",
          description: "Financial institutions, especially commercial banking and the Federal Reserve System, are considered from three" +
            " perspectives: their monetary roles; trends in the economic, organizational, and technological aspects of their operations; and" +
            " their other economic roles-a critical view. Also, the role of money in macroeconomic theory is considered along with the role" +
            " of monetary policies in relation to the problems of inflation and unemployment."
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
          description: "A study of important concepts in software design, implementation, and testing. Topics include specification, abstraction" +
            " with classes, design principles and patterns, testing, refactoring, the software development process, GUI and event-driven" +
            " programming, and cloud-based programming. The course also introduced implementation and testing tools, including IDEs, revision" +
            " control systems, and other frameworks."
        },
        {
          name: "INTRO TO ARTIFICIAL INTELLIG",
          number: "CSCI 4150",
          grade: "B+",
          credit: "4",
          description: "Topics and techniques of artificial intelligence using Python. Topics include search, knowledge" +
            " representation, expert systems, theorem proving, natural language interfaces, learning, game playing, and computer vision." +
            " Techniques include pattern matching, data-driven programming, substitution rules, frames, heuristic search, transition networks," +
            " neural networks, and evolutionary computation."
        },
        {
          name: "INTRODUCTION TO ELECTRONICS",
          number: "ECSE 2050",
          grade: "B+",
          credit: "4",
          description: "The physics and operation of semiconductor diodes, bipolar junction transistors, and field-effect transistors in" +
            " elementary analog circuits. Non-ideal operational amplifier characteristics. Amplifier biasing, small-signal analysis, and" +
            " frequency response. Elementary bipolar and MOSFET digital circuits."
        },
        {
          name: "PD: LEADERSHIP COMPETENCIES",
          number: "ENGR 4010",
          grade: "A",
          credit: "1",
          description: "I studied issues associated with working in teams in a modern work environment. Various styles of leadership," +
            " the definitions of power and empowerment and their applications in industry and team settings will be studied. Additionally, other" +
            " topics to be explored include vision, values and attitudes, and organizational culture."
        },
        {
          name: "PD - TECH ISSUES & SOLUTIONS",
          number: "STSO 4100",
          grade: "A",
          credit: "2",
          description: "This course examines how non-technical factors affect engineering designs, including human limitations, economic," +
            " environmental, and cultural issues. I analyzed case studies where ignoring these factors led to failures or disasters." +
            " Emphasis is on understanding the broader impacts of technical solutions. At the end of the class, I did a research project on the tragedy of Chernobyl."
        }
      ]
    },
    {
      semester: "Junior - F23",
      totalCredits: "21",
      semesterGPA: "3.85",
      courses: [
        {
          name: "COMP ARCHITECTURE & NETWORKS",
          number: "ECSE 2660",
          grade: "A",
          credit: "4",
          description: "Quantitative basis of modern computer architecture, processor design, MIPS, memory hierarchy, and input/output methods." +
            " Layered operating system structures, process and storage management. Layered network organization, network protocols, switching," +
            " local and wide area networks. Examples from Unix and the Internet."
        },
        {
          name: "ENGINEERING PROBABILITY",
          number: "ECSE 2500",
          grade: "B",
          credit: "3",
          description: "Axioms of probability, joint and conditional probability, random variables, probability density, mass, and distribution" +
            " functions, functions of one and two random variables, characteristic functions, sequences of independent random variables, central" +
            " limit theorem, and laws of large numbers. Applications to electrical and computer engineering problems."
        },
        {
          name: "SIGNALS & SYSTEMS",
          number: "ECSE 2410",
          grade: "A",
          credit: "3",
          description: "Time and frequency-domain representation of continuous- and discrete-time signals and systems.  Response of linear," +
            " time-invariant systems. Convolution, Fourier series, Fourier transform, Laplace transform, and z-transform. Applications in" +
            " communication, feedback control, and filtering."
        },
        {
          name: "ROBOTICS I",
          number: "CSCI 4480",
          grade: "A",
          credit: "3",
          description: "A survey of the fundamental issues necessary for the design, analysis, control, and implementation of robotic systems." +
            " The mathematical description of robot manipulators in terms of kinematics and dynamics. Hardware components of a typical robot arm." +
            " Path following, control, and sensing. Examples of several currently available manipulators. Used MATLABS and python on the homeworks and projects."
        },
        {
          name: "RCOS",
          number: "CSCI 2961",
          grade: "A",
          credit: "4",
          description: "Rensselaer Center for Open Source Software is a project based class where students have the oportunity to start or join" +
            " a current open source project. This semester, me and another student started our own open sourse project which can be found on my github" +
            " The projects name is called Jump and the goal was to create a sort of game which has a clear background. Basically this platforming game is" +
            " overlayed on top of the screen so that you can still see what is behind the game window. This was coded in python using the library pygame."
        },
        {
          name: "INTRO ENGINEERING DESIGN",
          number: "ENGR 2050",
          grade: "A",
          credit: "4",
          description: "A first course in engineering design which emphasizes creativity, teamwork, communication, and work across engineering" +
            " disciplines. Students are introduced to the design process through a semester-long project which provides a design-build-test" +
            " experience. Oral and written communication are important elements of the course. "
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
          description: "Summer internship that counts as 1 credit, more on this internship can be found under the \"Experience\" section."
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
          description: "Data structures and algorithms, and the mathematical techniques necessary to design and analyze them. Basic data" +
            " structures: lists, associative structures, trees. Mathematical techniques for designing algorithms and analyzing worst-case and" +
            " expected-case algorithm efficiency. Advanced data structures: balanced trees, tries, heaps, priority queues, graphs. Searching," +
            " sorting. Algorithm design techniques: dynamic programming, greedy algorithms, divide-and-conquer, backtracking. Example graph," +
            " string, geometric, and numeric algorithms."
        },
        {
          name: "ELECTRIC CIRCUITS",
          number: "ECSE 2010",
          grade: "A",
          credit: "4",
          description: "Techniques for the analysis and simulation of linear electric circuits and measurements of their properties. Topics" +
            " include resistive and energy-storage elements, controlled sources and operational amplifiers, systematic analysis methods, AC steady" +
            " state, power and three-phase systems, magnetic coupling and transformers, transients, s-plane representation and analysis, frequency" +
            " response, and Laplace transform and computer-aided methods."
        },
        {
          name: "CPTR COMPONENTS & OPER",
          number: "ECSE 2610",
          grade: "A",
          credit: "4",
          description: "Design-oriented introduction to computer components and operations. Standard codes, number systems, base conversions," +
            " and computer arithmetic. Boolean algebra, minimization and synthesis techniques for combinational and sequential logic. Races," +
            " hazards, and asynchronous behavior. Registers, arithmetic logic units, memory structure, buses, and control units. Machine language" +
            " programming, instruction fetch and execution, input-output devices, interrupts, and microprogram sequencers. Software and hardware" +
            " tools."
        },
        {
          name: "PHYSICS II",
          number: "PHYS 1200",
          grade: "A-",
          credit: "4",
          description: "The second semester of the two-semester sequence of calculus-based Physics courses. Topics include electric and magnetic" +
            " forces and fields, Gauss’s Law, dc and ac circuits, Ampere’s Law and Faraday’s Law, electromagnetic radiation, physical optics, and" +
            " quantum physics.  This course includes a lab component that is intended to provide students with hands-on as well as data analysis" +
            " experience."
        },
        {
          name: "ECSE ENRICHMENT SEMINAR",
          number: "ECSE 2900",
          grade: "A",
          credit: "1",
          description: "This seminar course addresses a range of issues involving engineering and public policy, innovation systems and economic" +
            " development, and the National Academy’s Engineering Grand Challenges for the 21st Century."
        }
      ]
    },
    {
      semester: "Sophomore - F22",
      totalCredits: "17",
      semesterGPA: "3.68",
      courses: [
        {
          name: "RCOS",
          number: "CSCI 2961",
          grade: "A",
          credit: "4",
          description: "Rensselaer Center for Open Source Software is a project based class where students have the oportunity to start or join" +
            " a current open source project. The project I joined this semester was called \"Open Circuits\" which is an analog and digital circuit simulator similar to LTspice." +
            " I Collaborated with a team of students to further develop the user-interface of this circuit simulator which will help other students better understand analog circuit design."
        },
        {
          name: "EMBEDDED CONTROL",
          number: "ENGR 2350",
          grade: "A-",
          credit: "4",
          description: "This class was coded in C using an embedded element of engineering systems. This was an enjoyable class and gave me a" +
            " lot of hands on experience early on in my academic career. I" +
            " simultaneously developed the hardware and software of one or more target systems during the semester. Topics include concepts and" +
            "practices of microcontroller hardware and software for command, sensing, control, and display. Specifically, this includes control" +
            " of dynamic systems and sensor interfaces; analog-digital conversion; parallel input/output; driver circuits, modular programming," +
            " and subsystem integration."
        },
        {
          name: "FOUNDATIONS OF COMPUTER SCI",
          number: "CSCI 2200",
          grade: "B",
          credit: "4",
          description: "This course introduces important mathematical and theoretical tools for computer science, including topics from set" +
            " theory, combinatorics, and probability theory, and then proceeds to automata theory, the Turing Machine model of computation, and" +
            " notions of computational complexity. The course emphasized formal reasoning and proof techniques."
        },

        {
          name: "INTRODUCTION TO ECSE",
          number: "ECSE 1010",
          grade: "A",
          credit: "4",
          description: "An experiment-centric development of the basic analysis tools of Electrical, Computer, and Systems Engineering," +
            " emphasizing the concepts and mathematics of analog and digital circuits and electronics, programming, data generation and analysis," +
            " and system model development using paper and pencil analysis, simulation, and experiment. Problems, applications, and projects are" +
            " chosen to lay a solid foundation for core EE and CSE courses."
        },
        {
          name: "ENGINEERING COMMUNICATIONS",
          number: "ENGR 1400",
          grade: "A",
          credit: "1",
          description: "This is an undergraduate introductory course covering basic concepts and skills in engineering communication. Topics" +
            " include technical writing, project planning and proposal writing, data visualization, system modeling and simulation, engineering" +
            " graphics and CAD, and effective uses of software tools. NX was used in this class and gave me experience in designing 3D models."
        }
      ]
    },
    {
      semester: "Freshman - S22",
      totalCredits: "16",
      semesterGPA: "3.39",
      courses: [
        {
          name: "DATA STRUCTURES",
          number: "CSCI 1200",
          grade: "B",
          credit: "4",
          description: "Using in C++ and VS code as an IDE, many challenging homeworks were completed on the following programming concepts:" +
            " functions, parameter passing, pointers, arrays, strings, structs, classes, templates. Mathematical" +
            " tools: sets, functions, and relations, order notation, complexity of algorithms, proof by induction. Data structures and their" +
            " representations: data abstraction and internal representation, sequences, trees, binary search trees, associative structures." +
            " Algorithms: searching and sorting, generic algorithms, iterative and recursive algorithms. Methods of testing correctness and" +
            " measuring performance."
        },
        {
          name: "MULTIVAR CALC & MATRIX ALGEBRA",
          number: "MATH 2010",
          grade: "B+",
          credit: "4",
          description: "Directional derivatives, maxima and minima, double integrals, line integrals, div and curl, and Green’s" +
            " Theorem; matrix algebra and systems of linear equations, vectors and linear transformations in R^n, eigenvectors and" +
            " eigenvalues, applications in engineering and science."
        },
        {
          name: "PRINCIPLES OF ECONOMICS",
          number: "IHSS 1200",
          grade: "A",
          credit: "4",
          description: "This course introduces fundamental economic concepts such as opportunity cost, supply and demand, and market structures." +
            " It examines government roles in resource allocation, key macroeconomic indicators like GDP and inflation, and the banking system." +
            " Students gain a broad understanding of how economic principles shape society."
        },
        {
          name: "INTRODUCTION TO BIOLOGY",
          number: "BIOL 1010",
          grade: "B",
          credit: "3",
          description: "Introduction to biological systems. Discussion of problems associated with biological organization, scaling, and" +
            " hierarchy. Major topics covered include evolution, genetics and medicine, and ecology. The course considers the biological" +
            " components of various environmental, social, and individual problems. Course is taught using both traditional and research-based" +
            " pedagogical methods."
        },
        {
          name: "INTRODUCTION TO BIOLOGY LAB",
          number: "BIOL 1015",
          grade: "A",
          credit: "1",
          description: "This class is paired with the intro to biology class and uses RStudio to complete its labs. The goal of this laboratory" +
            " course is to learn about biology through hands-on, project-based lab activities" +
            " that engage students in actual biology experiments and procedures - learning biology by actually doing biology."
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
          description: "An introduction to computer programming algorithm design and analysis. Using Python and the spyder IDE, I completed a number of homeworks involving basic computer" +
            " organization; internal representation of scalar and array data; use of top-down design and subprograms to tackle complex problems;" +
            " abstract data types. Enrichment material as time allows. Interdisciplinary case studies, numerical and nonnumerical applications."
        },
        {
          name: "PHYSICS I",
          number: "PHYS 1100",
          description: "The first semester of a two-semester sequence of calculus-based Physics courses. Topics include linear and angular" +
            " kinematics and dynamics, work and energy, momentum and collisions, forces and fields, gravitation, oscillatory motion, waves, sound," +
            " and interference. This course includes a lab component that is intended to provide students with hands-on as well as data analysis experience.",
          grade: "A",
          credit: "4"
        },
        {
          name: "ENGR PROCESSES",
          number: "ENGR 1300",
          description: "I built a small aluminum cannon that I still use as a desk accessory to this day. This was one of my favorite classes at RPI because" +
            " it was so hands on and enjoyable, I looked foward to it every week." +
            " We used basic machine tools such as lathes, milling machines, drill presses, band saws, and grinders," +
            " including micrometers, vernier calipers, and other devices of use in a machine shop or laboratory. We were also taught Welding techniques and" +
            " tool makings.",
          grade: "S",
          credit: "1"
        },
        {
          name: "INTRO DIFFERENTIAL EQUATIONS",
          number: "MATH 2400",
          description: "First-order differential equations, second-order linear equations, eigenvalues and eigenvectors of matrices, systems" +
            " of first-order equations, stability and qualitative properties of nonlinear autonomous systems in the plane, Fourier series, separation" +
            " of variables for partial differential equations.",
          grade: "A",
          credit: "4"
        },
        {
          name: "INTRO TO BETTER WORLD ENGR",
          number: "ENGR 1700",
          description: "This seminar-based course introduces students to the roles the different engineering disciplines" +
            "play in addressing modern engineering challenges. This course conveys that design is a principal aspect of engineering," +
            " often involving multiple disciplines simultaneously and that the associated engineering solutions often have ethical," +
            " cultural, social, economic, and environmental consequences. As such these issues must be considered in determining the" +
            " appropriateness of an engineering solution.",
          grade: "S",
          credit: "1"
        },
        {
          name: "SCIENCE, TECHNOLOGY & SOCIETY",
          number: "STSO 1110",
          description: "This course examines science and technology in their social, cultural, and political context. " +
            "Readings are drawn from social sciences, fiction, and contemporary journalism. Case studies include genetic " +
            "testing, automation, vaccines, engineering education, AIDS activism, mental health, surveillance, and climate change. " +
            "The class is designed to give students the freedom to develop and express their own ideas.",
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

          <div className="description">
            Classes are ordered by relevance for each semester. Descriptions of each class are pulled from RPI catalog as well as personal experiences.
          </div>

          <div className="semester-courses" ref={semesterCoursesRef}>
            <h2 className="semester-title">{courseworkData[activeSemester].semester}
              {courseworkData[activeSemester].semester === "Freshman - F21" && " (Calculus I and II credits brought in from HS)"}</h2>
            <h2 className="semester-description"><strong>Total Credits:</strong> {courseworkData[activeSemester].totalCredits} <br />
              <strong>Semester GPA:</strong> {courseworkData[activeSemester].semesterGPA}</h2>
            <div className="courses-grid">
              {courseworkData[activeSemester].courses.map((course, index) => (
                <div className="course-card" key={index}>
                  <div className="course-header">
                    <h3>{course.name}</h3>

                    <span className={course.grade === "B+" ? `course-grade grade-bp` : `course-grade grade-${course.grade.toLowerCase()}`}>{course.grade}</span>
                  </div>
                  <p><strong>Subject/Number:</strong> {course.number}</p>
                  <p><strong>Credits:</strong> {course.credit}</p>
                  <p><strong>Description:</strong> <br />{course.description}</p>
                </div>
              ))}
            </div>

            <div className="semester-nav">
              <button
                className="nav-button"
                onClick={() => {
                  setActiveSemester((activeSemester - 1 + courseworkData.length) % courseworkData.length);
                  ScrollToSemesterTop();
                }}
              >
                Previous: {courseworkData[(activeSemester - 1 + courseworkData.length) % courseworkData.length].semester}
              </button>
              <button
                className="nav-button"
                onClick={() => {
                  setActiveSemester((activeSemester + 1) % courseworkData.length);
                  ScrollToSemesterTop();
                }}
              >
                Next: {courseworkData[(activeSemester + 1) % courseworkData.length].semester}
              </button>

            </div>
          </div>
        </main>


      </div>
      <Footer />
    </div>
  );
};

export default CourseWork;