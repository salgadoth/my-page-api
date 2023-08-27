import { CreateUserExperienceDto } from './create-user-experience.dto';
import { CreateUserProjectsDto } from './create-user-projects.dto';

export class CreateUserDto {
  username: string;
  password: string;
  fname: string;
  lname: string;

  experience: CreateUserExperienceDto[];
  projects: CreateUserProjectsDto[];
}
