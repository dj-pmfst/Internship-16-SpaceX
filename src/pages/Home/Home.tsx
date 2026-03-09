import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCompanyInfo, getNextLaunch } from '../../api'
import withErrorBoundary from '../../hoc/withErrorBoundary'
import useCountdown from '../../hooks/useCountdown'
import styles from './Home.module.css'
import QueryWrapper from '../../components/QueryWrapper/QueryWrapper'
import Typewriter from '../../components/Typewriter/Typewriter'

const SPEED = 50

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

  const { summary, line1, line2, summaryDelay, line1Delay } = useMemo(() => {
    const summary = company?.summary ?? ''
    const line1 = company ? `Founded: ${company.founded} by ${company.founder}` : ''
    const line2 = company ? `Employees: ${company.employees.toLocaleString()}` : ''
    const summaryDelay = summary.length * SPEED
    const line1Delay = line1.length * SPEED
    return { summary, line1, line2, summaryDelay, line1Delay }
  }, [company])

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>SpaceX Mission <br /> Control</h1>
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
            <p><Typewriter text={summary} speed={SPEED} /></p>
            <p><Typewriter text={line1} speed={SPEED} delay={summaryDelay} /></p>
            <p><Typewriter text={line2} speed={SPEED} delay={summaryDelay + line1Delay} /></p>
          </section>
        )}
      </QueryWrapper>
    </div>
  )
}

export default withErrorBoundary(Home)