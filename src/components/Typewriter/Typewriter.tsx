import useTypewriter from '../../hooks/useTypewriter'
import styles from './Typewriter.module.css'

interface Props {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export default function Typewriter({ text, speed = 50, delay = 0, className }: Props) {
  const { displayed, isDone } = useTypewriter(text, speed, delay)

  return (
    <span className={className}>
      {displayed}
      {!isDone && <span className={styles.cursor}>|</span>}
    </span>
  )
}