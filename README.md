# Trips logger app (Instagram inspired)

This was made for a class called TDS200, where the exercise's point was to
use React with the ionic framework to build a cross platform app.
The backend was hosted on www.nhost.com with a school license. 

### Backend:
* Nhost: Backend-as-a-Service (BaaS). Offers user management (authentication), file storage and automatic Hasura integration. In many ways similar to Firebase for those who have encountered it before.
* Hasura: Tool for database management and generation of GraphQL based on Postgres tables, as well as simple access control to data (authorization). Is automatically set up by Nhost, so no need to register here.
* Postgres: Relationship database, automatically set up by Nhost and Hasura so no download / setup required.

### Data communication:
* GraphQL: Retrieving data from Nhost.
* REST: Any integrations with other services we find along the way.

### Frontend:
* Ionic: UI components adapted for mobile (Android Material Design and iOS "Cupertino"), native integrations and CLI for project setup.
* React: Logic, routing and condition management.
* Styled-components: For styling React components.

### Mobile:
* Capacitor: Made by Ionic, is an alternative to Cordova. Takes our Web code (written in HTML, CSS and JavaScript with Ionic and React), packages everything into a native app, and displays it in a built-in web browser (WebView). Gives us access to APIs on the phone we do not have access to if we create a regular website, such as Bluetooth, Contacts API and own native integrations.

## Project status
<b>This project is not supported and probably wont work.</b>

## Installation
```bash
$ npm install 

$ ionic serve
or
$ ioniccordovarun <platform>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

