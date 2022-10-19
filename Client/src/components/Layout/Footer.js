import React , {Fragment} from 'react'
import imginstagram from '../../Assets/images/icons8-instagram-48.png'
import imglinkdin from '../../Assets/images/icons8-linkedin-48.png'
import imgtwitter from '../../Assets/images/icons8-twitter-squared-48.png'
import imgGmail from '../../Assets/images/icons8-gmail-logo-64.png'
import imgwhatsapp from '../../Assets/images/icons8-whatsapp-48.png'
import imgphone from '../../Assets/images/icons8-phone-48.png'

function Footer() {
  return (
    <Fragment>
        <footer>
            <section className="info_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <div className="info_logo">
                            <h5>فیور</h5>
                            <p>
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            </p>
                        </div>
                        </div>
                        <div className="col-md-3">
                        <div className="info_links pl-lg-5">
                            <h5>لینک ها اصلی</h5>
                            <ul>
                            <li className="active">
                                <a href="index.html"> صفحه اصلی </a>
                            </li>
                            <li>
                                <a href="about.html"> محصولات </a>
                            </li>
                            <li>
                                <a href="gallery.html"> درباره ما </a>
                            </li>
                            <li>
                                <a href="contact.html"> ارتباط با ما </a>
                            </li>
                            </ul>
                        </div>
                        </div>
                        <div className="col-md-3">
                        <div className="info_contact">
                            <h5>شبکه های اجتماعی</h5>
                            <div>
                                <a href="#"><img src={imginstagram} /></a>
                            </div>
                            <div>
                                <a href="#"><img src={imglinkdin} /></a>
                            </div>
                            <div>
                                <a href="#"><img src={imgtwitter} /></a>
                            </div>
                            <div>
                                <a href="#"><img src={imgwhatsapp} /></a>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-3">
                        <div className="info_contact">
                            <h5>راه های ارتباطی</h5>
                            <div>
                            <p>پاسخگویی 24 ساعته</p>
                            </div>
                            <div>
                            <p><img src={imgphone} /> 021 1234567890</p>
                            </div>
                            <div>
                            <p><img src={imgGmail} />  demo@gmail.com</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container-fluid footer_section">
                <p>
                &copy; <span id="displayYear"></span> All Rights Reserved By
                Mo.ha.Amini 2022
                </p>
            </div>
        </footer>
    </Fragment>
  )
}

export default Footer