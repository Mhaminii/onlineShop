import React from 'react'
import {Link} from 'react-router-dom'
import { FaTachometerAlt, FaUsers, FaProductHunt, FaRegComment , FaShoppingBasket } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper" >
        <nav id="sidebar" style={{borderRadius:'10px'}}>
            <ul className="list-unstyled components">
                <li>
                    <Link to={'/dashboard'}>داشبورد{" "}<FaTachometerAlt/></Link>
                </li>
        
                <li>
                    <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false">
                        محصولات
                        {" "}<FaProductHunt/>
                    </a>
                    <ul className="collapse list-unstyled" id="productSubmenu">
                        <li>
                            <Link to={'/admin/products'}>
                                
                            همه
                            {" "}<i className="fa fa-clipboard"></i>
                            </Link>
                        </li>
        
                        <li>
                            <Link to={'/admin/product'}>
                                
                                ایجاد
                                {" "}<i className="fa fa-plus"></i>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <Link to={'/admin/orders'}>
                    سفارشات
                    {" "}<FaShoppingBasket/>
                    </Link>
                </li>

                <li>
                    <Link to={'/admin/users'}>
                        
                        کاربران
                        {" "}<FaUsers/>
                    </Link>
                </li>

                <li>
                    <Link to={'/admin/reviews'}>
                        
                        نظرات
                        {"  "}<FaRegComment/>
                    </Link>
                </li>
        
            </ul>
        </nav>
    </div>
  )
}

export default Sidebar