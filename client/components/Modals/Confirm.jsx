import React from "react";

// reactstrap components
import {
    ModalBody,
    Modal, ModalFooter, Button
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";

function ConfirmModal({ isOpen, onClose, onSubmit }) {

    return (
        <>
            <Modal toggle={onClose} isOpen={isOpen}>
                <div className=" modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        type="button"
                        onClick={onClose}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <ModalBody>
                    <h2>¿Are you sure to delete the board?</h2>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        aria-label="Delete"
                        onClick={onSubmit}
                    >
                        Delete
                    </Button>
                    <Button
                        color="primary"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

ConfirmModal.layout = Admin;

export default ConfirmModal;
