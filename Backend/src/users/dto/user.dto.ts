import { Expose, Transform } from 'class-transformer';
import { Docs } from 'src/Docs/entities/Docs.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
  @Expose()
  active: boolean;
  @Expose()
  username: string;

  @Expose()
  role: string;

  @Expose()
  createBy: number;

  @Transform(({ obj }) => obj.Docs)
  @Expose()
  Docs: Docs;
}
