import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
/**
 * 具体来说，这个类型别名做了以下事情：
Omit<User, "createdAt" | "updatedAt" | "emailVerified"> 表示从 User 类型中删除 "createdAt"、"updatedAt" 和 "emailVerified" 这三个属性，得到一个新的类型。
& 符号表示将新类型和一个对象类型合并成一个新的类型，对象类型包含新增的属性 createdAt、updatedAt 和 emailVerified。
createdAt: string 表示 createdAt 属性的类型为 string。
updatedAt: string 表示 updatedAt 属性的类型为 string。
emailVerified: string | null 表示 emailVerified 属性的类型为 string 或 null。
 */
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
