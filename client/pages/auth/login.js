import React, {useState, useEffect} from "react";
import Link from "next/link";
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

  const handleLogin = async () => {
    const { data, message } = await login(email, password)
    if (data)
      setToken(data.token)
    else {
      window.alert(message)
    }
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
              <div className="text-center">
                <Link href={"/admin/dashboard"}>
                  <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={handleLogin}
                  >
                    Sign in
                  </Button>
                </Link>
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
