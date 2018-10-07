export class Device {
  name: string;
  appId: string;
  devId: string;
  hardwareSerial: string;
  createdAt: Date;
  updatedAt: Date;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
