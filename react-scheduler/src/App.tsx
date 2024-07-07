import { AppContainer } from "./components/app_container/AppContainer";
import { Header } from "./components/header/Header";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <AppContainer />
    </div>
  );
}

export default App;
