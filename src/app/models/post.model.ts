export interface Post {
    id:string;
    name:string;
    address:string;
    email:string;
    fono:number;
    confirmacion: boolean,
    idDoc: string;
    name_due?:string;
    address_due?:string;
    email_due?:string;
    fono_due?:number;
    nacionality?:string;
    
}
