export interface User {
    firstname?: string,
    lastname?: string,
    email?: string,
    contact?: string,
    password?: string,
    confirmpassword?: string,
    DOB?: string,
    name?: string,
    role?: string,
    isActive?: string,
    profileImg?: string,
    isDeleted?: string,
}
type columnHeader = {
    Header?: string,
    accessor?: string,
}
export interface TableProps {
    columnArr?: Array<columnHeader>[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataArray?: Array<any>[]
}
export class Users {
    // constructor(){
    firstname?: string;
    lastname?: string;
    email?: string;
    contact?: string;
    password?: string;
    confirmpassword?: string;
    DOB?: string;
    name?: string;
    role?: string;
    isActive?: string;
    profileImg?: string;
    isDeleted?: string;
    // }
} 