import React, {useState} from "react";

// reactstrap components
import {
    Button,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    ModalBody
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";

function CreateBoardModal({ isOpen, onClose, onSubmit }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    return (
        <>
            <Modal isOpen={isOpen} toggle={onClose}>
                <div className=" modal-header">
                    <h5 className=" modal-title" id="exampleModalLabel">
                        Create New Board
                    </h5>
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
                    <Form role="form">
                        <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-hat-3" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Name"
                                    type="text"
                                    onChange={ (e) => setName(e.target.value)}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Description"
                                    type="text"
                                    autoComplete="new-description"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="button" onClick={() => onSubmit({
                                name,
                                description
                            })}>
                                Create Board
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

CreateBoardModal.layout = Admin;

export default CreateBoardModal;
