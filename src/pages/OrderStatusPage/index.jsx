import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { OrderStatus } from './OrderStatus';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { OrderStatusEditing } from './components/OrderStatusEditing';

export function OrderStatusPage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route path={match.url + '/:id'}>
                    <MyLayout childComponent={<OrderStatusEditing />} />
                </Route>
                <Route exact path={match.url}>
                    <MyLayout childComponent={<OrderStatus />} />
                </Route>
            </Switch>
        </>
    );
}
