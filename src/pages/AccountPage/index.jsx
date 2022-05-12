import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { Account } from './Account';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

export function AccountPage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                
                <Route exact path={match.url}>
                    <MyLayout childComponent={<Account />} />
                </Route>
            </Switch>
        </>
    );
}
