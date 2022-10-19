import React , {Fragment} from 'react'
import {Link, Route,Routes} from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

import {logout} from '../../actions/userActions'

import Search from './Search'
import cartImg from "../../Assets/images/icons8-cart-64.png";



const Header = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const {user , loading} = useSelector(state => state.auth)
    const {cartItems} = useSelector(state => state.cart)

    const logoutHandler = () =>{
        dispatch(logout())
        alert.success('.از حساب کاربری با موفقیت خارج شدید')
    }

  return (
    <Fragment>
        <header className="header_section mb-10">
            <div className="container container-fluid">
                <nav className="navbar navbar-expand-lg custom_nav-container">
                    <div className="quote_btn-container">
                        <p>
                            {user ? (
                                <Fragment>
                                    <div className='mr-4 dropdown d-inline'>
                                        {/* <Link to="#!"> */}
                                            {/* <figure className="avatar avatar-nav">
                                                    <div>
                                                    <img 
                                                        src={user.avatar && user.avatar.url} 
                                                        alt={user && user.name}
                                                        className = 'rounded-circle'
                                                    />
                                                    </div>
                                            </figure> */}
                                            
                                             
                                            <span className="profiledropdown dropdown-toggle mr-3" id="dropdownMenuReference" data-toggle="dropdown" aria-expanded="false">
                                                {user && user.name}
                                            </span>
                                            
                                            <div className="dropdown-menu text-right nav-dropdown dropdown-content">
                                                {user && user.role === 'admin' && (
                                                    <Link className="dropdown-item" to='/dashboard'>داشبورد</Link>
                                                )}
                                                
                                                {/* <Link className="dropdown-item" to='/me'>داشبورد</Link> */}
                                                <Link className="dropdown-item" to='/orders/me'>سفارشات</Link>
                                                <Link className="dropdown-item" to='/me'>پروفایل</Link>
                                                <div className="dropdown-divider"></div>
                                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>خروج از حساب</Link>
                                            </div>
                                        {/* </Link> */}
                                    </div>
                                </Fragment>
                            ) : !loading && 
                                <Fragment>
                                    <div className='loginregisterbtn d-inline'>
                                    <Link to="/login">  ورود  </Link>
                                    |
                                    <Link to="/register">  ثبت نام  </Link>
                                    </div>
                                    
                                </Fragment>
                            }
                            <Link className='loginregisterbtn mr-4' to="/cart">
                                {/* <span>
                                    <img src={cartImg} alt="cart" />
                                </span> */}
                                 <span className=''>سبدخرید</span>
                                <span className='mr-1' id='cart_count'>{cartItems.length}</span>
                               
                            </Link>
                        </p>
                        
                        {/* <!-- <form className="form-inline">
                        <button
                            className="btn my-2 my-sm-0 nav_search-btn"
                            type="submit"
                        ></button>
                        </form> --> */}  
                    </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div
                    className="d-flex mx-auto flex-column flex-lg-row align-items-center"
                    >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link" href="about.html"> ارتباط با ما</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="gallery.html"> درباره ما </a>
                        </li>
                        <li className="nav-item">
                        <Link to={'/products'} className="nav-link" href="contact.html">محصولات</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={"/"} className="nav-link" href="index.html"
                            >صفحه اصلی <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    </div>
                </div>
                <Link to={"/"} className="navbar-brand" href="index.html">
                    <span> Fior </span>
                </Link>
                </nav>
            </div>
        </header>
        <Search />
    </Fragment>
  )
}

export default Header