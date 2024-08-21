import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setSelectedPost } from '../redux/actions';
import { Post } from '../types';

const GET_POSTS = gql`
  query GetPosts($page: Int, $limit: Int) {
    posts(options: { paginate: { page: $page, limit: $limit } }) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`;

const PostList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { page, limit },
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePostPress = (post: Post) => {
    dispatch(setSelectedPost(post));
    navigation.navigate('PostDetail');
  };

  const loadMorePosts = () => {
    if (data?.posts?.data.length >= data?.posts?.meta.totalCount) return;

    fetchMore({
      variables: {
        page: page + 1,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        setPage(page + 1);
        return {
          posts: {
            ...fetchMoreResult.posts,
            data: [...prevResult.posts.data, ...fetchMoreResult.posts.data],
            meta: fetchMoreResult.posts.meta,
          },
        };
      },
    });
  };

  if (loading && page === 1) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

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
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading && page > 1 ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
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