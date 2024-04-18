import { CreateUserContactsDto } from './create-user-contacts.dto';
import { CreateUserExperienceDto } from './create-user-experience.dto';
import { CreateUserLanguagesDto } from './create-user-languages';
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

  skill_set: string[];
  experience: CreateUserExperienceDto[];
  projects: CreateUserProjectsDto[];
  contacts: CreateUserContactsDto[];
  personal_links: CreateUserLinksDto[];
  languages: CreateUserLanguagesDto[];
}
