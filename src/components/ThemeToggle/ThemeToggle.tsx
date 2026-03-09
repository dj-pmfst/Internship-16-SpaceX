import { useTheme } from '../../hooks/useTheme'
import styles from './ThemeToggle.module.css'
import toggleIcon from '../../assets/icons/dark-theme.svg'

export default function ThemeToggle() {
  const { theme, dispatch } = useTheme()

  const toggleTheme = () => {
    dispatch({ type: theme === 'dark' ? 'SET_LIGHT' : 'SET_DARK' })
  }

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      <img src={toggleIcon} className={styles.themeIcon} alt="Toggle theme" />
    </button>
  )
}