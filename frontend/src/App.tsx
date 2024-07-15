import { useT } from "./assets/i18n"

function App() {
  const t = useT()

  return (
    <>
      <h1>{t("application.global.applicationName")}</h1>
    </>
  )
}

export default App
