export interface Roles { 
    general?: boolean;
    member?: boolean;
    admin?: boolean;
 }
  
export interface User {
    uid: string;
    name:string;
    email: string;
    roles: Roles;
}