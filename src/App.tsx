import { Router } from "./router/Router";
import "./styles/global.module.scss";
import appStyle from "./styles/app.module.scss";

function App() {
    return (
        <div className={appStyle.app}>
            <Router />
        </div>
    );
}

export default App;
