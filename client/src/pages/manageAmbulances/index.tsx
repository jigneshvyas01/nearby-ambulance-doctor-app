import React, { useState } from "react";
import Container from "../../components/Container";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import AmbulanceList, {
  Ambulance,
} from "../ambulance/components/AmbulanceList";
import AmbulanceForm from "../ambulance/components/AmbulanceForm";
import axios from "axios";
import styled from "styled-components";

const ManageAmbulances: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAmbulance, setEditingAmbulance] = useState<
    Ambulance | undefined
  >(undefined);
  const [refetch, setRefetch] = useState(false);

  const handleOpenModal = (ambulance?: Ambulance) => {
    setIsModalOpen(true);
    setEditingAmbulance(ambulance);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAmbulance(undefined);
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_COUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_COUDINARY_CLOUD_NAME
      }/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (data: Ambulance, file: File | null) => {
    try {
      let imageUrl = data.image;
      if (file) {
        imageUrl = await uploadToCloudinary(file);
      }

      const updatedData = { ...data, image: imageUrl };

      if (editingAmbulance) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/ambulances/${
            editingAmbulance.id
          }`,
          updatedData
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/ambulances`,
          updatedData
        );
      }

      setRefetch(true);
      handleCloseModal();
    } catch (error) {
      console.error("Error handling ambulance submission:", error);
      // TODO: show error message to user
    }
  };

  return (
    <>
      <Container>
        <StyledHeader>
          <HeaderContent>
            <HeaderTitle>Manage Ambulances</HeaderTitle>
            <HeaderSubtitle>
              Efficiently manage your ambulance fleet
            </HeaderSubtitle>
          </HeaderContent>
          <HeaderButtons>
            <Button onClick={() => navigate("/")}>Home</Button>
            <Button onClick={() => navigate("/ambulances")}>Ambulances</Button>
            <Button onClick={() => handleOpenModal()}>Create Ambulance</Button>
          </HeaderButtons>
        </StyledHeader>

        <AmbulanceList
          refetch={refetch}
          setRefetch={setRefetch}
          isManaging={true}
          handleEditItem={handleOpenModal}
        />

        {isModalOpen && (
          <Modal
            onClose={handleCloseModal}
            title={editingAmbulance ? "Edit Ambulance" : "Add Ambulance"}
          >
            <AmbulanceForm
              ambulance={editingAmbulance}
              onSubmit={handleSubmit}
            />
          </Modal>
        )}
      </Container>
    </>
  );
};

export default ManageAmbulances;

const StyledHeader = styled.div`
  background-color: #343a40;
  color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  color: white;
`;

const HeaderSubtitle = styled.p`
  font-size: 1rem;
  margin: 5px 0 0;
  color: #b0bec5;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
