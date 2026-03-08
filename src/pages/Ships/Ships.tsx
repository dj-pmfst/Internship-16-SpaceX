import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useInfiniteShips from '../../hooks/useInfiniteShips'
import styles from './Ships.module.css'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import ShipCard from '../../components/ShipCard/ShipCard'
import withErrorBoundary from '../../hoc/withErrorBoundary'
import QueryWrapper from '../../components/QueryWrapper/QueryWrapper'


function Ships() {
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
  
      <QueryWrapper isLoading={isLoading} isError={isError} errorMessage="Failed to load ships.">
        <div className={styles.grid}>
          {allShips.map(ship => (
            <ShipCard
              key={ship.id}
              ship={ship}
              onClick={() => navigate(`/ships/${ship.id}`)}
            />
          ))}
        </div>
  
        <div ref={sentinelRef} style={{ height: '1px' }} />
  
        {isFetchingNextPage && <div className={styles.spinner} />}
        {!hasNextPage && !isLoading && <p>No more ships to load.</p>}
      </QueryWrapper>
    </div>
  )
}

export default withErrorBoundary(Ships)