import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { GoodReceipt } from './GoodReceipt';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Invoice } from "./Detail/Invoice";
export function GoodReceiptPage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route path={match.url + '/:id'}>
                    <MyLayout childComponent={<Invoice />} />
                </Route>
                <Route exact path={match.url}>
                    <MyLayout childComponent={<GoodReceipt />} />
                </Route>
            </Switch>

        </>
    );
}
