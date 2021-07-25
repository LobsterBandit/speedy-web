import { useMemo } from "react"
import { Bar, Line } from "react-chartjs-2"
import { allSelected, useCharacterStore } from "../../stores/character"
import { getColor, levels, toRGBString, transparentize } from "./utils"

/*
in:
{
  CHAR_KEY_1: {
    Key: CHAR_KEY_1,
    ...
    LevelTimes: {
      1: { Played, LastUpdated }
    }
  },
  ...
}
out:
{
  datasets: [
    {
      label: CHAR_KEY_1,
      data: [{ x: level, y: time.Played }],
      borderColor: ...,
      backgroundColor: ...
    },
    ...
  ]
}
*/
function formatDataForChart(data, showAll) {
  const seenLevels = {}
  const datasets = []

  for (const [, char] of Object.entries(data)) {
    const color = getColor(showAll ? datasets.length : null)
    datasets.push({
      label: char.Name,
      backgroundColor: transparentize(color),
      borderColor: toRGBString(color),
      fill: true,
      data: showAll
        ? levels.map((level) => ({
            x: level,
            y: char.LevelTimes[level]
              ? char.LevelTimes[level].Played / 60
              : null,
          }))
        : Object.entries(char.LevelTimes).map(([level, time]) => {
            seenLevels[level] = (seenLevels[level] ?? 0) + 1
            return {
              x: level,
              y: time.Played / 60,
            }
          }),
    })
  }

  return {
    ...(!showAll && { labels: levels.filter((level) => !!seenLevels[level]) }),
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
      text: "Cumulative Time Played At Level",
    },
  },
}

export function TimePlayedCumulative({ type = "line" } = {}) {
  const { chartData, showAll } = useCharacterStore(selectChartData)

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
