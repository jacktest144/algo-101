import { Modal, Button, Image, Row, Col } from "react-bootstrap";
import { formatDate, microAlgosToString } from "../../utils/conversions";

export default function PetModal({
  show,
  handleClose,
  pet,
  address,
  showEditModal,
  adoptPet,
  deletePet,
}) {
  return (
    <Modal show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pet.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pet.owner === address && (
          <Row>
            <Col md="9"></Col>
            <Col md="3" style={{ display: "flex" }}>
              <Button variant="info" onClick={showEditModal}>
                <i class="bi bi-pencil-square"></i>
              </Button>
              <Button variant="danger" onClick={deletePet}>
                <i class="bi bi-trash3"></i>
              </Button>
            </Col>
          </Row>
        )}
        <Image src={pet.image} alt="pet" fluid />
        <p className="mt-2">{pet.description}</p>
        Price: <h5>{microAlgosToString(pet.price)}ALGO</h5>
        Date Listed: <h5>{formatDate(microAlgosToString(pet.createdAt))}</h5>
        {pet.owner !== address ? (
          <Button onClick={() => adoptPet(pet)}>Adopt Pet</Button>
        ) : (
          <p>You can't adopt your pet</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
