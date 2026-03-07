import { useEffect, RefObject } from 'react'

const useIntersectionObserver = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!ref.current || !enabled) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback()
      }
    })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, callback, enabled])
}

export default useIntersectionObserver