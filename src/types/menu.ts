import { Url } from "next/dist/shared/lib/router/router";

export type Menu = {
    id:number;
    label:string,
    href:Url;
    // title:string;
    // path?:string;
    newTab:boolean;
    subMenu?:Menu[]
}
