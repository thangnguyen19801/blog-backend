import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { AtGuard } from 'src/common/guards/at.guard';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from 'src/notification/entities/notification.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { NotificationGateway } from 'src/notification/notificationGateway';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleGuard } from 'src/common/guards/roles.guard';
@Controller()
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Roles('admin')
  @UseGuards(AtGuard, RoleGuard)
  @Post('rating/blog/:id')
  async create(
    @Param('id') blogId: number,
    @GetCurrentUserId() userId: number,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return this.ratingService.create(createRatingDto, userId, blogId);
  }

  @Get('rating/:id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Roles('admin')
  @UseGuards(AtGuard, RoleGuard)
  @Put('rating/:id')
  update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.ratingService.update(1, +id, updateRatingDto, userId);
  }

  @Roles('admin')
  @UseGuards(AtGuard, RoleGuard)
  @Delete('rating')
  remove(@Query('id') id: string) {
    return this.ratingService.removeRating(+id);
  }
}
