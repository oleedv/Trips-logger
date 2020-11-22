import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Feed from './pages/Feed';
import detailView from './pages/DetailView';
import {NhostApolloProvider} from "@nhost/react-apollo";
import Login from "./pages/Login";
import {NhostAuthProvider} from "@nhost/react-auth";
import {auth} from "./utils/nhost";
import NewTrip from "./pages/NewTrip";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


const App: React.FC = () => (
    <NhostAuthProvider auth={auth}>
        <NhostApolloProvider auth={auth} gqlEndpoint={`https://hasura-ytb9qog2.nhost.app/v1/graphql`}>
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet>
                        <ProtectedRoute path="/profile" component={Profile} exact={true}/>
                        <ProtectedRoute path="/newtrip" component={NewTrip} exact={true}/>
                        <ProtectedRoute path="/feed" component={Feed} exact={true}/>
                        <ProtectedRoute path="/detailView/:id" component={detailView} exact={true}/>
                        <Route path="/signup" component={Signup} exact={true}/>
                        <Route path="/login" component={Login} exact={true}/>
                        <Route exact path="/" render={() => <Redirect to="/login"/>}/>
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonApp>
        </NhostApolloProvider>
    </NhostAuthProvider>
);

export default App;
