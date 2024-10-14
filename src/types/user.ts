// types/user.ts

export interface Qualification {
  id: string;
  type: QualificationType;
  name: string;
  institution: string;
  verificationLink: string;
  startDate: Date | null;
  endDate: Date | null;
}

export enum QualificationType {
  Diploma,
  Certificate,
  Degree,
  License,
}

export function qualificationTypeToString(type: QualificationType) {
  switch (type) {
    case QualificationType.Diploma:
      return "Diploma";
    case QualificationType.Certificate:
      return "Certificate";
    case QualificationType.Degree:
      return "Degree";
    case QualificationType.License:
      return "License";
  }
}



export interface SocialLink {
  id: string;
  url: string;
  userId: string;
  socialLinkType: number;
}

export enum PhoneType {
  Home,
  Work,
  Mobile,
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
// types/socialMedia.ts

import { FaLinkedin, FaSquareInstagram, FaSquareXTwitter, FaYoutube, FaMedium, FaSquareGithub } from 'react-icons/fa6';

export enum SocialLinkType {
  LinkedIn = 0,
  Instagram = 1,
  Twitter = 2,
  YouTube = 3,
  Medium = 4,
  GitHub = 5,
}

export const socialMediaPlatforms = {
  [SocialLinkType.LinkedIn]: {
    name: 'LinkedIn',
    icon: FaLinkedin,
    iconColor: 'text-[#0077B5]',
  },
  [SocialLinkType.Instagram]: {
    name: 'Instagram',
    icon: FaSquareInstagram,
    iconColor: 'text-[#c13584]',
  },
  [SocialLinkType.Twitter]: {
    name: 'Twitter',
    icon: FaSquareXTwitter,
    iconColor: 'text-[#1DA1F2]',
  },
  [SocialLinkType.YouTube]: {
    name: 'YouTube',
    icon: FaYoutube,
    iconColor: 'text-[#FF0000]',
  },
  [SocialLinkType.Medium]: {
    name: 'Medium',
    icon: FaMedium,
    iconColor: 'text-black',
  },
  [SocialLinkType.GitHub]: {
    name: 'GitHub',
    icon: FaSquareGithub,
    iconColor: 'text-black',
  },
};


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

export interface Author {
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

