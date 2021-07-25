import { LevelChart } from "./LevelChart"

function calculateTimePlayedPerLevel(levelData) {
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

function formatChartData(char) {
  return calculateTimePlayedPerLevel(char.LevelTimes).map((t) => {
    return {
      x: t.level,
      y: t.played,
    }
  })
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
