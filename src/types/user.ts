// types/user.ts

export interface Qualification {
  id: string;
  type: QualificationType;
  name: string;
  institution: string;
  verificationLink: string;
  startDate: string;
  endDate: string;
}

export enum QualificationType
{
  Diploma = "Associate's Degree",
  Certificate = "Certificate",
  Degree = "Bachelor's Degree",
  License = "License",
}

export interface SocialLink {
  id: string;
  url: string;
  userId: string;
  socialLinkType: number;
}

export enum PhoneType {
  Home,
  Work ,
  Mobile ,
}

export function phoneTypeToString(type: PhoneType) {
  switch (type) {
    case PhoneType.Home:
      return 'Home';
    case PhoneType.Work:
      return 'Work';
    case PhoneType.Mobile:
      return 'Mobile';
  }
}
export interface PhoneNumber {
  id: string;
  number: string;
  type: PhoneType;
}

export interface SocialLink {
  id: string;
  url: string;
  userId: string;
  socialLinkType: number;
}

export interface UserData {
  firstName: string;
  lastName: string;
  profilePicture: string;
  profession: string;
  yearsOfExperience: number;
  bio: string;
  videoUrl: string | null;
  emailAddress: string;
  userName: string;
  emailConfirmed: boolean;
  ratingAvg: number;
  reviewCount: number;
  qualifications: Qualification[];
  socialLinks: SocialLink[];
  phoneNumbers: PhoneNumber[];
}

export interface Author{
  userName: string;
  fullName: string;
  profilePicture: string;
  profession: string;
}

export interface Review {
  id: string;
  author: Author;
  content: string;
  rating: number;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
}

