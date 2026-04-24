import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard) // apply guard once (cleaner)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user.userId);
  }

  @Patch('profile')
  updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.userService.updateProfile(req.user.userId, updateProfileDto);
  }
}