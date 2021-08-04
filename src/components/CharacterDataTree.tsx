import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import { TreeItem, TreeView } from "@material-ui/lab"
import {
  Character,
  CharacterLevelTimes,
  CharacterStore,
  SELECTED_ALL,
  useCharacterStore,
} from "../stores/character"

function treeDataSelector(state: CharacterStore) {
  const key = state.selected.Key
  const showAll = key === SELECTED_ALL.Key
  return showAll ? state.characterData : { [key]: state.characterData[key] }
}

export function CharacterDataTree() {
  const data = useCharacterStore(treeDataSelector)
  console.log(data)

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={[]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {Object.entries(data).map(([k, v]) => (
        <TreeItem key={k} nodeId={k} label={v.Name}>
          {Object.entries(v).map(([key, value]) =>
            key === "LevelTimes" ? (
              <TreeItem key={`${k}-${key}`} nodeId={`${k}-${key}`} label={key}>
                {Object.entries(value as CharacterLevelTimes).map(
                  ([level, time]) => (
                    <TreeItem
                      key={`${k}-${level}`}
                      nodeId={`${k}-${level}`}
                      label={level}
                    >
                      <TreeItem
                        key={`${k}-${level}-Played`}
                        nodeId={`${k}-${level}-Played`}
                        label={`Cumulative Played: ${time.Played}`}
                      />
                      <TreeItem
                        key={`${k}-${level}-LastUpdated`}
                        nodeId={`${k}-${level}-LastUpdated`}
                        label={`Last Updated: ${new Date(
                          time.LastUpdated * 1000
                        ).toLocaleString()}`}
                      />
                    </TreeItem>
                  )
                )}
              </TreeItem>
            ) : key === "LastSeen" ? (
              <TreeItem
                key={`${k}-${key}`}
                nodeId={`${k}-${key}`}
                label={`${key}: ${new Date(
                  (value as Character["LastSeen"]) * 1000
                ).toLocaleString()}`}
              />
            ) : (
              <TreeItem
                key={key}
                nodeId={key}
                label={`${key}: ${value as keyof Character}`}
              />
            )
          )}
        </TreeItem>
      ))}
    </TreeView>
  )
}
