import styles from './ErrorMessage.module.css'

interface Props {
  message?: string
}

export default function ErrorMessage({ message = 'Something went wrong. Please try again.' }: Props) {
  return (
    <div className={styles.container}>
      <p>{message}</p>
    </div>
  )
}