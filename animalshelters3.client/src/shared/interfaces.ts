export interface Animal {
  animalId: number;    // Ensure camelCase is used here if needed
  name: string;
  categoryId: number;
  breed: string;
  age: number;
  shelterId?: number;  // optional
  temperament: string;
  adoptionStatus: string;
  imageUrl?: string;   // optional if there is no image
  createdAt: Date;
}

export interface Category {
  categoryId: number;  // ID of the category
  Species: string;        // Name of the category
  description?: string; // Optional description field
}





export interface ShelterDTO {
  name: string;
  address?: string;
  phone?: string;
  email: string;
  verified?: boolean;
  createdAt?: string; // Or Date
}
