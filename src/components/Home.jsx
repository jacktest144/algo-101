/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { NotificationError, NotificationSuccess } from "./utils/Notifications";
import {
  adoptPetAction,
  createPetAction,
  deletePetAction,
  getPetsAction,
  editPetAction,
} from "../utils/pet";
import { microAlgosToString, truncateAddress } from "../utils/conversions";
import PetModal from "./modals/PetModal";
import EditModal from "./modals/EditModal";
import AddModal from "./modals/AddModal";

export default function Home({ address, fetchBalance }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModal, showAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [showModal, shouldShowModal] = useState(null);

  const getPets = async () => {
    setLoading(true);
    getPetsAction()
      .then((pets) => {
        if (pets) {
          console.log(pets);
          setPets(pets);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((_) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPets();
  }, []);

  const createPet = async (newPet) => {
    showAddModal(false);
    setLoading(true);
    createPetAction(address, { ...newPet, createdAt: Date.now() })
      .then(() => {
        toast(<NotificationSuccess text="Pet added successfully." />);
        getPets();
        fetchBalance(address);
      })
      .catch((error) => {
        console.log(error);
        toast(<NotificationError text="Failed to create a pet." />);
        setLoading(false);
      });
  };

  const editPet = async (editedPet) => {
    setLoading(true);
    editPetAction(address, editedPet)
      .then(() => {
        toast(<NotificationSuccess text="Pet edited successfully." />);
        getPets();
        fetchBalance(address);
      })
      .catch((error) => {
        console.log(error);
        toast(<NotificationError text="Failed to edit pet." />);
        setLoading(false);
      });
  };

  const adoptPet = async (pet) => {
    setLoading(true);
    adoptPetAction(address, pet, pet.price)
      .then(() => {
        toast(<NotificationSuccess text="Adopted Pet successfully" />);
        getPets();
        fetchBalance(address);
      })
      .catch((error) => {
        console.log(error);
        toast(<NotificationError text="Failed to adopt pet." />);
        setLoading(false);
      });
  };

  const deletePet = async (pet) => {
    setLoading(true);
    deletePetAction(address, pet.appId)
      .then(() => {
        toast(<NotificationSuccess text="Pet deleted successfully" />);
        getPets();
        fetchBalance(address);
      })
      .catch((error) => {
        console.log(error);
        toast(<NotificationError text="Failed to delete pet." />);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div style={{ margin: "auto", maxHeight: "10vh", maxWidth: "10vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col md="10">
          <h1 className="mb-4">Pet Shop</h1>
        </Col>
        <Col
          md="2"
          onClick={() => showAddModal(true)}
          style={{ fontSize: "24px" }}
        >
          <i className="bi bi-plus-circle"></i>
        </Col>
      </Row>
      <Row>
        {pets.length > 0 ? (
          pets.map((pet, i) => {
            if (pet.sold === 0) {
              return (
                <Col key={i} md="4" className="mb-3">
                  <Card style={{ width: "18rem" }}>
                    <Card.Header className="font-monospace text-secondary">
                      <Row>
                        <Col md="7">{truncateAddress(pet.owner)}</Col>
                        <Col md="5">
                          {parseFloat(microAlgosToString(pet.price))} ALGO
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Img
                      variant="top"
                      src={pet.image.replace("ipfs.infura", "diac.infura-ipfs")}
                    />
                    <Card.Body>
                      <Card.Title>{pet.title}</Card.Title>
                      <Card.Text>{pet.description.slice(0, 30)}</Card.Text>
                      <Button onClick={() => shouldShowModal(i)}>
                        See More
                      </Button>
                      <PetModal
                        key={i}
                        show={showModal === i}
                        pet={pet}
                        showEditModal={() => setEditModal(i)}
                        deletePet={deletePet}
                        adoptPet={adoptPet}
                        handleClose={() => shouldShowModal(null)}
                        address={address}
                      />
                      <EditModal
                        key={i}
                        show={editModal === i}
                        pet={pet}
                        editPet={editPet}
                        handleClose={() => {
                          shouldShowModal(null);
                          setEditModal(null);
                        }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              );
            }
          })
        ) : (
          <div style={{ margin: "auto", maxHeight: "10vh", maxWidth: "10vh" }}>
            <Spinner animation="border" />
          </div>
        )}
      </Row>
      <AddModal
        show={addModal}
        handleClose={() => showAddModal(false)}
        createPet={createPet}
      />
    </Container>
  );
}
