import React from 'react';
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
const { Header } = Layout;

export const MyHeader = (props) => {
    const { isToggled, toggleTrueFalse } = props;
    return (
        <>
            <Header className="shadow flex flex-row items-center" style={{ backgroundColor: 'white' }}>
                {isToggled ? <MenuUnfoldOutlined onClick={toggleTrueFalse} /> : <MenuFoldOutlined onClick={toggleTrueFalse} />}
                <div>

                </div>
            </Header>
        </>
    );
};

