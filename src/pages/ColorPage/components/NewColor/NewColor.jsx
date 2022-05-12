import React from 'react';
import { Input, Modal} from 'antd';
import axios from "axios";

NewColor.propTypes = {

};

function NewColor(props) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [nameColor, setNameColor] = React.useState();
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        pushData('/colors');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const getNameColor = (e) => {
        let str = e.target.value.toLowerCase()
       setNameColor((nameColor)=>({
            ...nameColor,
            name : e.target.value,
            slug : str.replace(/\s+/g,'-')
       })
       );
    }
    const pushData = async (path) => {
        let options = {
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}${path}`,
            data : nameColor
        }
        try {
            const responsePost = await axios(options).then((res)=>{
                if(res.data){
                    alert("Thêm màu thành công");
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
                className="text-gray-50 hover:bg-blue-500 p-2 rounded"
                style={{backgroundColor: "#1890FF"}}>
                Thêm màu sắc
            </button>
            <Modal
                width={1000}
                title="Thêm màu sắc"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div className="flex flex-wrap mb-5">
                    <div className=' w-full'>
                        <p className="mb-2" >Màu sắc</p>
                        <Input onChange={getNameColor}></Input>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default NewColor;