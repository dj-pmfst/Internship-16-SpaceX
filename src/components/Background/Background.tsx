import { useTheme } from '../../hooks/useTheme'
import styles from './Background.module.css'
import videoDark from '../../assets/videos/mars.mp4'
import imageLight from '../../assets/images/rocket.jpg'

export default function Background() {
  const { theme } = useTheme()

  return theme === 'dark' ? (
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
  )
}