import { ChartDataFormatter, LevelChart } from "./LevelChart"
import type { CharacterLevelTimes } from "../../stores/character"

function calculateTimePlayedPerLevel(levelData: CharacterLevelTimes) {
  return Object.keys(levelData)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((level) => {
      const prevLevel = `${parseInt(level) - 1}`
      return {
        level,
        played:
          level === "1"
            ? 0
            : !levelData[prevLevel]
            ? null
            : (levelData[level]?.Played - levelData[prevLevel]?.Played) / 60,
      }
    })
}

const formatChartData: ChartDataFormatter = (char) => {
  return calculateTimePlayedPerLevel(char.LevelTimes).map((t) => ({
    x: t.level,
    y: t.played,
  }))
}

export function TimePlayedPerLevel() {
  return (
    <LevelChart
      formatter={formatChartData}
      title="Time Played Per Level"
      type="bar"
    />
  )
}
