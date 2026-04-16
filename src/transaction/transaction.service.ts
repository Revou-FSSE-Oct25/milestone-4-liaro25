import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';
import { Prisma, TransactionType } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  private async getOwnedAccount(userId: string, accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.userId !== userId) {
      throw new ForbiddenException('You are not allowed to access this account');
    }

    return account;
  }

  async deposit(userId: string, depositDto: DepositDto) {
    const { accountId, amount } = depositDto;

    await this.getOwnedAccount(userId, accountId);

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const updatedAccount = await tx.account.update({
        where: { id: accountId },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          accountId,
          amount,
          type: TransactionType.DEPOSIT,
        },
      });

      return {
        message: 'Deposit successful',
        account: updatedAccount,
        transaction,
      };
    });
  }

  async withdraw(userId: string, withdrawDto: WithdrawDto) {
    const { accountId, amount } = withdrawDto;

    const account = await this.getOwnedAccount(userId, accountId);

    if (account.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const updatedAccount = await tx.account.update({
        where: { id: accountId },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          accountId,
          amount,
          type: TransactionType.WITHDRAW,
        },
      });

      return {
        message: 'Withdraw successful',
        account: updatedAccount,
        transaction,
      };
    });
  }

  async transfer(userId: string, transferDto: TransferDto) {
    const { fromAccountId, toAccountId, amount } = transferDto;

    if (fromAccountId === toAccountId) {
      throw new BadRequestException('Cannot transfer to the same account');
    }

    const fromAccount = await this.getOwnedAccount(userId, fromAccountId);

    const toAccount = await this.prisma.account.findUnique({
      where: { id: toAccountId },
    });

    if (!toAccount) {
      throw new NotFoundException('Destination account not found');
    }

    if (fromAccount.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const updatedFrom = await tx.account.update({
        where: { id: fromAccountId },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      const updatedTo = await tx.account.update({
        where: { id: toAccountId },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          accountId: fromAccountId,
          amount,
          type: TransactionType.TRANSFER,
        },
      });

      return {
        message: 'Transfer successful',
        fromAccount: updatedFrom,
        toAccount: updatedTo,
        transaction,
      };
    });
  }

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        account: {
          userId,
        },
      },
      include: {
        account: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        account: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.account.userId !== userId) {
      throw new ForbiddenException('You are not allowed to access this transaction');
    }

    return transaction;
  }
}