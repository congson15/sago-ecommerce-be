import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { Home } from './Home';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

export function HomePage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={match.url}>
                    <MyLayout childComponent={<Home />} />
                </Route>
            </Switch>

        </>
    );
}
