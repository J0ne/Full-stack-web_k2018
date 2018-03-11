import React from 'react'
import { Button, Form } from 'semantic-ui-react'
const CommentForm = ({ onSubmit, commentValue, handleCommentFieldChange }) => {
    return (
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <input type="text"
                        name="comment"
                        // autoComplete="off"
                        value={commentValue}
                        onChange={handleCommentFieldChange} />
                    <Button type="submit">send comment</Button>
                </Form.Field>
            </Form>
    )
}


export default CommentForm