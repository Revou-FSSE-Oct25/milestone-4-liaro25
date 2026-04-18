import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';

@ApiTags('Transaction')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit')
  deposit(@Req() req: any, @Body() depositDto: DepositDto) {
    return this.transactionService.deposit(req.user.userId, depositDto);
  }

  @Post('withdraw')
  withdraw(@Req() req: any, @Body() withdrawDto: WithdrawDto) {
    return this.transactionService.withdraw(req.user.userId, withdrawDto);
  }

  @Post('transfer')
  transfer(@Req() req: any, @Body() transferDto: TransferDto) {
    return this.transactionService.transfer(req.user.userId, transferDto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.transactionService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.transactionService.findOne(req.user.userId, id);
  }
}