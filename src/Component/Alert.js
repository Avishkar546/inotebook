import React from 'react'

const Alert = (props) => {
    return (
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">{props.message}</h4>
        </div>
    )
}

export default Alert
