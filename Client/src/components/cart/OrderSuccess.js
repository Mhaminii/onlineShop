import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import MetaData from '../Layout/MetaData'


function OrderSuccess() {
  return (
    <Fragment>
        <MetaData title={'خرید موفقیت آمیز'}/>
        <div className="container container-fluid">
            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="https://freepngimg.com/thumb/success/6-2-success-png-image.png" alt="Order Success" width="200" height="200" />

                    <h2>سفارش شما با موفقیت ثبت شد</h2>

                    <Link to="/order/me">مشاهده سفارش</Link>
                </div>

            </div>
        </div>
    </Fragment>
  )
}

export default OrderSuccess