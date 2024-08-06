import './userLogin.css'
import React from 'react';
import {Link} from 'react-router-dom'

function userLogin() {
  return (
    <div className='userLoginContainer'>
    	<div className="screen-login">
		<div className="screen__content">
			<div className='title'>
				<h4>MERN-CRUD_APP</h4>
				<h4>Login</h4>
				</div>
			<form className="login">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="User name / Email" />
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password" />
				</div>
				<button className="button login__submit">
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>

            <div className='signup-tag'>
                <p>Don't have an accout</p>
                <Link>Sign UP</Link>
            </div>
            
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
    </div>
  )
}

export default userLogin