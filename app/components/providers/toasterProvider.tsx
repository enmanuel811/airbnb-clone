'use client';

import {Toaster} from 'react-hot-toast';
/*we need to wrap this library import in a provider because if we call it directly we get an error in the layout component*/ 
const ToasterProvider = () =>{
    return (

        <Toaster/>
    )
}

export default ToasterProvider;