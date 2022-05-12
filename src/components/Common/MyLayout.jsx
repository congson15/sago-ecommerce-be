import React from 'react';
import { Layout } from 'antd';
import { Sidebar } from './Sidebar';
import { MyHeader } from './MyHeader'; 

const { Content } = Layout;
export const MyLayout = (props) => {
    
    const [isToggled, setToggled] = React.useState(false);
    const toggleTrueFalse = () => setToggled(!isToggled);
    const onClose = () => {
        setToggled(false);
    };
    const { childComponent } = props;
    const onBroken = (broken) => {
        setToggled(broken);
    }
    return (
        <Layout style={{ minHeight: '250vh' }}>
            <Sidebar isToggled={isToggled} onClose={onClose} onBroken={onBroken}/>
            <Layout className="md:ml-52" >
                <MyHeader isToggled={isToggled} toggleTrueFalse={toggleTrueFalse}/>
                <Content className="px-12" >
                    {childComponent}
                </Content>
            </Layout>
        </Layout>
    );
};
