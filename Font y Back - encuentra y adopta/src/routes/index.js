import { Redirect, Route, Switch } from "react-router-dom";
import { routes } from "./routes";

const Routes = () => {
    return (
      <Switch>
          {
              routes.map(({component, path}, idx) => <Route key={idx} exact path={path} component={component} />)
          }
          <Redirect to="/home" />
      </Switch>
    );
  };
  
  export default Routes;