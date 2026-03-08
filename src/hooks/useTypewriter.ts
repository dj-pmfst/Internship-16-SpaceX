import { useState, useEffect } from 'react'

const useTypewriter = (text: string, speed: number = 50, delay: number = 0) => {
  const [displayed, setDisplayed] = useState('')
  const [isDone, setIsDone] = useState(false)
  const [started, setStarted] = useState(delay === 0)

  useEffect(() => {
    if (delay === 0) return
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    setDisplayed('')
    setIsDone(false)
    let i = 0

    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setIsDone(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, started])

  return { displayed, isDone }
}

export default useTypewriter