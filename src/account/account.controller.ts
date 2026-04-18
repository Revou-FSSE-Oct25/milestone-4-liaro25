import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@ApiTags('Account')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Req() req: any, @Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(req.user.userId, createAccountDto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.accountService.findAll(req.user.userId);
  }
}