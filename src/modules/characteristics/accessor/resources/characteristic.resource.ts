import { Injectable } from '@nestjs/common';
import { UserCharacteristic } from 'src/common/entities/characteristic';

@Injectable()
export class CharacteristicResource {
  convert(characteristic: UserCharacteristic) {
    return {
      id: +characteristic.id,
      name: characteristic.name,
      created_at: characteristic.createdAt,
    };
  }
}
