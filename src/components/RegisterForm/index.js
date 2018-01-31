import React, { Component } from 'react';

// export default class Register extends React.Component {
//     render() {
//         return(
//             <div>REGISTsER</div>
//         )
//     }
// }

const RegisterForm = (props) => {
  
        return(
            <form onSubmit={props.onSubmit}>
            <h1>Register</h1>
                <input name="name" type="text" value={props.name} onChange={props.onChange} />
                <input name="email" type="text" value={props.email} onChange={props.onChange} />
                <button className="btn" type="submit">Submit</button>
            </form>
    
        )

    
}

export default RegisterForm;
