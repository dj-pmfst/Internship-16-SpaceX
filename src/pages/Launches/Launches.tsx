import { useSearchParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useLaunches from '../../hooks/useLaunches'
import useAllLaunches from '../../hooks/useAllLaunches'
import QueryWrapper from '../../components/QueryWrapper/QueryWrapper'
import LaunchesChart from '../../components/LaunchesChart/LaunchesChart'
import LaunchCard from '../../components/LaunchCard/LaunchCard'
import type { Filter } from '../../types'
import { FILTER_OPTIONS } from '../../types'
import styles from './Launches.module.css'
import withErrorBoundary from '../../hoc/withErrorBoundary'

function Launches() {
  const [searchParams, setSearchParams] = useSearchParams()

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
                <LaunchCard key={launch.id} launch={launch} />
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

export default withErrorBoundary(Launches)