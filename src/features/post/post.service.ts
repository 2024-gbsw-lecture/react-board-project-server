import { Post } from '@prisma/client';
import { PageableResponse } from '@/types/response';
import { PostRepository } from './post.repository';
import { CustomError } from '../../libs/custom-error';
import { HttpStatus } from '../../enums/http';
import { CreatePostDto, UpdatePostDto } from './post.dto';

export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  findAll = async (
    page: number,
    size: number,
  ): Promise<PageableResponse<Omit<Post, 'content'>[]>> => {
    const [totalCount, posts] = await this.postRepository.findAll(page, size);

    const totalPages = Math.ceil(totalCount / size);
    const last = page + 1 >= totalPages;

    return {
      totalCount,
      totalPages,
      content: posts,
      last,
    };
  };

  findOneById = async (id: number): Promise<Post> => {
    const post = await this.postRepository.findOneById(id);

    if (post === null) {
      throw new CustomError(HttpStatus.NOT_FOUND, '존재하지 않는 글');
    }

    return post;
  };

  create = async (
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<Post> => {
    return await this.postRepository.create(createPostDto, userId);
  };

  update = async (
    id: number,
    updatePostDto: UpdatePostDto,
    userId: number,
  ): Promise<Post> => {
    const post = await this.findOneById(id);

    if (post.userId !== userId) {
      throw new CustomError(HttpStatus.FORBIDDEN, '권한 없음');
    }

    const updatedPost = await this.postRepository.update(id, updatePostDto);

    return updatedPost;
  };

  delete = async (id: number, userId: number): Promise<void> => {
    const post = await this.findOneById(id);

    if (post.userId !== userId) {
      throw new CustomError(HttpStatus.FORBIDDEN, '권한 없음');
    }

    await this.postRepository.delete(id);
  };
}
