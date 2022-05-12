import * as React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import {
    DesktopOutlined,
    DashboardOutlined,
    BarsOutlined,
    UserOutlined,
    GiftOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    LogoutOutlined
    
} from '@ant-design/icons';
const { SubMenu } = Menu;
export function MenuItem(){
    let location = useLocation();
    const history = useHistory();
    const [current, setCurrent] = React.useState(
        location.pathname === "/" || location.pathname === ""
            ? "/"
            : location.pathname,
    );
    const handleSignOutClick = () => {
        localStorage.removeItem("access_token");
        window.location.reload();
        history.push('/');
        
    }
    React.useEffect(() => {
        if (location) {
            if( current !== location.pathname ) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    return(
        <Menu theme="dark" mode="inline" selectedKeys={[current]}>
                    <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
                        <Link to="/">Trang chủ</Link>
                    </Menu.Item>
                    <Menu.Item key="/products" icon={<ShopOutlined />}>
                        <Link to="/products">Quản lý sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
                        <Link to="/orders">Quản lý đơn hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="/supply" icon={<UserOutlined />}>
                        <Link to="/supply">Quản lý phiếu nhập</Link>
                    </Menu.Item>
                    <Menu.Item key="/accounts" icon={<UserOutlined />}>
                        <Link to="/accounts">Quản lý tài khoản</Link>
                    </Menu.Item>
                    <Menu.Item key="/vouchers" icon={<GiftOutlined />}>
                        <Link to="/vouchers">Quản lý mã giảm giá</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<BarsOutlined />} title="Quản lý danh mục">
                        <Menu.Item key="/suppliers" icon={<DesktopOutlined />}>
                            <Link to="/suppliers">Nhà cung cấp</Link>
                        </Menu.Item>
                        <Menu.Item key="/brands" icon={<DesktopOutlined />}>
                            <Link to="/brands">Nhãn hiệu</Link>
                        </Menu.Item>
                        <Menu.Item key="/order-status" icon={<DesktopOutlined />}>
                            <Link to="/order-status">Trạng thái đơn hàng</Link>
                        </Menu.Item>
                        <Menu.Item key="/sizes" icon={<DesktopOutlined />}>
                            <Link to="/sizes">Kích cỡ</Link>
                        </Menu.Item>
                        <Menu.Item key="/colors" icon={<DesktopOutlined />}>
                            <Link to="/colors">Màu sắc</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/signout" icon={<LogoutOutlined />}>
                        <button onClick={handleSignOutClick}>Đăng xuất</button>
                    </Menu.Item>

                </Menu>
    )
}