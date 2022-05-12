import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { Brand } from './Brand';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BrandEditing } from './components/BrandEditing';

export function BrandPage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route path={match.url + '/:id'}>
                    <MyLayout childComponent={<BrandEditing />} />
                </Route>
                <Route exact path={match.url}>
                    <MyLayout childComponent={<Brand />} />
                </Route>
            </Switch>

        </>
    );
}