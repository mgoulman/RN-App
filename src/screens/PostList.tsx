import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setSelectedPost } from '../redux/actions';
import { Post } from '../types';

const GET_POSTS = gql`
  query GetPosts {
    posts(options: { paginate: { page: 1, limit: 30 } }) {
      data {
        id
        title
      }
    }
  }
`;

const PostList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handlePostPress = (post: Post) => {
    dispatch(setSelectedPost(post));
    navigation.navigate('PostDetail');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.posts.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handlePostPress(item)}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#dddddd',
    borderWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default PostList;
