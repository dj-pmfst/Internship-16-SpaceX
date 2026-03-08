import { useQuery } from '@tanstack/react-query'
import { getCompanyInfo, getNextLaunch } from '../../api'
import withErrorBoundary from '../../hoc/withErrorBoundary'
import useCountdown from '../../hooks/useCountdown'
import styles from './Home.module.css'
import QueryWrapper from '../../components/QueryWrapper/QueryWrapper'

function Home() {
  const { data: company, isLoading: companyLoading } = useQuery({
    queryKey: ['company'],
    queryFn: getCompanyInfo,
  })

  const { data: nextLaunch, isLoading: launchLoading } = useQuery({
    queryKey: ['nextLaunch'],
    queryFn: getNextLaunch,
  })

  const { days, hours, minutes, seconds } = useCountdown('2026-12-01T00:00:00.000Z')

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>SpaceX Mission <br/> Control</h1>
        </div>
        <QueryWrapper isLoading={launchLoading} isError={false} errorMessage="Failed to load next launch.">
          {nextLaunch && (
            <section>
              <h2>
                <span>Next Launch</span>
                <span>{nextLaunch.name}</span>
              </h2>
              <div className={styles.countdown}>
                <div className={styles.countdownItem}>{days}d</div>
                <div className={styles.countdownItem}>{hours}h</div>
                <div className={styles.countdownItem}>{minutes}m</div>
                <div className={styles.countdownItem}>{seconds}s</div>
              </div>
            </section>
          )}
        </QueryWrapper>
      </section>

      <QueryWrapper isLoading={companyLoading} isError={false} errorMessage="Failed to load company info.">
        {company && (
          <section className={styles.about}>
            <h2>About SpaceX</h2>
            <p>{company.summary}</p>
            <p>Founded: {company.founded} by {company.founder}</p>
            <p>Employees: {company.employees.toLocaleString()}</p>
          </section>
        )}
      </QueryWrapper>
    </div>
  )
}

export default withErrorBoundary(Home)