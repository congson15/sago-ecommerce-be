import * as React from 'react';
import { Drawer,Layout } from 'antd';
import 'antd/dist/antd.css';
import { MenuItem } from './MenuItem';
const { Sider } = Layout;

export function Sidebar(props) {
    const { isToggled, onClose, onBroken } = props;
    return (
        <>
            <Sider
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
                breakpoint="md"
                collapsedWidth={80}
                collapsed={isToggled}
                onBreakpoint={(broken) => {
                    onBroken(broken);
                }}
                className="md:block hidden"
            >
                <div className="w-full text-transparent cursor-pointer text-gray-50 md:text-center text-2xl font-semibold">
                    Sago
                </div>
                <MenuItem />
            </Sider>
            <Drawer
                placement="left"
                onClose={onClose}
                closable={false}
                visible={isToggled}
                className="md:hidden block"
                bodyStyle={{ backgroundColor: "#001529", padding: "0" }}
            >
                <div className="w-full text-transparent cursor-pointer text-gray-50 md:text-center text-2xl font-semibold">
                    Sago
                </div>
                <MenuItem />
            </Drawer>
        </>
    )
}