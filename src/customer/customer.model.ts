export type InputSetCustomer = {
    id?: string;
    logo?: string;
    name: string;
    shortDes: string;
}

export type InputSetPartner = {
    id?: string;
    logo?: string;
    name: string;
    description: string;
    customerID: string;
}