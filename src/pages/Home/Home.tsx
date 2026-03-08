import { useQuery } from '@tanstack/react-query'
import { getCompanyInfo, getNextLaunch } from '../../api'
import withErrorBoundary from '../../hoc/withErrorBoundary'
import useCountdown from '../../hooks/useCountdown'
import styles from './Home.module.css'

function Home() {
  const { data: company, isLoading: companyLoading } = useQuery({
    queryKey: ['company'],
    queryFn: getCompanyInfo,
  })

  const { data: nextLaunch, isLoading: launchLoading } = useQuery({
    queryKey: ['nextLaunch'],
    queryFn: getNextLaunch,
  })

  const { days, hours, minutes, seconds } = useCountdown(
    nextLaunch?.date_utc ?? ''
  )

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>SpaceX Mission Control</h1>
        </div>
      </section>

      <section>
        <h2>Next Launch: {nextLaunch?.name}</h2>
        {launchLoading ? (
          <div className={styles.spinner} />
        ) : (
          <div className={styles.countdown}>
            <div className={styles.countdownItem}>{days}d</div>
            <div className={styles.countdownItem}>{hours}h</div>
            <div className={styles.countdownItem}>{minutes}m</div>
            <div className={styles.countdownItem}>{seconds}s</div>
          </div>
        )}
      </section>

      <section className={styles.about}>
        {companyLoading ? (
          <div className={styles.skeleton} />
        ) : (
          <p>{company?.summary}</p>
        )}
      </section>
    </div>
  )
}

export default withErrorBoundary(Home)