import { Dashboard } from "./Dashboard"
import { Page } from "./Page"
import { Welcome } from "./Welcome"
import { useCharacterStore } from "../stores/character"

export function Speedy() {
  const hasData = useCharacterStore((state) => state.characters.length > 0)
  return <Page>{hasData ? <Dashboard /> : <Welcome />}</Page>
}
