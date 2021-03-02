import React, { useCallback, Fragment, useEffect } from 'react';
import { Router, Switch } from "react-router-dom";
import { history } from 'utils/helpers/history';
import { connect } from 'react-redux';
import { routes } from 'routes';
import { PublicRoute } from 'layouts';
import { initRouter } from 'redux/actions/routerActions';

import Footer from 'components/footer/Footer';

function App({ initRouter }) {
    useEffect(() => {
        initRouter();
    }, [initRouter]);
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
    return (
        <Router history={history}>
            <Fragment>
                {renderRoutes(routes)}
                <Footer />
            </Fragment>
        </Router>
    );
}

export default connect(null, {
    initRouter,
})(App);