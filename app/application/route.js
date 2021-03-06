import { isEmpty } from '@ember/utils';
import Route from '@ember/routing/route'

export default Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch(function() {});
  },

  model() {
    return this.store.peekAll('user').get('firstObject');
  },

  actions: {
    signIn(provider) {
      this.get('session').open('firebase', { provider }).then(() => { this.transitionTo('/'); });
    },

    signOut() {
      this.get('session').close().then(() => { this.refresh(); });
    },

    transitionTo(route) {
      // transitionTo(route, id, event) vs transitionTo(route, event)
      const id = arguments.length > 2 ? arguments[1] : null;

      if (isEmpty(id)) {
        this.transitionTo(route);
      } else {
        this.transitionTo(route, id);
      }
    },

    hopTo(url) {
      // TODO make this work with Cordova
      window.location.assign(url);
    }
  }
});
