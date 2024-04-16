import { CreateUserContactsDto } from './create-user-contacts.dto';
import { CreateUserExperienceDto } from './create-user-experience.dto';
import { CreateUserLinksDto } from './create-user-links.dto';
import { CreateUserProjectsDto } from './create-user-projects.dto';

export class CreateUserDto {
  username: string;
  password: string;
  fname: string;
  lname: string;
  title: string;
  country: string;
  state: string;
  city: string;
  street: string;

  experience: CreateUserExperienceDto[];
  projects: CreateUserProjectsDto[];
  contacts: CreateUserContactsDto[];
  personal_links: CreateUserLinksDto[];
}
