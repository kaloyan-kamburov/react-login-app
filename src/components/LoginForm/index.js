import React from "react"

const LoginForm = props => {
    return(
        <form onSubmit={props.onSubmit}>
            <input 
                name="email" 
                type="email" 
                value={props.email} 
                onChange={props.onChange}
            />
            <input 
                name="password" 
                type="password" 
                value={props.password} onChange={props.onChange}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default LoginForm
