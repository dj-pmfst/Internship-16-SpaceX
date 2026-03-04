import styles from './Launches.module.css'
import useLaunches from '../../hooks/useLaunches'
import useDebounce from '../../hooks/useDebounce'

export default function Launches() {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<Filter>('all')

    const { data, isLoading, isError } = useLaunches(page, search, filter)
}

