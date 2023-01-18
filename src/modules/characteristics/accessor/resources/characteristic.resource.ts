import { Injectable } from '@nestjs/common';
import { Characteristic } from 'src/common/entities/characteristic';

@Injectable()
export class CharacteristicResource {
  convert(characteristic: Characteristic) {
    return {
      id: +characteristic.id,
      name: characteristic.name,
      created_at: characteristic.createdAt,
    };
  }
}
