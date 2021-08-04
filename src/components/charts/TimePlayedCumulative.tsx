import { ChartDataFormatter, LevelChart } from "./LevelChart"
import { levels } from "./utils"

const formatChartData: ChartDataFormatter = (char, showAll) => {
  return showAll
    ? levels.map((level) => ({
        x: level,
        y: char.LevelTimes[level] ? char.LevelTimes[level].Played / 60 : null,
      }))
    : Object.entries(char.LevelTimes).map(([level, time]) => ({
        x: level,
        y: time.Played / 60,
      }))
}

export function TimePlayedCumulative() {
  return (
    <LevelChart
      formatter={formatChartData}
      title="Cumulative Time Played At Level"
    />
  )
}
