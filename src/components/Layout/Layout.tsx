import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import styles from './Layout.module.css'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import Background from '../Background/Background'

interface Props {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className={styles.container}>
      <Background />

      <header className={styles.header}>
        <img src="/src/assets/icons/SpaceX-Logo.svg" className={styles.logo} alt="SpaceX" />
        <nav className={styles.nav}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/launches">Launches</NavLink>
          <NavLink to="/ships">Ships</NavLink>
          <ThemeToggle />
        </nav>
        <div className={styles.mobileRight}>
          <ThemeToggle />
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
          </button>
        </div>
      </header>

      {menuOpen && <div className={styles.backdrop} onClick={closeMenu} />}

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <button className={styles.closeMenu} onClick={closeMenu}>✕</button>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/launches" onClick={closeMenu}>Launches</NavLink>
        <NavLink to="/ships" onClick={closeMenu}>Ships</NavLink>
      </div>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}