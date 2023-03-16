import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationGateway } from './notificationGateway';
@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private notificationsGateway: NotificationGateway,
  ) {}

  async create( ownBlog: number, notiDto: CreateNotificationDto): Promise<Notification> {
    const notification = new Notification(notiDto.type, notiDto.username, notiDto.userId, notiDto.blogId)

    const savedNotification = await this.notificationRepository.save(notification);
    this.notificationsGateway.sendNotificationToUser( ownBlog, savedNotification.content);

    return savedNotification;
  }

  async findNotificationsByUserId(userId: number): Promise<Notification[]> {
    await this.markNotificationsAsRead(userId)

    return await this.notificationRepository.find({
      where: {
        userId: userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getOne(id: number, userId: number) {
    const notification = await this.notificationRepository.findOneBy({id: id})
    return `/blog/${notification.blogId}` ;
  }

  findAll() {
    return `This action returns all notification`;
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<any> {
    const notification = await this.notificationRepository.update(
      { id },
      { content: updateNotificationDto.type },
    );

    return notification;
  }

  async remove(id: number) {
    return await this.notificationRepository.delete(id);
  }

  async markNotificationsAsRead(userId: number): Promise<void> {
    await this.notificationRepository.update(
      { userId, isRead: false },
      { isRead: true },
    );
  }
}
