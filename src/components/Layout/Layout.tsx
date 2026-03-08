import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'
import { useTheme } from '../../hooks/useTheme'
import videoDark from '../../assets/videos/mars.mp4'
import imageLight from '../../assets/images/rocket.jpg'
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
      {theme === 'dark' ? (
        <video
          key="dark"
          className={styles.background}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoDark} type="video/mp4" />
        </video>
      ) : (
        <img
          key="light"
          src={imageLight}
          className={styles.background}
          alt="background"
        />
      )}

      <header className={styles.header}>
        <img src="/src/assets/icons/SpaceX-Logo.svg" className={styles.logo} />
        <nav className={styles.nav}>
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