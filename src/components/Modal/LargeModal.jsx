import Modal from 'react-bootstrap/Modal'
import React from 'react'

const LargeModal = ({ showFormModal, hideFormModal, title, children }) => {
    return (
        <Modal
            show={showFormModal}
            onHide={hideFormModal}
            size="xl"
            // dialogClassName="modal-90w"
            aria-labelledby="large-form-modal"
            scrollable
            backdrop="static"
            centered
            keyboard={false}
        // fullscreen 
        >
            <Modal.Header closeButton>
                <Modal.Title id="large-form-modal">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>

    )
}
export default LargeModal
