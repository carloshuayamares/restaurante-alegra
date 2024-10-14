import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Opcional, para íconos
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },
});

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
