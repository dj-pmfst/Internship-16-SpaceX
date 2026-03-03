import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'
import styles from './Layout.module.css'

interface Props {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/launches">Launches</NavLink>
          <NavLink to="/ships">Ships</NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}