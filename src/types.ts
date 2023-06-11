export interface Contry {
    contrycode: string,
    contryname: string,
}

export interface Postcodes {
    postcode: number,
    city: string,
}

export interface Member {
    m_id?: number | null,
    name?: string
    adress1?: string | null,
    adress2?: string | null,
    postcode?: string | null,
    city?: string | null,
    country?: string | null,
    phone?: string[] | null,
    mail?: string | null,
    created?: string | null,
}

export type User = {
    uid: string;
    email: string;
    m_id: string;
    groups: string[];
};
