import React from "react";
import styled, { keyframes } from "styled-components";

const SkeletonLoader: React.FC = () => (
  <SkeletonCard>
    <ImageSkeleton />
    <ContentSkeleton>
      <SkeletonText width="70%" height="20px" />
      <SkeletonText width="50%" height="15px" />
      <SkeletonText width="80%" height="15px" />
    </ContentSkeleton>
    <ActionsSkeleton>
      <SkeletonButton width="40px" height="40px" />
      <SkeletonButton width="40px" height="40px" />
    </ActionsSkeleton>
  </SkeletonCard>
);

export default SkeletonLoader;

// Animation for the skeleton loader
const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Skeleton card mimicking DoctorItem layout
const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  gap: 15px;
  height: 100%;
`;

// Skeleton for the image
const ImageSkeleton = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.5) 25%,
    rgba(224, 224, 224, 0.5) 50%,
    rgba(240, 240, 240, 0.5) 75%
  );
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.5s infinite;
  margin: 0 auto;
`;

// Skeleton for the content section
const ContentSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Skeleton text placeholder
const SkeletonText = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.5) 25%,
    rgba(224, 224, 224, 0.5) 50%,
    rgba(240, 240, 240, 0.5) 75%
  );
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.5s infinite;
  border-radius: 4px;
`;

// Skeleton for action buttons
const ActionsSkeleton = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

// Skeleton button placeholder
const SkeletonButton = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.5) 25%,
    rgba(224, 224, 224, 0.5) 50%,
    rgba(240, 240, 240, 0.5) 75%
  );
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.5s infinite;
  border-radius: 50%;
`;
