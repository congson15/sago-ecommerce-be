import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { Size } from './Size';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { SizeEditing } from './components/SizeEditing';

export function SizePage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route path={match.url + '/:id'}>
                    <MyLayout childComponent={<SizeEditing />} />
                </Route>
                <Route exact path={match.url}>
                    <MyLayout childComponent={<Size />} />
                </Route>
            </Switch>

        </>
    );
}
