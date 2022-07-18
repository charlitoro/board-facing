import React, {useState, useEffect} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import {login} from "../../packages/api";
import {useLocalStorage} from "../../storage";

function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [token, setToken] = useLocalStorage("token", "")

  useEffect(() => {
    if ( token )
      window.location.href = 'http://localhost:3000/admin'
  }, [token])

  const handleLogin = async () => {
    const data = await login(email, password)
    setToken(data.token)
    window.location.href = 'http://localhost:3000/admin'
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={email}
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={(event) => setEmail(event.target.value) }
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={password}
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(event) => setPassword(event.target.value) }
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    onClick={handleLogin}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

Login.layout = Auth;

export default Login;
