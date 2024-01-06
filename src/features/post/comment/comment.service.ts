import { Comment } from '@prisma/client';
import { HttpStatus } from '@/enums/http';
import { CustomError } from '@/libs/custom-error';
import { CommentRepository } from './comment.repository';
import { CommentDto } from './comment.dto';

export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  findAll = async (postId: number): Promise<Comment[]> => {
    return await this.commentRepository.findAllByPostId(postId);
  };

  findOneById = async (id: number): Promise<Comment> => {
    const comment = await this.commentRepository.findOneById(id);

    if (comment === null) {
      throw new CustomError(HttpStatus.NOT_FOUND, '존재하지 않는 댓글');
    }

    return comment;
  };

  create = async (
    commentDto: CommentDto,
    postId: number,
    userId: number,
  ): Promise<Comment> => {
    return await this.commentRepository.create(commentDto, postId, userId);
  };

  update = async (
    id: number,
    commentDto: CommentDto,
    userId: number,
  ): Promise<Comment> => {
    const comment = await this.findOneById(id);

    if (comment.userId !== userId) {
      throw new CustomError(HttpStatus.FORBIDDEN, '권한 없음');
    }

    return await this.commentRepository.update(id, commentDto);
  };

  delete = async (id: number, userId: number): Promise<void> => {
    const comment = await this.findOneById(id);

    if (comment.userId !== userId) {
      throw new CustomError(HttpStatus.FORBIDDEN, '권한 없음');
    }

    await this.commentRepository.delete(id);
  };
}
