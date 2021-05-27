import { IcsUIComponent } from './component'
import { Route } from 'vue-router';


export interface DropdownList{
  id:[string,number],
  name:string
}

export interface Menus{
  key:string,
  title:string,
  children:Menus[],
  icon?:string
}

export interface Header{
  dropdownList:DropdownList,
  dropdownKey:[string,number]
}

export interface Sidebar{
  defaultActive:string
}

/** Layout Component */
export declare class IcsLayout extends IcsUIComponent {
  showSidebar:boolean
  menus:Menus
  header:Header
  sidebar:Sidebar
  addTagView(route:Route):void
  delTagView(route:Route):void
}
