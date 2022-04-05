export type CustomerSetInput = {
    id?: string;
    logo: string;
    name: string;
    shortDes: string;
}

export type PartnerSetInput = {
    id?: string;
    logo: string;
    name: string;
    description: string;
    customerId: string;
}