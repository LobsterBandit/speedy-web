import { useMemo } from "react"
import { Bar, Line } from "react-chartjs-2"
import { allSelected, useCharacterStore } from "../../stores/character"
import { getColor, levels, toRGBString, transparentize } from "./utils"

/**
 * Calculate time played per level.
 * @example
 * in:
 * {
 *    // both in seconds
 *   "1": { Played: int, LastUpdated: int }
 *   ...
 * }
 * out:
 * [
 *   {
 *     level: string,
 *     played: int,
 *   },
 *   ...
 * ]
 */
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

/**
 * Transform character data into chart.js dataset format.
 * @example
 * in:
 * {
 *   CHAR_KEY_1: {
 *     Key: CHAR_KEY_1,
 *     ...
 *     LevelTimes: {
 *       1: { Played, LastUpdated }
 *     }
 *   },
 *   ...
 * }
 * out:
 * {
 *   datasets: [
 *     {
 *       label: CHAR_KEY_1,
 *       data: [{ x: level, y: time.Played - prevLevelTimePlayed }],
 *       borderColor: ...,
 *       backgroundColor: ...
 *     },
 *     ...
 *   ]
 * }
 */
function formatDataForChart(data, showAll) {
  const seenLevels = new Set()
  const datasets = []

  for (const [, char] of Object.entries(data)) {
    const color = getColor(showAll ? datasets.length : null)
    datasets.push({
      label: char.Name,
      backgroundColor: transparentize(color),
      borderColor: toRGBString(color),
      fill: true,
      data: calculateTimePlayedPerLevel(char.LevelTimes).map((t) => {
        seenLevels.add(t.level)
        return {
          x: t.level,
          y: t.played,
        }
      }),
    })
  }

  return {
    ...(!showAll && {
      labels: levels.filter((level) => seenLevels.has(level)),
    }),
    datasets,
  }
}

function selectChartData(state) {
  const key = state.selected.Key
  const showAll = key === allSelected.Key
  return {
    showAll,
    chartData: formatDataForChart(
      showAll ? state.characterData : { [key]: state.characterData[key] },
      showAll
    ),
  }
}

const defaultOptions = {
  parsing: false,
  normalized: true,
  plugins: {
    title: {
      display: true,
      text: "Time Played Per Level",
    },
  },
}

export function TimePlayedPerLevel({ type = "line" } = {}) {
  const { chartData, showAll } = useCharacterStore(selectChartData)
  console.log(chartData)

  const chartOptions = useMemo(
    () =>
      showAll
        ? {
            ...defaultOptions,
            scales: { x: { type: "linear", min: 1, max: 70 } },
          }
        : defaultOptions,
    [showAll]
  )

  const Chart = type === "line" ? Line : type === "bar" ? Bar : Line

  return <Chart data={chartData} options={chartOptions} />
}
