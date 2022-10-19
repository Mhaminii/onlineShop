import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";

import {saveShippingInfo} from '../../actions/cartAction'
import CheckoutSteps from './CheckoutSteps';

import MetaData from '../Layout/MetaData'


function Shipping() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {shippingInfo} = useSelector(state => state.cart)
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)

    const submitHandler = (e) =>{
        e.preventDefault()

        dispatch(saveShippingInfo({address, city, postalCode, phoneNo, country}))
        navigate('/order/confrim')
    }

  return (
    <Fragment>
        <MetaData title={'اطلاعات مرسوله'}/>
        <CheckoutSteps shipping/>
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h5 className="mb-4 text-center">:اطلاعات گیرنده</h5>
                    <div className="form-group">
                        <label htmlFor="address_field">:آدرس</label>
                        <input
                            type="text"
                            id="address_field"
                            className="form-control"
                            value={address}
                            onChange={(e)=> setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city_field">:شهر</label>
                        <input
                            type="text"
                            id="city_field"
                            className="form-control"
                            value={city}
                            onChange={(e)=> setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone_field">:شماره موبایل</label>
                        <input
                            type="phone"
                            id="phone_field"
                            className="form-control"
                            value={phoneNo}
                            onChange={(e)=> setPhoneNo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="postal_code_field">:کدپستی</label>
                        <input
                            type="number"
                            id="postal_code_field"
                            className="form-control"
                            value={postalCode}
                            onChange={(e)=> setPostalCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country_field">:کشور</label>
                        <select
                            id="country_field"
                            className="form-control"
                            value={country}
                            onChange={(e)=> setCountry(e.target.value)}
                            required
                        >
                                <option>
                                    ایران
                                </option>

                        </select>
                    </div>

                    <button
                        id="shipping_btn"
                        type="submit"
                        className="btn btn-block py-3"
                    >
                        ادامه
                        </button>
                </form>
            </div>
        </div>

    </Fragment>
  )
}

export default Shipping