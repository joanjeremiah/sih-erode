import Axios from 'axios';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import validateForm from '../../utils/validateform'
import validEmailRegex from '../../utils/emailRegex'
import './Auth.css'
import { AuthContext } from '../../context/auth-context'
import Spinner from '../../Containers/Spinner/Spinner';
import { toast, ToastContainer} from 'react-toastify'

export class Auth extends Component {
    static contextType = AuthContext
    constructor(props) {
        super(props)

        this.state = {
            user: {
                email: '',
                password: '',
                name: '',
                // organization: ''
            },
            isloading: false,
            isLoginMode: true,

            errors: {
                name: '',
                // organization: '',
                email: '',
                password: ''
            }
        }
    }


    mySubmitHandler = (event) => {
        this.setState(pre => ({
            isloading: true
        }))
        const auth = this.context
        event.preventDefault();

        if (validateForm(this.state.errors)) {
        } else {
        }
        if (this.state.isLoginMode) {
            Axios.post('/user/login', this.state.user)
                .then(response => {
                    
                    
                    this.setState(pre => ({
                        isloading: false
                    }))
                    // console.log(1)
                    this.props.history.push('/')
                    auth.login(response.data.userId, response.data.token);
                })
                .catch(e => {
                    console.log(e)
                    toast(e.response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });  
                    
                    this.setState({
                        isloading: false,
                    })
                })

        }
        else {
            this.setState(pre => ({
                isloading: true
            }))
            Axios.post('/user/signup', this.state.user).then(response => {
                console.log(response);
                toast(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.setState(pre => ({
                    isloading: false,
                    isLoginMode: true
                }))
            }).catch(e => {
                    console.log(e);
                    toast(e.response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.setState({
                        isloading: false,
                    });
                    
                })
        }
        this.setState({
            user: { ...this.state.user, email: '', password: '' }
        });
    }


    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        let errors = this.state.errors;
        const { name, value } = event.target;
        switch (name) {

            case 'name':
                if (value.length === 0) {
                    errors.name =
                        value.length < 5
                            ? 'Name is Required!'
                            : '';
                    break;
                }
                break;

            case 'email':
                if (value.length === 0) {
                    errors.email =
                        value.length < 5
                            ? 'Email is Required!'
                            : '';
                    break;
                }
                if (value.length > 0) {
                    errors.email =
                        validEmailRegex.test(value)
                            ? ''
                            : 'Email is not valid!';
                    break;
                }
                break;
            case 'password':
                if (value.length > 0) {
                    errors.password =
                        value.length < 6
                            ? 'Password must be 6 characters long!'
                            : '';
                }

                if (value.length === 0) {
                    errors.password =
                        value.length === 0
                            ? 'Password is required!'
                            : '';
                }
                break;
            default:
                break;
        }

        this.setState({ errors, user: { ...this.state.user, [nam]: val } }, () => {
        });
    }

    switchLoginhandler = () => {
        this.setState(pre => ({
            isLoginMode: !pre.isLoginMode
        }))
    }

    render() {
        let isLoading
        let iserror

        if (this.state.isloading) {
            isLoading = (
                <>
                    <div className="container loading">
                        <div className="mar-20">
                            <Spinner />
                        </div>
                    </div>
                </>
            )
        }

        return (<>

            {isLoading}
            {iserror}

            <div className="container container-short py-5">
                <h1 className="pt-2 py-2">{this.state.isLoginMode ? 'Login ' : 'Sign Up'}</h1>
                <hr></hr>
                <form onSubmit={this.mySubmitHandler} className="pt-4">
                    {!this.state.isLoginMode && <div className="form-group">
                        <label htmlFor="name">User Name </label>
                        <input
                            type='text'
                            name='name'
                            value={this.state.user.name}
                            className={"form-control " + (this.state.errors.name ? 'is-invalid' : '')}
                            placeholder="Enter your user name"
                            required
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.name.length > 0 &&
                            <div className="mt-1"><span className='error text-danger'>{this.state.errors.name}</span></div>}
                    </div>}
                    <div className="form-group">
                        <label htmlFor="email">Email </label>
                        <input
                            type='email'
                            name='email'
                            value={this.state.user.email}
                            className={"form-control " + (this.state.errors.email ? 'is-invalid' : '')}
                            placeholder="Enter your email"
                            required
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.email.length > 0 &&
                            <div className="mt-1"><span className='error text-danger'>{this.state.errors.email}</span></div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password </label>
                        <input
                            type='password'
                            name='password'
                            value={this.state.user.password}
                            className={"form-control " + (this.state.errors.password ? 'is-invalid' : '')}
                            placeholder="Enter your Password"
                            required="required"
                            data-error="Please enter your user name."
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.password.length > 0 &&
                            <div className="mt-1"> <span className='error text-danger'>{this.state.errors.password}</span></div>}

                    </div>

                    <div className="form-group">
                        <button style={{ marginRight: '15px' }}
                            type='submit'
                            className="btn btn-primary"
                            disabled={this.state.user.email && this.state.user.password
                                && (validateForm(this.state.errors)) ? '' : 'disabled'}
                        >
                            {this.state.isLoginMode ? 'Login' : 'Sign Up'}
                        </button>

                        <button
                            type='button'
                            className="btn btn-primary"
                            onClick={this.switchLoginhandler}
                        >Switch to {this.state.isLoginMode ? 'Sign Up' : 'Login'} </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
        )
    }
}

export default withRouter(Auth)