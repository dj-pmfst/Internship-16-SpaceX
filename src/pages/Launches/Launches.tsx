import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useLaunches from '../../hooks/useLaunches'
import styles from './Launches.module.css'
import LaunchesChart from '../../components/LaunchesChart/LaunchesChart'

type Filter = 'all' | 'success' | 'failed' | 'upcoming'

export default function Launches() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [filter, setFilter] = useState<Filter>(
    (searchParams.get('filter') as Filter) ?? 'all'
  )
  const [page, setPage] = useState(
    Number(searchParams.get('page')) || 1
  )

  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    const params: Record<string, string> = { filter, page: String(page) }
    if (debouncedSearch) params.search = debouncedSearch
    setSearchParams(params)
  }, [debouncedSearch, filter, page])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, filter])

  const { data, isLoading, isError } = useLaunches(page, debouncedSearch, filter)

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search missions..."
      />

      <div className={styles.filters}>
        {(['all', 'success', 'failed', 'upcoming'] as Filter[]).map(f => (
          <button
            key={f}
            className={filter === f ? styles.activeFilter : styles.filter}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading && <div className={styles.spinner} />}

      {isError && <p>Failed to load launches. Please try again.</p>}

      {!isLoading && data && (
        <LaunchesChart launches={data.docs} />
        )}

      {!isLoading && !isError && (
        <div className={styles.grid}>
          {data?.docs.map(launch => (
            <div
              key={launch.id}
              className={styles.card}
              onClick={() => navigate(`/launches/${launch.id}`)}
            >
              <img
                // src={launch.links.patch.small ?? 'PRONAC SLIKU'} !!!!!!
                alt={launch.name}
              />
              <h3>{launch.name}</h3>
              <p>{new Date(launch.date_utc).toLocaleDateString()}</p>
              <span>
                {launch.upcoming ? '🔜 Upcoming' : launch.success ? 'Success' : 'Failed'}
              </span>
            </div>
          ))}
        </div>
      )}

      {!isLoading && data && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={!data.hasPrevPage}
          >
            Previous
          </button>
          <span>Page {page} of {data.totalPages}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={!data.hasNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}