import React from 'react'
import {Link} from 'react-router-dom'

function CheckoutSteps({shipping, confirmOrder, payment}) {
  return (
    <div className='checkout-progress d-flex justify-content-center mt-5'>
       
        {payment ? <Link to='/payment' className='float-right'>
            <div className='triangle2-active'></div>
            <div className='step active-step'>پرداخت</div>
            <div className='triangle-active'></div>
        </Link> : <Link to='#!' disabled>
            <div className='triangle2-incomplete'></div>
            <div className='step incomplete'>پرداخت</div>
            <div className='triangle-incomplete'></div>
        </Link>} 

        {confirmOrder ? <Link to='/order/confirm' className='float-right'>
            <div className='triangle2-active'></div>
            <div className='step active-step'>تایید سفارش</div>
            <div className='triangle-active'></div>
        </Link> : <Link to='#!' disabled>
            <div className='triangle2-incomplete'></div>
            <div className='step incomplete'>تایید سفارش</div>
            <div className='triangle-incomplete'></div>
        </Link>}

        {shipping ? <Link to='/shipping' className='float-right'>
            <div className='triangle2-active'></div>
            <div className='step active-step'>اطلاعات گیرنده</div>
            <div className='triangle-active'></div>
        </Link> : <Link to='#!' disabled>
            <div className='triangle2-incomplete'></div>
            <div className='step incomplete'>اطلاعات گیرنده</div>
            <div className='triangle-incomplete'></div>
        </Link>} 

    </div>
  )
}

export default CheckoutSteps