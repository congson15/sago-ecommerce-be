import React from 'react';
import { Input, Modal } from 'antd';
import axiosClient from '../../../../api/axiosClient';
import axios from "axios";
import Brand from '../../Brand';
NewBrand.propTypes = {

};

function NewBrand(props) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [nameBrand, setNameBrand] = React.useState();
    
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        pushData('/brands');
        
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);

    };

    const handleCancel = () => {
        setVisible(false);
    };
    const getNameBrand = (e) => {
        let str = e.target.value.toLowerCase()
       setNameBrand((nameBrand)=>({
            ...nameBrand,
            name : e.target.value,
            slug : str.replace(/\s+/g,'-')
       })
       );
    }
    const pushData = async (path) => {
        let options = {
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}${path}`,
            data : nameBrand
        }
        try {
            const responsePost = await axios(options).then((res)=>{
                if(res.data){
                    alert("Thêm nhãn hiệu thành công");
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
                Thêm nhãn hiệu
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
                        <p className="mb-2">Tên nhãn hiệu</p>
                        <Input type={'text'} onChange={getNameBrand}></Input>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default NewBrand;