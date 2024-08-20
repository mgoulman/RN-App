import React from 'react';
import { useSelector } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { Post } from '../types';

const PostDetail: React.FC = () => {
  const selectedPost: Post | null = useSelector((state: { selectedPost: Post | null }) => state.selectedPost);

  if (!selectedPost) {
    return <Text>No post selected</Text>;
  }

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>ID: {selectedPost.id}</Text>
      <Text style={styles.title}>Title: {selectedPost.title}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PostDetail;