import React from 'react'
import "./HomePage.css"
import NavBar from ".././components/NavBar/Navbar"
import Footer from './Fotter'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
           <NavBar/>
            {/* Start Landing Page */}
            <div className="landing-page">
                <div className="content">
                    <div className="container">
                        <div className="info">
                            <h1>Looking For Creating Tasks...</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit nihil ullam nesciunt quidem iste, Repellendus odit nihil</p>
                            <Link to="/login">
                                <button>Create a Task Now!</button>
                            </Link>
                        </div>
                        <div className="image">
                            <img src="https://media.tenor.com/0lweCAr96fkAAAAi/todo-lista.gif" alt='Home photo/image'/>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Landing Page */}
            <Footer />

        </>
  )
}

export default HomePage