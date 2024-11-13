import React from "react";
import { Ambulance } from "./AmbulanceList";
import styled from "styled-components";
import { Button } from "../../../components/Button";
import { EditIcon, TrashIcon } from "lucide-react";
import axios from "axios";
import defaultAmbulance from "../../../assets/ambulance.jpg";

type AmbulanceItemProps = {
  ambulance: Ambulance;
  isManaging: boolean;
  handleEditItem?: (ambulance: Ambulance) => void;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AmbulanceItem: React.FC<AmbulanceItemProps> = ({
  ambulance,
  isManaging,
  handleEditItem,
  setRefetch,
}) => {
  const handleAmbulanceItemDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/ambulances/${ambulance.id}`
      );

      if (setRefetch) {
        setRefetch(true);
      }
    } catch (err) {
      console.error("Error deleting Ambulance:", err);
    }
  };

  const handleAmbulanceItemEdit = (ambulance: Ambulance) => {
    if (handleEditItem) {
      handleEditItem(ambulance);
    }
  };

  return (
    <Card>
      <ImageWrapper>
        <img
          src={ambulance.image ? ambulance.image : defaultAmbulance}
          alt={ambulance.title}
        />
      </ImageWrapper>
      <Details>
        <h3>{ambulance.title}</h3>
        <p>{ambulance.description}</p>
        <p>
          <strong>Location:</strong> {ambulance.location}
        </p>
      </Details>
      {isManaging && (
        <Actions>
          <Button onClick={handleAmbulanceItemDelete}>
            <TrashIcon size={20} />
          </Button>
          <Button onClick={() => handleAmbulanceItemEdit(ambulance)}>
            <EditIcon size={20} />
          </Button>
        </Actions>
      )}
    </Card>
  );
};

export default AmbulanceItem;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
`;

const ImageWrapper = styled.div`
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const Details = styled.div`
  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin: 5px 0;
  }

  strong {
    color: #000;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
