import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';
import { Likes } from 'src/like/entities/like.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateBlogDto } from '../dto/create-blog.dto';

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsString()
  content: string;

  @CreateDateColumn({ default: new Date() }) // You don't need to set this column - it will be automatically set
  created_at: Date; // Creation date

  @UpdateDateColumn({ default: new Date() }) // You don't need to set this column - it will be automatically set
  updated_at: Date; // Last updated date

  @Column({ default: 0 })
  view: number;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.blogs)
  @JoinTable()
  tags: Tag[];

  @AutoMap()
  @OneToMany(() => Likes, (like) => like.user)
  likes: Likes[];

  @Column({ default: 0 })
  likeCount: number;

  @AutoMap()
  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @Column({ default: 0 })
  cmtCount: number;

  @Column('simple-json')
  shares: { [key: string]: number };

  constructor(title: string, content: string, tags: Tag[], user: User) {
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.user = user;
  }
}
