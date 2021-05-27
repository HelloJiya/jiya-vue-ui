import Vue from 'vue'
import { IcsUIComponent, IcsUIComponentSize, IcsUIHorizontalAlignment } from './component'
import { IcsDemo } from './demo'
import { IcsLayout } from './layout'
import { IcsSearchForm } from './search-form'
import { IcsTable } from './table'

export interface InstallationOptions {
  size: string
}

/** The version of ics-ui */
export const version: string

/**
 * Install all ics-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(IcsUI)` to install.
 */
export function install (vue: typeof Vue, options: InstallationOptions): void

/** ElementUI component common definition */
export type Component = IcsUIComponent

/** Component size definition for button, input, etc */
export type ComponentSize = IcsUIComponentSize

/** Horizontal alignment */
export type HorizontalAlignment = IcsUIHorizontalAlignment


/** Demo Component */
export class Demo extends IcsDemo {}

/** Layout Component */
export class Layout extends IcsLayout {}
/** SearchForm Component */
export class SearchForm extends IcsSearchForm {}
/** Table Component */
export class Table extends IcsTable {}
