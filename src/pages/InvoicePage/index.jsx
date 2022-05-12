import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { Invoice } from './Invoice';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

export function InvoicePage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={match.url}>
                    <MyLayout childComponent={<Invoice />} />
                </Route>
            </Switch>

        </>
    );
}
