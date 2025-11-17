
export interface Project {
  id: string;
  title: string;
  year: number;
  tags: string[];
  imageUrl: string;
  description: string;
  longDescription: string;
  technologies: string[];
  galleryImages: string[];
  videoUrl?: string;
}
