import speedy from "../../speedy.svg";

export function Home() {
  return (
    <>
      <header>Speedy</header>
      <main>
        <img height={200} width={200} src={speedy} alt="speedy" />
        <p>Welcome to Speedy</p>
        <p>
          <strong>Import</strong> data from the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.curseforge.com/wow/addons/speedy"
          >
            Speedy addon
          </a>{" "}
          to get started!
        </p>
      </main>
    </>
  );
}
