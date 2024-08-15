import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Historyal from './components/History';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GastoProvider } from './components/MoneyProvaider';

const Drawer = createDrawerNavigator();
//const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GastoProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Drawer.Screen name="History" component={Historyal} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GastoProvider>
  );
};
