import React from 'react';
import { MyLayout } from '../../components/Common/MyLayout';
import { SignIn } from './SignIn';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

export function AuthPage(props) {
    const match = useRouteMatch();
    const { setUserToken } = props;
    return (
        <>
            <SignIn setUserToken={setUserToken}/>
        </>
    );
}