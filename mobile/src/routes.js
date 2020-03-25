import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';


import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen: Main,
            navigationOptions: {
                title:'Wadev'
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor:'#111',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: 'rgba(56, 56, 134, 0.589)'
            }
        }
    })
);

export default Routes;
