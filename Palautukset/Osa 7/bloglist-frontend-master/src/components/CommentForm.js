import React from 'react'
const CommentForm = ({ onSubmit, commentValue, handleCommentFieldChange }) => {
    return (
        <div>

            <form onSubmit={onSubmit}>
                <div>
                    <input type="text"
                        name="comment"
                        // autoComplete="off"
                        value={commentValue}
                        onChange={handleCommentFieldChange} />
                    <button type="submit">send comment</button>
                </div>
            </form>
        </div>
    )
}


export default CommentForm