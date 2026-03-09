import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Launch } from '../../types'

interface Props {
  launches: Launch[]
}

export default function LaunchesChart({ launches }: Props) {
  const chartData = useMemo(() => {
    const counts = launches.reduce((acc: Record<string, number>, launch) => {
      const year = new Date(launch.date_utc).getFullYear().toString()
      acc[year] = (acc[year] || 0) + 1
      return acc
    }, {})

    return Object.entries(counts)
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => Number(a.year) - Number(b.year))
  }, [launches])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#4b4f52" />
      </BarChart>
    </ResponsiveContainer>
  )
}