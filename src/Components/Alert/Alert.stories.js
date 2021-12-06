import '@storybook/html';
import template from './Alert.hbs';

const variants = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'info',
  'warning',
  'danger',
  'contact',
  'brand',
  'gray'
];

const bsEvents = ['closed.bs.alert','close.bs.alert'];

function Alert(params) {
  return template((params));
};

/**
 * For more info on alerts, see See [Bootstrap docs](https://getbootstrap.com/docs/5.0/components/alerts/)
 */
export const Variants = Alert.bind({});

Variants.args = {
  variant: variants[0],
  title: 'Standaard',
  contents: 'Dit is een standaard melding',
  dismissible: false,
  icon: null
};

export const DismissibleAlert = Alert.bind({});

DismissibleAlert.args = {
  variant: variants[0],
  title: 'Sluitbaar',
  contents: 'Dit is een melding die je kan sluiten',
  dismissible: true,
  icon: 'info'
};


export const StatusAlerts = () => {
  return [
    Alert({
      variant: 'warning',
      title: 'Opgelet',
      contents: 'Onderstaande instellingen aanpassen kan ongewenste gevolgen hebben.',
      dismissible: false,
      icon: 'error_outline'
    }),
    Alert({
      variant: 'danger',
      title: 'Fout',
      contents: 'Er is een onbekende fout opgetreden. Probeer het later opnieuw.',
      dismissible: false,
      icon: 'error_outline'
    }),
    Alert({
      variant: 'success',
      title: 'Verzonden',
      contents: 'Uw aanvraag is in behandeling. Wij contacteren u zo snel mogelijk terug',
      dismissible: false,
      icon: 'check'
    })
  ].join('\n');
};

StatusAlerts.args = Variants.args;

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    actions: {
      handles: bsEvents.map(evt => `${evt} .alert`)
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variants
    },
    title: {
      control: 'text'
    },
    icon: {
      control: 'text'
    },
    contents: {
      control: 'text'
    },
    dismissible: {
      control: 'boolean'
    }
  }
};