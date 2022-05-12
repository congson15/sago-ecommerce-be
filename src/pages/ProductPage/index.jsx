import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { Products } from './Products';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ProductEditing } from './components/ProductEditing';
import { ProductAdding } from './components/ProductAdding';

export function ProductPage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route path={`${match.url}/edit/:id`}>
                    <MyLayout childComponent={<ProductEditing />} />
                </Route>
                <Route path={`${match.url}/add`}>
                    <MyLayout childComponent={<ProductAdding />} />
                </Route>
                <Route exact path={match.url}>
                    <MyLayout childComponent={<Products />} />
                </Route>
            </Switch>

        </>
    );
}
