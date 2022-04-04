import React, {useState} from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    Modal
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";

function CreateResourceModal({ isOpen, onClose, onSubmit }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)
    const [expireDate, setExpireDate] = useState(null)

    return (
        <>
            <Modal isOpen={isOpen} toggle={onClose}>
                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent pb-5">
                            Create New Resource
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form">
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-cloud-upload-96" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="file"
                                            type="file"
                                            autoComplete="new-file"
                                            onChange={ (e) => {
                                                console.log(e.target.files[0])
                                                setFile(e.target.files[0])
                                            }}
                                        />
                                    </InputGroup>
                                </FormGroup>
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
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-calendar-grid-58" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Password"
                                            type="date"
                                            autoComplete="new-password"
                                            onChange={(e) => setExpireDate(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                    <Button className="mt-4" color="primary" type="button" onClick={() => onSubmit({
                                        name,
                                        expireDate,
                                        description,
                                        file
                                    })}>
                                        Create resource
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Modal>
        </>
    );
}

CreateResourceModal.layout = Admin;

export default CreateResourceModal;
