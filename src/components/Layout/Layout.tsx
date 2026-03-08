import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'
import { useTheme } from '../../hooks/useTheme'
import heroVideo from '../../assets/videos/mars.mp4'
import styles from './Layout.module.css'
import toggleIcon from '../../assets/icons/dark-theme.svg'

interface Props {
  children: ReactNode
}

export function Layout({ children }: Props) {
  const { theme, dispatch } = useTheme()

  const toggleTheme = () => {
    dispatch({ type: theme === 'dark' ? 'SET_LIGHT' : 'SET_DARK' })
  }

  return (
    <div className={styles.container}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <header className={styles.header}>
        <img src="/src/assets/icons/SpaceX-Logo.svg" />
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/launches">Launches</NavLink>
          <NavLink to="/ships">Ships</NavLink>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            <img 
              src={toggleIcon}
              className={`${styles.themeIcon} ${theme === 'dark' ? styles.light : styles.dark}`}
            />
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}