import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button, { variants, types } from './Button';

const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs);
stories.add('Button', () => ({
  components: { Button },
  props: {
    typeValue: { default: select('Type', types, types[0]) },
    textValue: { default: text('Text', 'Download') },
    variantValue: { default: select('Variant', variants, variants[0]) },
    hidden: { default: boolean('Hidden', false) },
    readonly: { default: boolean('Read-only', false) },
    disabled: { default: boolean('Disabled', false) }
  },
  methods: { clickAction: action('click') },
  template: `<Button :type="typeValue" :variant="variantValue" @click="clickAction" :hidden="hidden" :disabled="disabled" :readonly="readonly">{{ textValue }}</Button>`
}));