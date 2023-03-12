import React from "react"
import './Modal.css';

const modal = props => (
    <div className="modal">
        <header className="modal_header">
            <h1>{props.title}</h1>
        </header>
        <section className="modal_Content">{props.children}</section>
        <section className="modal_Action">
            {props.canCancel && <button className="btn" onClick={props.onCancel}>Cencel</button>}
            {props.canConfirm && <button className="btn" onClick={props.onComfirm}>{props.confirmText}</button>}
        </section>
    </div>
);

export default modal;