import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { Color } from './Color';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ColorEditing } from './components/ColorEditing';

export function ColorPage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route path={match.url + '/:id'}>
                    <MyLayout childComponent={<ColorEditing />} />
                </Route>
                <Route exact path={match.url}>
                    <MyLayout childComponent={<Color />} />
                </Route>
            </Switch>

        </>
    );
}
