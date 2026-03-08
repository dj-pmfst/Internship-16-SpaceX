import { ReactNode } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import styles from './QueryWrapper.module.css'

interface Props {
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  children: ReactNode
}

export default function QueryWrapper({ isLoading, isError, errorMessage, children }: Props) {
  if (isLoading) return <div className={styles.spinner} />
  if (isError) return <ErrorMessage message={errorMessage} />
  return <>{children}</>
}