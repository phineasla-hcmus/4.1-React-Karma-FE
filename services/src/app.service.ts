import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getItems(id: string) {
    return [{ id: id, value: 'Hello' }];
  }
}
