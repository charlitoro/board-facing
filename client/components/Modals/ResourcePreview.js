import React from "react";

// reactstrap components
import {
    ModalBody,
    Modal
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";

function ResourcePreviewModal({ isOpen, onClose, src }) {

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
                    <img className="d-block w-100" src={src} alter="" />
                </ModalBody>
            </Modal>
        </>
    );
}

ResourcePreviewModal.layout = Admin;

export default ResourcePreviewModal;
