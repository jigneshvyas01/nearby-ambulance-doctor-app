import React, { useState } from "react";
import Container from "../../components/Container";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import DoctorList, { Doctor } from "../doctor/components/DoctorList";
import DoctorForm from "../doctor/components/DoctorForm";
import axios from "axios";
import styled from "styled-components";

const ManageDoctors: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | undefined>(
    undefined
  );
  const [refetch, setRefetch] = useState(false);

  const handleOpenModal = (doctor?: Doctor) => {
    setIsModalOpen(true);
    setEditingDoctor(doctor);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(undefined);
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
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

  const handleSubmit = async (data: Doctor, file: File | null) => {
    try {
      let imageUrl = data.image;
      if (file) {
        imageUrl = await uploadToCloudinary(file);
      }

      const updatedData = { ...data, image: imageUrl };

      if (editingDoctor) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/doctors/${editingDoctor.id}`,
          updatedData
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/doctors`,
          updatedData
        );
      }

      setRefetch(true);
      handleCloseModal();
    } catch (error) {
      console.error("Error handling doctor submission:", error);
      // TODO: show error message to user
    }
  };

  return (
    <>
      <Container>
        <StyledHeader>
          <HeaderContent>
            <HeaderTitle>Manage Doctors</HeaderTitle>
            <HeaderSubtitle>Efficiently manage your doctors</HeaderSubtitle>
          </HeaderContent>
          <HeaderButtons>
            <Button onClick={() => navigate("/")}>Home</Button>
            <Button onClick={() => navigate("/doctors")}>Doctors</Button>
            <Button onClick={() => handleOpenModal()}>Create Doctor</Button>
          </HeaderButtons>
        </StyledHeader>

        <DoctorList
          refetch={refetch}
          setRefetch={setRefetch}
          isManaging={true}
          handleEditItem={handleOpenModal}
        />

        {isModalOpen && (
          <Modal
            onClose={handleCloseModal}
            title={editingDoctor ? "Edit Doctor" : "Add Doctor"}
          >
            <DoctorForm doctor={editingDoctor} onSubmit={handleSubmit} />
          </Modal>
        )}
      </Container>
    </>
  );
};

export default ManageDoctors;

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
