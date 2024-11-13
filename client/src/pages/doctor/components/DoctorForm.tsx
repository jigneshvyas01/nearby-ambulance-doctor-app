import React, { useState } from "react";
import styled from "styled-components";
import { Doctor } from "./DoctorList";
import { useForm } from "react-hook-form";

interface DoctorFormProps {
  doctor?: Doctor;
  onSubmit: (data: Doctor, file: File | null) => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ doctor, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Doctor>({
    defaultValues: doctor || {},
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    doctor?.image
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmitForm = (data: Doctor) => {
    onSubmit(data, selectedFile);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <CardWrapper>
        <Section>
          <InputGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              {...register("title", { required: "Title is required" })}
              id="title"
              placeholder="Enter the doctor title"
            />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="description">Description</Label>
            <Input
              {...register("description", {
                required: "Description is required",
              })}
              id="description"
              placeholder="Enter a brief description"
            />
            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="location">Location</Label>
            <Input
              {...register("location", { required: "Location is required" })}
              id="location"
              placeholder="Enter the location"
            />
            {errors.location && (
              <ErrorMessage>{errors.location.message}</ErrorMessage>
            )}
          </InputGroup>
        </Section>

        <Section>
          <Label htmlFor="file-input">Upload an Image</Label>
          <FileInput
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleFileSelect}
          />
          {previewUrl && (
            <ImagePreview>
              <img src={previewUrl} alt="Preview" />
            </ImagePreview>
          )}
        </Section>

        <SubmitButtonWrapper>
          <Button type="submit" disabled={isSubmitting}>
            {doctor ? "Update" : "Create"}
          </Button>
        </SubmitButtonWrapper>
      </CardWrapper>
    </Form>
  );
};

export default DoctorForm;

const Form = styled.form`
  display: flex;
  justify-content: center;
  background: #f9f9f9;
`;

const CardWrapper = styled.div`
  padding: 20px 18px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #444;
`;

const Input = styled.input`
  background-color: #fff;
  color: #000;
  padding: 10px 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const FileInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const ImagePreview = styled.div`
  margin-top: 12px;
  img {
    width: 100%;
    max-height: 250px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.875rem;
  color: #ff4d4d;
  padding-left: 5px;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
