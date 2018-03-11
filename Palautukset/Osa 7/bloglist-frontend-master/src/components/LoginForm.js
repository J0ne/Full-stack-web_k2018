import React from 'react'
import { Button, Form } from 'semantic-ui-react'
const LoginForm = ({onSubmit, usernameValue, passwordValue, handleLoginFieldChange }) => {
    return (
        <div>
            <h2>Kirjaudu</h2>
        
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    käyttäjätunnus
            <input type="text"
                    name="username"
                    // autoComplete="off"
                    value={usernameValue}
                    onChange={handleLoginFieldChange} />
                </Form.Field>
                 <Form.Field>
                    salasana
            <input type="password" name="password"
                        // autoComplete="off"
                        value={passwordValue}
                        onChange={handleLoginFieldChange}
                    />
                </Form.Field>
                <Button type="submit">kirjaudu</Button>
            </Form>
        </div>
    )
}


export default LoginForm