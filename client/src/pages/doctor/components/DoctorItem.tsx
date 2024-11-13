import React from "react";
import { Doctor } from "./DoctorList";
import styled from "styled-components";
import { Button } from "../../../components/Button";
import { EditIcon, TrashIcon } from "lucide-react";
import axios from "axios";
import defaultImage from "../../../assets/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

type DoctorItemProps = {
  doctor: Doctor;
  isManaging: boolean;
  handleEditItem?: (doctor: Doctor) => void;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorItem: React.FC<DoctorItemProps> = ({
  doctor,
  isManaging,
  handleEditItem,
  setRefetch,
}) => {
  const handleDoctorItemDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/doctors/${doctor.id}`
      );

      if (setRefetch) {
        setRefetch(true);
      }
    } catch (err) {
      console.error("Error deleting Doctor:", err);
    }
  };

  const handleDoctorItemEdit = (doctor: Doctor) => {
    if (handleEditItem) {
      handleEditItem(doctor);
    }
  };

  return (
    <Card>
      <CardImage
        src={doctor.image ? doctor.image : defaultImage}
        alt={doctor.title}
      />
      <CardContent>
        <DoctorTitle>{doctor.title}</DoctorTitle>
        <DoctorDescription>{doctor.description}</DoctorDescription>
        <LocationText>Location: {doctor.location}</LocationText>
      </CardContent>
      {isManaging && (
        <ActionButtonContainer>
          <Button onClick={handleDoctorItemDelete}>
            <TrashIcon size={20} />
          </Button>
          <Button onClick={() => handleDoctorItemEdit(doctor)}>
            <EditIcon size={20} />
          </Button>
        </ActionButtonContainer>
      )}
    </Card>
  );
};

export default DoctorItem;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 380px;
  width: 100%;
  margin: 10px;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 15px auto;
`;

const CardContent = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const DoctorTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const DoctorDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;
`;

const LocationText = styled.p`
  font-size: 0.9rem;
  color: #999;
  margin-top: 5px;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 10px;
`;
