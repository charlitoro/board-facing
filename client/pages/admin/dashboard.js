import React, {useEffect, useState} from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";
import Link from 'next/link'

import Header from "components/Headers/Header.js";
import {createBoard, deleteResource, getBoards, getResources, uploadResource} from "../../packages/api";
import CreateResourceModal from "../../components/Modals/CreateResource";
import ResourcePreviewModal from "../../components/Modals/ResourcePreview";
import CreateBoardModal from "../../components/Modals/CreateBoard";
import {useLocalStorage} from "../../storage";


const Dashboard = (props) => {
  const [resources, setResources] = useState(null)
  const [boards, setBoards] = useState([])
  const [boardSelected, setBoardSelected] = useState(null)
  const [showCreateResource, setShowCreateResource] = useState(false)
  const [showResource, setShowResource] = useState(false)
  const [resourceSelected, setResourceSelected] = useState(null)
  const [token] = useLocalStorage("token", "")

  useEffect(() => {
    if(!token)
      window.location.href = process.env.HOST ? `${process.env.HOST}:3000/auth/login` : 'http://localhost:3000/auth/login'
  }, [token])

  useEffect(() => {
      handleRefreshBoards()
  }, [])

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  function handleSelectBoard (board){
    getResources(board._id).then(data => setResources(data))
    setBoardSelected(board)
  }

  async function handleOnSubmit( data ) {
    uploadResource( {...data, boardId: boardSelected._id } )
        .then(data => setResources([...resources, data]))
    setShowCreateResource(false)
  }

  function handleDelete( id ){
    deleteResource(id).then()
  }

  function handleShowResource( resource ){
    setShowResource(true)
    setResourceSelected(resource)
  }

  function handleRefreshBoards(){
      getBoards().then(data => setBoards(data))
  }


  return (
    <>
      <CreateResourceModal
          isOpen={showCreateResource}
          onClose={() => setShowCreateResource(false)}
          onSubmit={handleOnSubmit}
      />
      <ResourcePreviewModal
          isOpen={showResource}
          onClose={() => setShowResource(false)}
          src={resourceSelected ? resourceSelected.path : ""}
      />
      <Header
          boards={boards}
          onSelectBoard={handleSelectBoard}
          refreshBoards={handleRefreshBoards}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          {boardSelected && <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">{boardSelected.name}</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => setShowCreateResource(true)}
                        size="sm"
                    >
                      Add new
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">View</th>
                  <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {resources && resources.map( (resource) => <>
                  <tr>
                    <th scope="row">{resource.name}</th>
                    <td>{resource.description}</td>
                    <td>
                      <Button
                          color="primary"
                          href="#pablo"
                          onClick={() => handleShowResource(resource)}
                          size="sm"
                      >
                        Preview
                      </Button>
                    </td>
                    <td>
                      <Button
                          color="danger"
                          href="#pablo"
                          onClick={() => handleDelete(resource._id)}
                          size="sm"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </> )}
                </tbody>
              </Table>
            </Card>
          </Col>}
        </Row>
      </Container>
    </>
  );
};

Dashboard.layout = Admin;

export default Dashboard;
