import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AccountService', () => {
  let service: AccountService;

  const mockPrismaService = {
  account: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
  },
};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException if account not found', async () => {
  // Arrange
  mockPrismaService.account.findUnique.mockResolvedValue(null);

  // Act & Assert
  await expect(service.findOne('999', '1')).rejects.toThrow('Account not found');
});
});