import { AppContainer } from "./components/app_container/AppContainer";
import { Header } from "./components/header/Header";
import styles from "./App.module.scss";
import { Login, useIsSignedIn } from "@microsoft/mgt-react";

function App() {
  const [isSignedIn] = useIsSignedIn();

  return (
    <div className={styles.app}>
      {isSignedIn ? (
        <>
          <Header />
          <AppContainer />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
