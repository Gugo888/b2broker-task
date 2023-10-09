import { faker } from "@faker-js/faker";

export class DataItem {
  int = faker.number.int();
  float = faker.number.float({precision: 0.0000000000000000001}).toFixed(18);
  color = faker.color.rgb();
  child = {
    id: faker.string.numeric(5),
    color: faker.color.rgb(),
  };

  constructor(public id: string) {}
}

export const createDataItems = (size: number): DataItem[] => {
  const items = [];
  for (let i = 1; i <= size; i++) {
    items.push(new DataItem(i.toString()))
  }
  
  return items;
};