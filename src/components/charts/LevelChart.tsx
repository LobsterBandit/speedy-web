import { Box } from "@material-ui/core"
import { memo, useCallback, useMemo } from "react"
import { Bar, Line } from "react-chartjs-2"
import shallow from "zustand/shallow"
import {
  Character,
  CharacterData,
  CharacterStore,
  SELECTED_ALL,
  useCharacterStore,
} from "../../stores/character"
import { getColor, levels, toRGBString, transparentize } from "./utils"

const getDefaultOptions = (title: string) => ({
  parsing: false,
  normalized: true,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: title,
    },
  },
})

const levelScaleOptions = {
  scales: { x: { type: "linear", min: 1, max: 70 } },
}

function formatChartData(
  data: CharacterData,
  formatter: ChartDataFormatter,
  showAll: boolean
) {
  const seenLevels = new Set()
  const datasets = []

  for (const [, char] of Object.entries(data)) {
    const color = getColor(showAll ? datasets.length : null)
    Object.keys(char.LevelTimes).forEach((level) => seenLevels.add(level))
    datasets.push({
      label: char.Name,
      backgroundColor: transparentize(color),
      borderColor: toRGBString(color),
      fill: true,
      data: formatter(char, showAll),
    })
  }

  return {
    ...(!showAll && {
      labels: levels.filter((level) => seenLevels.has(level)),
    }),
    datasets,
  }
}

const createChartDataSelector =
  (formatter: ChartDataFormatter) => (state: CharacterStore) => {
    const key = state.selected.Key
    const showAll = key === SELECTED_ALL.Key
    return {
      showAll,
      chartData: formatChartData(
        showAll ? state.characterData : { [key]: state.characterData[key] },
        formatter,
        showAll
      ),
    }
  }

interface ChartPoint {
  x: string
  y: string | number | null
}

export interface ChartDataFormatter {
  (data: Character, showAll: boolean): ChartPoint[]
}

interface LevelChartProps {
  formatter: ChartDataFormatter
  title: string
  type?: "line" | "bar"
}

export const LevelChart = memo(function LevelChart({
  formatter,
  title,
  type = "line",
}: LevelChartProps) {
  const { chartData, showAll } = useCharacterStore(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(createChartDataSelector(formatter), [formatter]),
    shallow
  )

  const chartOptions = useMemo(
    () => ({
      ...getDefaultOptions(title),
      ...(showAll && levelScaleOptions),
    }),
    [showAll, title]
  )

  const Chart = useMemo(
    () => (type === "line" ? Line : type === "bar" ? Bar : Line),
    [type]
  )

  return (
    <Box alignSelf="center" position="relative" height="35vh" width="90%">
      <Chart data={chartData} options={chartOptions} />
    </Box>
  )
})
