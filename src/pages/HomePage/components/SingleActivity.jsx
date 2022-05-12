import React from "react";
import { Progress } from 'antd';

 export function SingleActivity ({icon, title, detail}) {
     return (
        <div className='w-full h-auto mb-6 text-center p-5 rounded-lg' style={{backgroundColor: '#FFFFFF'}}>
            {icon}
            <p className='text-xl font-medium mt-3 mb-0'>{title}</p>
            <p className='text-2xl mt-2 text-gray-500'>{detail}</p>
        </div>
     );
 }