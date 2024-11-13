import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-pagination/themes/classic.css";
import ResponsivePagination from "react-responsive-pagination";
import DoctorItem from "./DoctorItem";
import Container from "../../../components/Container";
import SkeletonLoader from "../../../components/SkeletonLoader";
import styled from "styled-components";

export type Doctor = {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
};

type DoctorListProps = {
  refetch?: boolean;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  isManaging?: boolean;
  handleEditItem?: (doctor: Doctor) => void;
};

const DoctorList: React.FC<DoctorListProps> = ({
  refetch,
  setRefetch,
  isManaging = false,
  handleEditItem,
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchDoctors();
  }, [page]);

  useEffect(() => {
    if (refetch && setRefetch) {
      fetchDoctors();
      setRefetch(false);
    }
  }, [refetch]);

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setPage(page);
    setDoctors([]); // Clear doctors while loading new page
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/doctors?page=${page}`
      );
      setDoctors(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.total);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch doctors");
      setLoading(false);
    }
  };

  return (
    <ListContainer>
      {loading
        ? new Array(10)
            .fill(1)
            .map((_item, idx) => <SkeletonLoader key={idx} />)
        : null}
      {error && <p>{error}</p>}
      {!loading && !error && doctors.length === 0 && (
        <p>No doctors available</p>
      )}
      {!loading && !error && doctors.length > 0 && (
        <>
          <CardGrid>
            {doctors.map((doctor: Doctor) => (
              <DoctorItem
                key={doctor.id}
                doctor={doctor}
                isManaging={isManaging}
                handleEditItem={handleEditItem}
                setRefetch={setRefetch}
              />
            ))}
          </CardGrid>
          <Container>
            <span>Total Doctors available: {totalItems}</span>
            <ResponsivePagination
              current={page}
              total={totalPages}
              onPageChange={handlePageChange}
            />
          </Container>
        </>
      )}
    </ListContainer>
  );
};

export default DoctorList;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  padding: 0 10px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;
