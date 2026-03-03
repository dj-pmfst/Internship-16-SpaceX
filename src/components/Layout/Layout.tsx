import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'
import { useTheme } from '../../hooks/useTheme'
import styles from './Layout.module.css'

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
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/launches">Launches</NavLink>
          <NavLink to="/ships">Ships</NavLink>
          <button onClick={toggleTheme}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </nav>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}