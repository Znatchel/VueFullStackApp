import axios from 'axios';

const url = 'api/posts';

class PostService {
  // Get posts
  static getPosts() {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(res => {
          const data = res.data;
          resolve(
            data.map(post => ({
              ...post,
              createdAt: new Date(post.createdAt)
            }))
          );
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  // Create posts
  static insertPost(text) {
    return axios.post(url, { text });
  }
}

export default PostService;