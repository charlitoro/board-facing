import React, {useState, useEffect} from "react";
import {Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import {getBoards} from "../packages/api";
import Link from 'next/link'

export default function Index() {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    getBoards().then(data => setBoards(data))
  }, [])

  return (<>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8" >
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {boards && boards.map((board, index) =>
                  <Col lg="6" xl="4" key={index}>
                    <Link href={`/board/${board._id}`} key={board._id}>
                      <Card className="card-stats board-card mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                              >
                                Name
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                  {board.name}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="fas fa-chart-bar" />
                              </div>
                            </Col>
                          </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">
                              <span className="text-success mr-2">
                                {board.description}
                                </span>
                            </p>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
              )}
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}
