import React, { useEffect } from 'react';
import { GiCancel } from 'react-icons/gi';
import { useStateContext } from '../context/StateContext';

const Cancel = () => {
    const { setShowCart } = useStateContext();

    // useEffect(() => {
    //     setShowCart(false);
    // }, []);

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <GiCancel />
            </p>
            <h2>Your Order was canceled! Try again later.</h2>
            <p className='email-msg'>Your items are still safe in your cart</p>
            <p className='description'>
                If you have any questions please email
                <a className='email' href='mailto:order@mail.com'>
                    order@mail.com
                </a>
            </p>
            
            <button type='button' width='300px' className='btn' onClick={() => setShowCart(true)}>
                    OpenCart
            </button>
        </div>
    </div>
  )
}

export default Cancel