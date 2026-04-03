import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderResponse = {
    total: 1,
    items: [{ film: '1', session: '1', row: 1, seat: 1 }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn().mockResolvedValue(mockOrderResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  it('должен вызывать orderService.createOrder с правильными данными', async () => {
    const dto: CreateOrderDto = {
      tickets: [{ film: '1', session: '1', row: 1, seat: 1 }],
    } as any;

    const result = await controller.create(dto);

    expect(service.createOrder).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockOrderResponse);
  });
});
