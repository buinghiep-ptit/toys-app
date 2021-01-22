import React, { useCallback, Fragment } from 'react';
import { Router, Switch } from "react-router-dom";
import { history } from 'utils/helpers/history';
import { routes } from 'routes';
import { PublicRoute } from 'layouts';

function App() {
    const renderRoutes = useCallback(routes => {
        let result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                const { path, exact, component, layout } = route;
                return (
                    <PublicRoute
                        key={index}
                        path={path}
                        exact={exact}
                        layout={layout}
                        component={component}
                    />
                );
            });
        }
        return <Switch>{result}</Switch>;
    }, []);
    console.log('App!');
    return (
        <Router history={history}>
            <Fragment>
                {renderRoutes(routes)}
            </Fragment>
        </Router>
    );
}

export default App;