export type subscriptionType = {
    createdAt: Date;
    updatedAt: Date;
} & {
    name: string;
    price: number;
    currency: "USD" | "EUR" | "GBP" | "INR";
    category: string;
    frequency: string;
    paymentMethod: string;
    status: string;
    startDate: Date;
    renewalDate: Date;
    user?: any;
}

export type subscriptionResponseType = {
    daysLeft?: number;
    category: string;
    createdAt: string;
    currency: string;
    frequency: string;
    name: string;
    paymentMethod: string;
    price: number;
    renewalDate: string;
    startDate: string;
    status: string;
    subLogo: string;
    updatedAt: string;
    user: string;
    __v: number;
    _id: string;
}

export type GraphDataType = {
    series: {
        name: string;
        data: any[] //(string | number)[];
    }[];
    xAxis?: {
        categories: (string | number)[];
    };
}

export type usersDataType = {
    name: string;
    email: string;
    password: string;
}

export type loggedUserType = {
    email: string;
    password: string;
}

export type selectOptionType = {
    name: string;
    value: string;
}[]

export type HeaderType = {
    headers: {
        "Content-Type": string,
    }
}

export type paymentResponseType = {
  _id: string;
  userId: string;
  subscriptionId: string;
  name: string;
  price: number;
  paidAt: string;
  frequency: string;
  category: string;
  renewalDate: string;
  subLogo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}[]