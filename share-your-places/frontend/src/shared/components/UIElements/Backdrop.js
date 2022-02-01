import React from 'react'
import reactDom from 'react-dom'

import './Backdrop.css'

function Backdrop(props) {
    const content = <div className="backdrop" onClick={props.onClick}></div>
    return (
        reactDom.createPortal(content, document.getElementById('backdrop-hook'))
    )
}

export default Backdrop
