import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductsProvider} from '../contexts/Products';
import Home from '../screens/Home/Home';

export default function RootNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <ProductsProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ProductsProvider>
  );
}
