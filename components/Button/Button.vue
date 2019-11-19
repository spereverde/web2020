<template>
  <button :type="type" :class="`btn btn-${variant}`" :disabled="disabled" :readonly="readonly" :hidden="hidden" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<style>
</style>

<script>
  export const variants = [
    'primary',
    'secondary',
    'tertiary'
  ]
  
  export const types = [
    'button',
    'submit',
    'reset'
  ]
  
  export const states = [
    'disabled',
    'readonly',
    'hidden'
  ]

  export default {
    props: {
      type: {
        default: 'button',
        type: String
      },
      variant: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      hidden: {
        type: Boolean,
        default: false
      }
    }
  }
</script>