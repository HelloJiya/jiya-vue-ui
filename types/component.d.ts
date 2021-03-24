import Vue from 'vue'

/** IcsUI component common definition */
export declare class IcsUIComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type IcsUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type IcsUIHorizontalAlignment = 'left' | 'center' | 'right'
