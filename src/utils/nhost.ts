import nhost from "nhost-js-sdk";

const config = {
    base_url: "\thttps://backend-ytb9qog2.nhost.app",
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export {auth, storage};


/* Til telefon capacitor
import nhost from "nhost-js-sdk";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const config = {
  base_url: "https://backend-xxxx.nhost.app",
  client_storage: Storage,
  client_storage_type: "capacitor",
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };
 */