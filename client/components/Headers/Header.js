import React, {useState} from "react";

// reactstrap components
import {Card, CardBody, CardTitle, Container, Row, Col, Button} from "reactstrap";
import {createBoard, deleteBoard} from "../../packages/api";
import CreateBoardModal from "../Modals/CreateBoard";
import ConfirmModal from "../Modals/Confirm";


function Header({ boards, onSelectBoard, refreshBoards }) {
  const [showCreateBoard, setShowCreateBoard] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [boardToDelete, setBoardToDelete] = useState(null)

  function handleOnSubmitCreateBoard( data ){
    createBoard(data).then(() => refreshBoards())
    setShowCreateBoard(false)
  }

  function handleOnDeleteBoard(){
    deleteBoard(boardToDelete._id).then(() => refreshBoards())
    setShowConfirm(false)
  }

  return (
    <>
      <CreateBoardModal
          isOpen={showCreateBoard}
          onClose={() => setShowCreateBoard(false)}
          onSubmit={handleOnSubmitCreateBoard}
      />
      <ConfirmModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onSubmit={handleOnDeleteBoard}
      />
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8" >
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {boards && boards.map((board, index) =>
              <Col lg="6" xl="4" key={index}>
                <Card className="card-stats board-card mb-4 mb-xl-0" onClick={() => onSelectBoard(board)}>
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
                          <i className="fas fa-trash" onClick={() => {
                            setBoardToDelete(board)
                            setShowConfirm(true)
                          }}/>
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
              </Col>
              )}
            </Row>
            <Row>
              <Col>
                <Button
                    color="primary"
                    onClick={() => setShowCreateBoard(true)}
                    size="sm"
                >
                  Add new board
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;
