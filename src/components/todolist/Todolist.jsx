import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Table, Button, ButtonGroup, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

function Todolist({ todolist, fetchUserTodos }) {
  const [show, setShow] = useState(false);
  const [todoid, setTodoid] = useState(null); // Initialize with null

  const [editedTitle, setEditedTitle] = useState("");
  const [mode, setMode] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTodoid(null); // Reset todoid
    setEditedTitle(""); // Reset editedTitle
  };

  const handleEdit = (todo) => {
    setMode("edit");
    setTodoid(todo.todoid);
    setEditedTitle(todo.title);
    setShow(true);
  };

  const handlecreate = () => {
    setMode("create");
    setShow(true);
    setTodoid(null); // Reset todoid
    setEditedTitle(""); // Reset editedTitle
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        "http://localhost:8000/api/updateutd",
        {
          id: todoid,
          title: editedTitle,
        },
        {
          withCredentials: true,
        }
      );
      handleClose(); // Close the modal after saving changes
      Swal.fire({
        title: "Success",
        text: "Todo edited successfully",
        icon: "success",
        showCloseButton: true,
        timer: 2000,
      });

      // Fetch updated todos after saving changes
      fetchUserTodos();
    } catch (error) {
      console.error("Edit error:", error);
      Swal.fire({
        title: "Error",
        text: "Edit failed",
        icon: "error",
        showCloseButton: true,
        timer: 2000,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteutd/${id}`, {
        withCredentials: true,
      });

      Swal.fire({
        title: "Success",
        text: "Todo deleted successfully",
        icon: "success",
        showCloseButton: true,
        timer: 2000,
      });
      fetchUserTodos();
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        title: "Error",
        text: "Delete failed",
        icon: "error",
        showCloseButton: true,
        timer: 2000,
      });
    }
  };

  const handdleCreatesave = async () => {
    try {
      if (editedTitle == null) {
        await axios.post(
          "http://localhost:8000/api/createutd",
          {
            title: editedTitle,
          },
          {
            withCredentials: true,
          }
        );
        handleClose(); // Close the modal after saving changes
        Swal.fire({
          title: "Success",
          text: "Todo created successfully",
          icon: "success",
          showCloseButton: true,
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "please fill your title",
          icon: "error",
          showCloseButton: true,
          timer: 2000,
        });
      }
      fetchUserTodos();
    } catch (error) {
      console.error("Create error:", error);
      Swal.fire({
        title: "Error",
        text: "Create failed",
        icon: "error",
        showCloseButton: true,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <div className="d-flex">
        <h2 className="container text-center pe-5">
          User Todo{" "}
          <Button
            className="my-1 gap-2 fs-4"
            variant="primary"
            onClick={handlecreate}
          >
            Create todo
          </Button>
        </h2>
      </div>

      <div className="container-fluid d-sm-flex text-center p-sm-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Todoname</th>
              <th width="300px">Action</th>
            </tr>
          </thead>
          <tbody>
            {todolist.map((todo) => (
              <tr key={todo.todoid}>
                <td>{todo.todoid}</td>
                <td>{todo.title}</td>
                <td>
                  <ButtonGroup className="d-sm-flex gap-2">
                    <Button
                      variant="warning"
                      type="button"
                      className="rounded"
                      onClick={() => handleEdit(todo)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      type="button"
                      className="rounded"
                      onClick={() => handleDelete(todo.todoid)} // Add handleDelete function
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            {mode === "edit" ? (
              <Modal.Title>Edit Todo</Modal.Title>
            ) : (
              <Modal.Title>Crate Todo</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              className="form-control"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {mode === "edit" ? (
              <Button variant="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            ) : (
              <Button variant="primary" onClick={handdleCreatesave}>
                Create
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

Todolist.propTypes = {
  fetchUserTodos: PropTypes.func.isRequired,
  todolist: PropTypes.arrayOf(
    PropTypes.shape({
      todoid: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Todolist;
