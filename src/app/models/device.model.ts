export class Device {
  name: string;
  appId: string;
  devId: string;
  hardwareSerial: string;
  lat: Number;
  long: Number;
  createdAt: Date;
  updatedAt: Date;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
