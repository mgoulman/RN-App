import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import PostList from './src/screens/PostList';
import PostDetail from './src/screens/PostDetail';
import client from './src/graphql/client';
import store from './src/redux/store';
enableScreens();

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="PostList">
            <Stack.Screen name="PostList" component={PostList} />
            <Stack.Screen name="PostDetail" component={PostDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxProvider>
    </ApolloProvider>
  );
};

export default App;