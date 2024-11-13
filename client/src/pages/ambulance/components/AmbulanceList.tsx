import React, { useEffect, useState } from "react";
import ListContainer from "../../../components/ListContainer";
import axios from "axios";
import "react-responsive-pagination/themes/classic.css";
import ResponsivePagination from "react-responsive-pagination";
import AmbulanceItem from "./AmbulanceItem";
import SkeletonLoader from "../../../components/SkeletonLoader";
import styled from "styled-components";

export type Ambulance = {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
};

type AmbulanceListProps = {
  refetch?: boolean;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  isManaging?: boolean;
  handleEditItem?: (ambulance: Ambulance) => void;
};

const AmbulanceList: React.FC<AmbulanceListProps> = ({
  refetch,
  setRefetch,
  isManaging = false,
  handleEditItem,
}) => {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchAmbulances();
  }, [page]);

  useEffect(() => {
    if (refetch && setRefetch) {
      fetchAmbulances();
      setRefetch(false);
    }
  }, [refetch]);

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setPage(page);
    setAmbulances([]);
  };

  const fetchAmbulances = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/ambulances?page=${page}`
      );
      setAmbulances(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.total);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch ambulances");
      setLoading(false);
    }
  };

  return (
    <ListContainer>
      <ListWrapper>
        {loading &&
          new Array(10)
            .fill(1)
            .map((_item, idx) => <SkeletonLoader key={idx} />)}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!loading && !error && ambulances.length === 0 && (
          <EmptyMessage>No ambulances available</EmptyMessage>
        )}
        {ambulances.length > 0 && (
          <>
            <AmbulanceGrid>
              {ambulances.map((ambulance: Ambulance) => (
                <AmbulanceItem
                  key={ambulance.id}
                  ambulance={ambulance}
                  isManaging={isManaging}
                  handleEditItem={handleEditItem}
                  setRefetch={setRefetch}
                />
              ))}
            </AmbulanceGrid>
            <PaginationWrapper>
              <span>Total Ambulances available: {totalItems}</span>
              <ResponsivePagination
                current={page}
                total={totalPages}
                onPageChange={handlePageChange}
              />
            </PaginationWrapper>
          </>
        )}
      </ListWrapper>
    </ListContainer>
  );
};

export default AmbulanceList;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  padding: 20px;
`;

const AmbulanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
`;

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1rem;
  text-align: center;
`;

const EmptyMessage = styled.div`
  color: #666;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
`;
