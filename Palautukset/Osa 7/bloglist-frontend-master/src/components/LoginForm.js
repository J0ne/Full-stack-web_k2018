import React from 'react'
const LoginForm = ({onSubmit, usernameValue, passwordValue, handleLoginFieldChange }) => {
    return (
        <div>
            <h2>Kirjaudu</h2>

            <form onSubmit={onSubmit}>
                <div>
                    käyttäjätunnus
            <input type="text"
                    name="username"
                    // autoComplete="off"
                    value={usernameValue}
                    onChange={handleLoginFieldChange} />
                </div>
                <div>
                    salasana
            <input type="password" name="password"
                        // autoComplete="off"
                        value={passwordValue}
                        onChange={handleLoginFieldChange}
                    />
                </div>
                <button type="submit">kirjaudu</button>
            </form>
        </div>
    )
}


export default LoginForm