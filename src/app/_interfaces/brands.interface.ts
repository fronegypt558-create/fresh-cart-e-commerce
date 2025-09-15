export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IBrandDetails {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}
