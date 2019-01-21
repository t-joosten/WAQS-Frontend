export class Device {
  _id: string;
  name: string;
  appId: string;
  devId: string;
  hardwareSerial: string;
  battery: Number;
  alt: Number;
  lat: Number;
  long: Number;
  createdAt: Date;
  updatedAt: Date;
  deviceValuesUpdatedAt: Date;
  sensorValuesUpdatedAt: Date;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
