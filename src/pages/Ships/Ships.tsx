import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useInfiniteShips from '../../hooks/useInfiniteShips'
import styles from './Ships.module.css'

export default function Ships() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    const params: Record<string, string> = {}
    if (debouncedSearch) params.search = debouncedSearch
    setSearchParams(params)
  }, [debouncedSearch])


  return (
    <div className={styles.container}>
    </div>
  )
}