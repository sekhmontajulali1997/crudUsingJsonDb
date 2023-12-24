import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Row,
  Table,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import "./Home.css";
//import MModal from "../../Components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [modal, setModal] = useState(false);
   const [modalForEdit, setModalForEdit] = useState(false);
   const [viewModal, setViewModal] = useState(false)
  const [student, setStudents] = useState([]);

  const [input, setInput] = useState({
    Name: "",
    Age: "",
    Roll: "",
    Photo: "",
  });


  
  const handleInputChange = (e) => {
    setInput((pravState) => ({
      ...pravState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerModalShow = () => {
    setModal(true);
  };
  const handlerModalHide = () => {
    setModal(false);
  };

  const handlerShowStudents = async () => {
    const response = await axios.get("http://localhost:7541/students");
    setStudents(response.data);
  };

  const handlerStudentsDelete = async(id) =>{
    await axios.delete(`http://localhost:7541/students/${id}`);
    handlerShowStudents()
  }

  const handlerCreateStudents = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:7541/students", input);
    setInput({
      Name: "",
      Age: "",
      Roll: "",
      Photo: "",
    });
    handlerModalHide();
    handlerShowStudents();
  };

  useEffect(() => {
    handlerShowStudents();
  }, []);




    // edit students

    const handlerEditStudentshow = (id) =>{
     
        
     setInput(
        student.find((data) => data.id === id)
      );

     
      setModalForEdit(() => (true))
  
    }
    const handlerEditStudentHide = () =>{
  
      setModalForEdit(() => (false))
  
    }
  
    // update dataa
  
    const handlerUpdateStudents =  async(e) => {
       e.preventDefault();

       const response =  await axios.patch(`http://localhost:7541/students/${input.id}`, input);
      

       setModalForEdit(response.data);
       handlerShowStudents()
       handlerEditStudentHide()
  
      
    }

   // students data single view

   

    const handlerViewStudents = async(id) =>{
      setViewModal(() => (true) )

      const valus= await student.find((data) => data.id === id)
     console.log(valus);
      
    }
    const handlerViewStudentsHide =() =>{
      setViewModal(() => (false) )
 

    }


  return (
    <>
      <Modal show={modal}  centered onHide={handlerModalHide}>
        <ModalHeader closeButton>
          <ModalTitle>Create a Student</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handlerCreateStudents}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={input.Name}
              onChange={handleInputChange}
            />

            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              name="Age"
              value={input.Age}
              onChange={handleInputChange}
            />

            <Form.Label>Roll</Form.Label>
            <Form.Control
              type="text"
              name="Roll"
              value={input.Roll}
              onChange={handleInputChange}
            />

            <Form.Label>Photo url</Form.Label>
            <Form.Control
              type="text"
              name="Photo"
              value={input.Photo}
              onChange={handleInputChange}
            />

            <Button className="mt-3" variant="primary" type="submit">
              {" "}
              Create{" "}
            </Button>
          </form>
        </ModalBody>
      </Modal>

      <Modal show={modalForEdit} onHide={handlerEditStudentHide}>
        <ModalHeader closeButton>
          <ModalTitle> Update Students</ModalTitle>
        </ModalHeader>
        <ModalBody>

        <form onSubmit={handlerUpdateStudents}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={input.Name}
              onChange={handleInputChange}
            />

            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              name="Age"
              value={input.Age}
              onChange={handleInputChange}
            />

            <Form.Label>Roll</Form.Label>
            <Form.Control
              type="text"
              name="Roll"
              value={input.Roll}
              onChange={handleInputChange}
            />

            <Form.Label>Photo url</Form.Label>
            <Form.Control
              type="text"
              name="Photo"
              value={input.Photo}
              onChange={handleInputChange}
            />

            <Button className="mt-3" variant="primary" type="submit">
              {" "}
              Create{" "}
            </Button>
          </form>

      
        </ModalBody>

      </Modal>

      <Modal show={viewModal} onHide={handlerViewStudentsHide} >  
      

<ModalHeader>
  <ModalTitle> Preview Students Data</ModalTitle>
</ModalHeader>

<ModalBody   >

  <div className="img border border-info mt-2 rounded">
    <img  style={{ width: "100%", height: "100%", borderRadius: '5px' }} src="https://media.licdn.com/dms/image/C5603AQEvIEMDkT6EWg/profile-displayphoto-shrink_200_200/0/1660191607400?e=2147483647&v=beta&t=iB687SO738d6n1GmXe4EUdMmc5DtvfvRuu-m9AgbcFk" alt="" />
  </div>
  <div className="name border border-info mt-2">
    <h1></h1>
  </div>
  <div className="agee border border-info mt-2">
  <h1>name</h1>
  </div>
  <div className="roll border border-info mt-2">
  <h1>name</h1>
  </div>
</ModalBody>


      
      </Modal>

 

      <Container>
        <Row>
          <Col xxl={2}></Col>
          <Col xxl={8}>
            <Card className="shadow my-5">
              <CardHeader>
                <Button variant="primary" onClick={handlerModalShow}>
                  {" "}
                  create students
                </Button>
                <CardBody>
                  <Table striped variant="dark">
                    <thead className="rounded ">
                      <tr className="text-center">
                        <th>Sl No</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Roll</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {student.length === 0 ? (
                        <td colSpan={6}>
                          {" "}
                          <h1 className="text-center">not found</h1>{" "}
                        </td>
                      ) : (
                        student.map((item, index) => {
                          return (
                            <tr
                              className="text-center align-middle"
                              key={index}
                            >
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  className=" w-10 rounded-circle"
                                  style={{ width: "70px", height: "70px" }}
                                  src={item.Photo}
                                  alt=""
                                />
                              </td>
                              <td>{item.Name}</td>
                              <td>{item.Age}</td>
                              <td>{item.Roll}</td>
                              <td>
                                <Button variant="info">
                                  {" "}
                                  <FaEye className="fs-4"  onClick={() => handlerViewStudents(item.id)} />
                                </Button>
                                &nbsp;
                                <Button variant="warning">
                                  {" "}
                                  <FiEdit className="fs-4" onClick={() => handlerEditStudentshow(item.id)} />
 
                                </Button>
                                &nbsp;
                                <Button variant="danger" onClick={() => handlerStudentsDelete(item.id)}>
                                  {" "}
                                  <AiFillDelete className="fs-4" />
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      )}

                      
                    </tbody>
                  </Table>
                </CardBody>
              </CardHeader>
            </Card>
          </Col>
          <Col xxl={2}></Col>
        </Row>

    
       
      </Container>
    </>
  );
};

export default Home;
