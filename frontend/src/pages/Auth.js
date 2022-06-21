import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/auth-context'

export default class Auth extends Component
{
    state = {
        isLogin: true

    }

    static contextType = AuthContext
    constructor(props)
    {
        super(props)
        this.Email = React.createRef()
        this.Password = React.createRef()
    }
    submitHandler = (e) =>
    { 
        e.preventDefault()
        const email = this.Email.current.value
        const password = this.Password.current.value
        if(email.trim().length === 0 || password.trim().length === 0)
        {
            alert('Please fill in all fields')
            return
        }
        // console.log(email, password)

        let requestBody = {
            query: `
            query {
                login(email: "${email}", password: "${password}") {
                    userId
                    token
                    tokenExpiration
                }
            }
            `
        }
        if (!this.state.isLogin)
        {
            
        requestBody = {
            query: `
            mutation {
                createUser(userInput: {email: "${email}", password: "${password}"}) {
                    _id
                    email
                }
            }
            `
        }
        }

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody), 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }

        }).then(
            (response) =>
            { 
                if(response.status !== 200 && response.status !== 201)
                {
                    throw new Error('Failed')
                }
                return response.json()
            }
        ).then(
            (data) =>
            {
                if (data.data.login.token)
                {
                    const { token, userId, tokenExpiration } = data.data.login
                    this.context.login(token, userId, tokenExpiration)
                    
                    }
            })
        .catch(err =>
        { 
            console.log(err)
        })
    }
    switchModeHandler = () =>
    {
        this.setState(
            prevState =>
            {
                return { isLogin: !this.state.isLogin }
            }
            )
    }
  render() {
    return (
        <form className='auth-form' onSubmit={this.submitHandler}>
            <div className='form-control'>
                <label htmlFor='email'>E-Mail</label>
                <input type="email" id="email" ref={this.Email} />
            </div>
            <div className='form-control'>
                <label htmlFor='email'>Password</label>
                <input type="password" id="password" ref={this.Password}/>
            </div>
            <div className='form-actions'>
                <button type='submit'>
                    <Link to="/events">
                    Submit
                    </Link>

                    
            </button>
                <button type='button' onClick={this.switchModeHandler}>
                    Switch to {this.state.isLogin ?"Signup" : "Login"}
            </button>
            </div>
            <style jsx="true">{`
                .auth-form{
                    width: 40rem;
                    max-width: 80%;
                    margin: 5rem auto;
                }
                .form-control label, 
                .form-control input{
                    width: 100%;
                    display: block;
                }
                .form-control{
                    margin-bottom: 1rem;
                }
                .form-control label{
                    margin-bottom: .5rem;
                }
                .form-actions{
                    display:flex
                    width: 100%;
                }
                .form-actions button{
                    background: #01d1d1;
                    font: inherit;
                    border-radius: .25rem;
                    padding: .5rem 1rem;
                    color: #000;
                    margin-right: 1rem;
                    border: none;
                    cursor: pointer;
                }
                .form-actions button:hover{
                    background: #00b0b0;
                }

            ` }</style>
      </form>
    )
  }
}
