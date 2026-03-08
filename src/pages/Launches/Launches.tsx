import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useLaunches from '../../hooks/useLaunches'
import useAllLaunches from '../../hooks/useAllLaunches'
import QueryWrapper from '../../components/QueryWrapper/QueryWrapper'
import LaunchesChart from '../../components/LaunchesChart/LaunchesChart'
import type { Filter } from '../../types'
import { FILTER_OPTIONS } from '../../types'
import styles from './Launches.module.css'

export default function Launches() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [filter, setFilter] = useState<Filter>(
    (searchParams.get('filter') as Filter) ?? 'all'
  )
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)

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
  const { filteredData } = useAllLaunches(filter)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Launches</h1>
  
      <div className={styles.controls}>
        <input
          className={styles.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search missions..."
        />
        <div className={styles.filters}>
          {FILTER_OPTIONS.map(f => (
            <button
              key={f}
              className={filter === f ? styles.activeFilter : styles.filter}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
  
      <QueryWrapper isLoading={isLoading} isError={isError} errorMessage="Failed to load launches.">
        <div className={styles.content}>
          <div className={styles.list}>
            <div className={styles.grid}>
              {data?.docs.map(launch => (
                <div
                  key={launch.id}
                  className={styles.card}
                  onClick={() => navigate(`/launches/${launch.id}`)}
                >
                  {launch.links.patch.small
                    ? <img src={launch.links.patch.small} alt={launch.name} className={styles.patch} />
                    : <div className={styles.patchPlaceholder} />
                  }
                  <div className={styles.cardInfo}>
                    <span className={styles.cardName}>{launch.name}</span>
                    <span className={styles.cardDate}>
                      {new Date(launch.date_utc).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <span className={`${styles.cardStatus} ${
                    launch.upcoming ? styles.upcoming
                    : launch.success ? styles.success
                    : styles.failed
                  }`}>
                    {launch.upcoming ? 'Upcoming' : launch.success ? 'Success' : 'Failed'}
                  </span>
                </div>
              ))}
            </div>
  
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                onClick={() => setPage(p => p - 1)}
                disabled={!data?.hasPrevPage}
              >
                Previous
              </button>
              <span className={styles.pageInfo}>
                Page {page} of {data?.totalPages}
              </span>
              <button
                className={styles.pageButton}
                onClick={() => setPage(p => p + 1)}
                disabled={!data?.hasNextPage}
              >
                Next
              </button>
            </div> 
          </div> 
          <div className={styles.chartPanel}>
            <h3 className={styles.chartTitle}>Launches by Year</h3>
            <LaunchesChart launches={filteredData} />
          </div> 
  
        </div>  
      </QueryWrapper>
    </div>  
  )
}