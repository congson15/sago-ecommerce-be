import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { Supplier } from './Supplier';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { SupplierEditing } from './components/SupplierEditing';

export function SupplierPage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route path={match.url + '/:id'}>
                    <MyLayout childComponent={<SupplierEditing />} />
                </Route>
                <Route exact path={match.url}>
                    <MyLayout childComponent={<Supplier />} />
                </Route>
            </Switch>
        </>
    );
}
