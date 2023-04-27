import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoteService {
  async findByDni(dni: string) {
    const rowData = await fetch(`${process.env.API_VALIDATOR_PATH}?dni=${dni}`);
    const data = await rowData.json();

    return data.length > 0 ? data[0] : null;
  }
}
