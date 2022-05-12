import React from 'react';
import { Input, Modal } from 'antd';
import axios from "axios";
NewSize.propTypes = {

};

function NewSize(props) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [nameSize, setNameSize] = React.useState();
    
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        pushData('/sizes');
        
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);

    };

    const handleCancel = () => {
        setVisible(false);
    };
    const getNameSize = (e) => {
       setNameSize((nameSize)=>({
            ...nameSize,
            name : e.target.value,
       })
       );
    }
    const pushData = async (path) => {
        let options = {
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}${path}`,
            data : nameSize
        }
        try {
            const responsePost = await axios(options).then((res)=>{
                if(res.data){
                    alert("Thêm kích cỡ thành công");
                    props.handleEdit()
                }
            }).catch((err) => {
                if (axios.isCancel(err)) {
                    alert("Thêm thất bại")
                    console.log('Request canceled', err.message);
                } else {
                    alert("Thêm thất bại")
                    console.log(err)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button
                onClick={showModal}
                className="text-gray-50 bg-blue-400 hover:bg-blue-500 p-2 rounded"
            >
                Thêm kích cỡ
            </button>
            <Modal
                width={1000}
                title="Thêm nhãn hiệu"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div>
                    <div className="flex flex-wrap mb-5">
                        <p className="mb-2">Kích cỡ</p>
                        <Input onChange={getNameSize}></Input>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default NewSize;