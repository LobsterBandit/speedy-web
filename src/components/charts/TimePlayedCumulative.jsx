import { useMemo } from "react"
import { Line } from "react-chartjs-2"
import { allSelected, useCharacterStore } from "../../stores/character"
import { getColor, toStringRGBA, transparentize } from "./utils"

const levels = Array.from({ length: 70 }, (_, i) => `${i + 1}`)
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
function formatDataForChart(data, selected) {
  const showAll = selected === allSelected.Key
  const seenLevels = {}
  const datasets = []

  for (const [key, char] of Object.entries(data)) {
    console.log(key, char)
    const color = getColor(showAll ? datasets.length : null)
    datasets.push({
      label: char.Name,
      backgroundColor: transparentize(color),
      borderColor: toStringRGBA(color),
      data: Object.entries(char.LevelTimes).map(([level, time]) => {
        seenLevels[level] = (seenLevels[level] ?? 0) + 1
        return {
          x: level,
          // time.Played is in seconds
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

function selectCurrentCharacterData(state) {
  return state.selected.Key === allSelected.Key
    ? { data: state.characterData, selected: state.selected.Key }
    : {
        data: { [state.selected.Key]: state.characterData[state.selected.Key] },
        selected: state.selected.Key,
      }
}

const options = {
  parsing: false,
  normalized: true,
}

export function TimePlayedCumulative() {
  const { data, selected } = useCharacterStore(selectCurrentCharacterData)
  const chartData = useMemo(
    () => formatDataForChart(data, selected),
    [data, selected]
  )
  console.log(chartData)

  const chartOptions = useMemo(
    () =>
      selected === allSelected.Key
        ? { ...options, scales: { x: { type: "linear", min: 1, max: 70 } } }
        : options,
    [selected]
  )

  return <Line data={chartData} options={chartOptions} />
}
