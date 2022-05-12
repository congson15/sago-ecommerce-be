import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Voucher } from './Voucher';

export function VoucherPage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={match.url}>
                    <MyLayout childComponent={<Voucher />} />
                </Route>
            </Switch>
        </>
    );
}
