import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useLaunches from '../../hooks/useLaunches'

type Filter = 'all' | 'success' | 'failed' | 'upcoming'

export default function Launches() {
  const [searchParams, setSearchParams] = useSearchParams()

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
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search missions..."
      />
        {/* dodat ostale elemente */}
    </div>
  )
}