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

export type GraphDataType = {
    series: {
        name: string;
        data: any[] //(string | number)[];
    }[];
    xAxis?: {
        categories: (string | number)[];
    };
}