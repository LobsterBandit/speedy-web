import { useMemo } from "react"
import { Line } from "react-chartjs-2"
import { allSelected, useCharacterStore } from "../../stores/character"

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
      data: [...levelTimes.Played],
      borderColor: ...,
      backgroundColor: ...
    },
    ...
  ]
}
*/
function formatCharDataForChart(data) {
  const seenLevels = {}
  const datasets = []
  for (const [key, char] of Object.entries(data)) {
    console.log(key, char)
    datasets.push({
      label: char.Name,
      data: Object.entries(char.LevelTimes).map(([level, time]) => {
        seenLevels[level] = (seenLevels[level] ?? 0) + 1
        return {
          x: level,
          // time.Played in seconds
          y: time.Played / 60,
        }
      }),
    })
  }

  return {
    labels: levels.filter((level) => !!seenLevels[level]),
    datasets,
  }
}

function selectCurrentCharacterData(state) {
  return state.selected.Key === allSelected.Key
    ? state.characterData
    : { [state.selected.Key]: state.characterData[state.selected.Key] }
}

const options = {}

export function TimePlayedPerLevel() {
  const data = useCharacterStore(selectCurrentCharacterData)
  const chartData = useMemo(() => formatCharDataForChart(data), [data])
  console.log(chartData)

  return <Line data={chartData} options={options} />
}
