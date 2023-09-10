export type Menu = {
    id:number;
    label:string,
    href?:string;
    // title:string;
    // path?:string;
    newTab:boolean;
    subMenu?:Menu[]
}