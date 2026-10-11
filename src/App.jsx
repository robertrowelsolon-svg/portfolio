import { useState } from 'react'
import './App.css'

const navigation = [
  { label: 'Overview', href: '#home', number: '01' },
  { label: 'About me', href: '#about', number: '02' },
  { label: 'Projects', href: '#projects', number: '03' },
  { label: 'Resume', href: '#resume', number: '04' },
  { label: 'Contact', href: '#contact', number: '05' },
]

const initialTasks = [
  { id: 'about', label: 'Get to know me', detail: 'A little background', done: true },
  { id: 'projects', label: 'Explore my projects', detail: 'Things I have been building', done: false },
  { id: 'resume', label: 'View my resume', detail: 'Education and skills', done: false },
  { id: 'contact', label: 'Say hello', detail: 'Let’s work on something', done: false },
]

const projects = [
  {
    id: 'todolist',
    category: 'Web app',
    number: '01',
    title: 'To-Do List',
    description: 'A straightforward list for adding everyday tasks and checking them off when they are done.',
    details: 'A beginner-friendly project for practicing form input, click events, and updating a list of tasks. Tasks can be added, marked complete, and removed.',
    tags: ['React', 'JavaScript', 'CSS'],
    color: 'lavender',
  },
  {
    id: 'calculator',
    category: 'Web app',
    number: '02',
    title: 'Basic Calculator',
    description: 'A small calculator for doing simple addition, subtraction, multiplication, and division.',
    details: 'A simple practice project using buttons and JavaScript to handle number input, choose an operation, and show the result.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    color: 'peach',
  },
  {
    id: 'portfolio',
    category: 'Portfolio',
    number: '03',
    title: 'My portfolio',
    description: 'This portfolio: a personal space to share my background, work, and learning journey.',
    details: 'Built with React components and state-driven interactions, including a progress checklist, expandable project details, responsive navigation, and a validated contact form.',
    tags: ['React', 'JavaScript', 'Vite'],
    color: 'mint',
  },
]

function Icon({ name, size = 20, className = '' }) {
  const paths = {
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3 0 6.1-1.5 6.1-6.5a5 5 0 0 0-1.3-3.5 4.7 4.7 0 0 0-.1-3.5S17.3 1.5 15 3.2a13.4 13.4 0 0 0-7 0C5.7 1.5 4.2 2 4.2 2a4.7 4.7 0 0 0-.1 3.5A5 5 0 0 0 2.8 9c0 5 3.1 6.5 6.1 6.5a3.4 3.4 0 0 0-.9 2.7V22" /></>,
    sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [expandedProject, setExpandedProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const completedTasks = tasks.filter((task) => task.done).length

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  function downloadResume() {
    const resume = [
      'ROBERT SOLON',
      'Student Developer | Cavite State University',
      '',
      'PROFILE',
      'A curious student learning to build thoughtful, accessible web experiences.',
      '',
      'EDUCATION',
      'Cavite State University — Student',
      'DCIT 26: Application Development and Emerging Technologies 2',
      '',
      'SKILLS',
      'React, JavaScript, Tailwind CSS, HTML, CSS, responsive design',
      '',
      'PROJECTS',
      ...projects.map((project) => `${project.title} — ${project.description}`),
      '',
      'CONTACT',
      'Add your preferred email and social links to the portfolio before sharing.',
    ].join('\n')
    const file = new Blob([resume], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'robert-solon-resume.txt'
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  function handleContactSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setFormMessage('Your message is valid. Connect a form service to send it online.')
    form.reset()
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar flex items-center justify-between">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Robert Solon, home">
          <span className="brand-mark">r.</span>
          <span>robert<span className="brand-muted">solon</span></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
        <nav className={`top-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Let’s talk <Icon name="arrow" size={15} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero-section page-width mx-auto grid grid-cols-1 items-center md:grid-cols-[1.08fr_.92fr]" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="availability-dot" /> OPEN TO LEARNING & COLLABORATION</div>
            <p className="hero-greeting">Hello there, I’m</p>
            <h1>Robert Rowel <span>Solon.</span></h1>
            <p className="hero-intro">
              A student developer learning to turn thoughtful ideas into
              <span className="highlight"> useful digital experiences.</span>
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">Explore my work <Icon name="arrow" size={17} /></a>
              <button className="button button-light" type="button" onClick={downloadResume}><Icon name="download" size={17} /> Download CV</button>
            </div>
            <div className="hero-meta">
              <span><Icon name="pin" size={16} /> Cavite, Philippines</span>
              <span className="meta-divider" />
              <span>Cavite State University</span>
            </div>
          </div>
          <div className="hero-art" aria-label="A creative workspace illustration">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-sun" />
            <div className="art-card art-card-main">
              <span className="art-card-label">CURRENT FOCUS</span>
              <div className="art-code"><span className="code-purple">const</span> <span className="code-blue">ideas</span> = <span className="code-yellow">makeThings</span>();</div>
              <div className="code-line code-line-long" />
              <div className="code-line code-line-short" />
              <div className="art-card-bottom"><span className="mini-dot" /> learning by doing</div>
            </div>
            <div className="art-note"><Icon name="sparkle" size={17} /> curious by nature</div>
            <div className="art-sticker">BUILD<br />WITH<br />CARE<span>✳</span></div>
            <span className="art-decoration decor-one">✳</span>
            <span className="art-decoration decor-two">✳</span>
          </div>
          <a className="scroll-cue" href="#dashboard"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="dashboard-section" id="dashboard">
          <div className="page-width dashboard-grid mx-auto grid grid-cols-1 items-center md:grid-cols-[.78fr_1.22fr]">
            <div className="dashboard-intro">
              <p className="eyebrow">YOUR STARTING POINT</p>
              <h2>A little tour<br />of my world.</h2>
              <p>Thanks for stopping by. Use this little checklist to explore my portfolio at your own pace.</p>
              <div className="progress-summary">
                <span className="progress-number">{String(completedTasks).padStart(2, '0')}</span>
                <span>of {String(tasks.length).padStart(2, '0')} explored</span>
              </div>
            </div>
            <div className="checklist-card">
              <div className="checklist-header">
                <div><span className="eyebrow">PORTFOLIO CHECKLIST</span><h3>Make yourself at home</h3></div>
                <span className="checklist-count">{completedTasks}/{tasks.length}</span>
              </div>
              <div className="progress-track" role="progressbar" aria-label="Portfolio sections explored" aria-valuenow={completedTasks} aria-valuemin={0} aria-valuemax={tasks.length}>
                <span style={{ width: `${(completedTasks / tasks.length) * 100}%` }} />
              </div>
              <ul className="checklist">
                {tasks.map((task) => (
                  <li key={task.id} className={task.done ? 'task-done' : ''}>
                    <button className="task-toggle" type="button" onClick={() => toggleTask(task.id)} aria-label={`${task.done ? 'Mark' : 'Mark'} ${task.label} ${task.done ? 'not done' : 'done'}`} aria-pressed={task.done}>
                      {task.done && <Icon name="check" size={15} />}
                    </button>
                    <a href={`#${task.id}`} onClick={() => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, done: true } : item))}>
                      <span className="task-label">{task.label}</span>
                      <span className="task-detail">{task.detail}</span>
                    </a>
                    <Icon className="task-arrow" name="arrow" size={17} />
                  </li>
                ))}
              </ul>
              <p className="checklist-footnote"><Icon name="sparkle" size={15} /> Tap a circle to update your progress</p>
            </div>
          </div>
        </section>

        <section className="about-section page-width section-pad mx-auto grid grid-cols-1 items-center md:grid-cols-[.82fr_1.18fr]" id="about">
          <div className="about-note">
            <div className="note-top"><span className="note-pin" /><span className="eyebrow">A NOTE ABOUT ME</span></div>
            <p className="note-quote">“Good design makes things feel a little more human.”</p>
            <span className="note-signature">— something I believe</span>
            <div className="note-doodle">✳</div>
          </div>
          <div className="about-copy">
            <SectionHeading eyebrow="02 / ABOUT ME" title={<>Curious mind.<br />Kind intentions.</>} />
            <p className="body-copy">I’m Robert Rowel Solon, a student at Cavite State University exploring the world of application development. I enjoy learning how ideas become useful, welcoming experiences on the web.</p>
            <p className="body-copy">Right now, I’m building a strong foundation in front-end development—one project, one question, and one small improvement at a time.</p>
            <div className="interest-list">
              <span>Currently into</span>
              <div><span>Web design</span><span>Creative coding</span><span>Good coffee</span><span>Learning new things</span></div>
            </div>
            <div className="skill-block">
              <span className="skill-label">TOOLS IN MY TOOLBOX</span>
              <div className="skill-tags">
                {['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS', 'Figma', 'Git'].map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="projects-section section-pad" id="projects">
          <div className="page-width">
            <SectionHeading eyebrow="03 / SELECTED WORK" title="A few things I’ve made." description="Small steps, real learning. Open a project to see a little more about it." />
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article className={`project-card ${project.color}`} key={project.id}>
                  <div className="project-visual">
                    <span className="project-number">{project.number} / 03</span>
                    <div className={`project-preview preview-${project.id}`}>
                      {project.id === 'todolist' && <><div className="simple-list-title">My To-Do List</div><div className="simple-list-entry"><i /> Read a chapter</div><div className="simple-list-entry"><i /> Finish homework</div><div className="simple-list-entry"><i /> Tidy my desk</div><div className="simple-list-add">+ Add a task</div></>}
                      {project.id === 'calculator' && <img className="calculator-preview-image" src="/calculator-preview.png" alt="Calculator project showing a calculator and its user guide" />}
                      {project.id === 'portfolio' && <><div className="portfolio-window"><div className="window-dots"><i /><i /><i /></div><div className="window-name">robert<span>.dev</span></div><div className="window-hello">Hello, world<span>!</span></div><div className="window-line" /><div className="window-line short" /><div className="window-button">see my work ↗</div></div></>}
                    </div>
                    <span className="project-category">{project.category}</span>
                  </div>
                  <div className="project-content">
                    <div className="project-title-row"><h3>{project.title}</h3><span>{project.number}</span></div>
                    <p>{project.description}</p>
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <button className="project-more" type="button" aria-expanded={expandedProject === project.id} onClick={() => setExpandedProject((current) => current === project.id ? null : project.id)}>
                      {expandedProject === project.id ? 'A little less' : 'A little more'} <Icon name="arrow" size={16} />
                    </button>
                    {expandedProject === project.id && <div className="project-details"><p>{project.details}</p><span>Project concept · Learning in progress</span></div>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="resume-section page-width section-pad" id="resume">
          <div className="resume-heading">
            <SectionHeading eyebrow="04 / THE SHORT VERSION" title="Learning as I go." description="A snapshot of what I’m studying and the skills I’m growing." />
            <button className="button button-dark" type="button" onClick={downloadResume}><Icon name="download" size={17} /> Download CV</button>
          </div>
          <div className="resume-grid grid grid-cols-1 md:grid-cols-2">
            <div className="resume-column">
              <span className="resume-label">EDUCATION</span>
              <div className="resume-entry">
                <span className="resume-date">CURRENT STUDIES</span>
                <h3>Cavite State University</h3>
                <p>Application Development and Emerging Technologies 2</p>
                <span className="resume-caption">DCIT 26 · First Semester, SY 2026–2027</span>
              </div>
              <div className="resume-entry">
                <span className="resume-date">ALWAYS LEARNING</span>
                <h3>Independent practice</h3>
                <p>Building practical web skills through hands-on projects and experimentation.</p>
              </div>
            </div>
            <div className="resume-column">
              <span className="resume-label">EXPERIENCE & STRENGTHS</span>
              <div className="resume-entry">
                <span className="resume-date">PROJECT EXPERIENCE</span>
                <h3>Student projects</h3>
                <p>Practicing component-based design, responsive layouts, and interactive UI patterns.</p>
              </div>
              <div className="resume-entry">
                <span className="resume-date">SKILLS I’M GROWING</span>
                <h3>Front-end foundations</h3>
                <p>React · JavaScript · Tailwind CSS · HTML · CSS · Git · Responsive design</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-width contact-grid mx-auto grid grid-cols-1 items-center md:grid-cols-[1fr_.85fr]">
            <div className="contact-copy">
              <p className="eyebrow">05 / YOUR TURN</p>
              <h2>Have a good<br />one in mind?</h2>
              <p>I’m always happy to talk about ideas, student projects, or what we’re learning. Leave me a note.</p>
              <a className="contact-email" href="mailto:robertrowel.solon@cvsu.edu.ph"><Icon name="mail" size={18} /> robertrowel.solon@cvsu.edu.ph <Icon name="arrow" size={15} /></a>
              <a className="social-link" href="https://github.com/robertrowelsolon-svg" target="_blank" rel="noreferrer"><Icon name="github" size={17} /> Find me on GitHub <Icon name="arrow" size={14} /></a>
              <p className="contact-hint">Replace the sample email and profile links with your own before publishing.</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit} onChange={() => setFormMessage('')}>
              <div className="form-heading"><span className="eyebrow">A LITTLE HELLO</span><span className="form-sparkle">✳</span></div>
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" type="text" placeholder="What should I call you?" autoComplete="name" required minLength="2" />
              <label htmlFor="contact-email">Your email</label>
              <input id="contact-email" name="email" type="email" placeholder="Email address" autoComplete="email" required />
              <label htmlFor="contact-message">Your message</label>
              <textarea id="contact-message" name="message" rows="4" placeholder="Tell me what’s on your mind..." required minLength="10" />
              <button className="button button-dark form-submit" type="submit">Check my message <Icon name="arrow" size={17} /></button>
              <p className="form-disclaimer">This demo checks your message in the browser; it doesn’t send or store it.</p>
              {formMessage && <p className="form-message" role="status">{formMessage}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer page-width">
        <a className="brand" href="#home"><span className="brand-mark">r.</span><span>robert<span className="brand-muted">solon</span></span></a>
        <p>Made with curiosity & a little bit of code.</p>
        <a href="#home" className="back-to-top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default App
