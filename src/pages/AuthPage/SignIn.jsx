import * as React from 'react';
import { Redirect, useHistory } from 'react-router';
import axiosClient from '../../api/axiosClient';
import { message } from 'antd';

export function SignIn(props) {
    let history = useHistory();
    const { setUserToken } = props;
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();


    let fetchData = async (path, formData) => {
        try {
            let result = await axiosClient.post(path, formData);
            return result;
        } catch (error) {
            message.success('This is a success message');
        }
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleButtonClick = async () => {
        let formData = {
            email: username,
            password: password
        }
        try {
            let result = await fetchData("/auth/staffs/sign-in", formData);
            
            if (result.data === "email not found" || result.data.content === 'Wrong username or password') {
                message.error(result.data);
                return;
            }
            localStorage.setItem("access_token", result.data.token);   
            setUserToken(result.data.token);
            window.location.reload();
            message.success("Sign in success");
            
        } catch (error) {
            message.error(error);
        }

    }
    return (
        <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
            <div className="container mx-auto">
                <div className="max-w-md mx-auto my-10">
                    <div className="text-center">
                        <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Đăng nhập</h1>
                    </div>
                    <div className="m-7">
                        <div className="mb-6">
                            <label className="block mb-2 text-sm text-gray-600">Tên đăng nhập</label>
                            <input defaultValue={username} onBlur={handleUsernameChange} type="text" name="username" id="username" placeholder="Tên đăng nhập" className={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md`} />
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <label className="text-sm text-gray-600 dark:text-gray-400">Mật khẩu</label>
                                
                            </div>
                            <input defaultValue={password} onBlur={handlePasswordChange} type="password" name="password" id="password" placeholder="Mật khẩu của bạn" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="mb-6">
                            <button type="button" onClick={handleButtonClick} className="w-full px-3 py-4 text-white bg-purple-500 rounded-md focus:bg-purple-600 focus:outline-none">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

