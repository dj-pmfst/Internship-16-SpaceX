import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useInfiniteShips from '../../hooks/useInfiniteShips'
import styles from './Ships.module.css'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

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

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteShips(debouncedSearch)

  const allShips = data?.pages.flatMap(page => page.docs) ?? []

  const sentinelRef = useRef<HTMLDivElement>(null)

  useIntersectionObserver(
    sentinelRef,
    fetchNextPage,
    hasNextPage && !isFetchingNextPage
  )

  return (
    <div className={styles.container}>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search ships..."
        className={styles.search}
      />

      {isLoading && <div className={styles.spinner} />}
      {isError && <p>Failed to load ships.</p>}

      <div className={styles.grid}>
        {allShips.map(ship => (
          <div
            key={ship.id}
            className={styles.card}
            onClick={() => navigate(`/ships/${ship.id}`)}
          >
            {ship.image
              ? <img src={ship.image} alt={ship.name} />
              : <div className={styles.noImage}>No Image</div>
            }
            <h3>{ship.name}</h3>
            <p>{ship.type}</p>
            <span>{ship.active ? 'Active' : 'Inactive'}</span>
          </div>
        ))}
      </div>

      {isFetchingNextPage && <div className={styles.spinner} />}
      {!hasNextPage && !isLoading && <p>No more ships to load.</p>}
    </div>
  )
}