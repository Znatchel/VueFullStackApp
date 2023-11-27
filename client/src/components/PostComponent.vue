<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post">Say something....</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a post">
      <button @click="createPost">Post!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="posts" v-for="(post, index) in posts" :key="post._id">
        <div class="created-at">
          {{ `${index + 1}. ${post.createdAt.getDate()}/${post.createdAt.getMonth() + 1}/${post.createdAt.getFullYear()}` }}
        </div>
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template> 

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
    };
  },
  methods: {
    async createPost() {
      try {
        await PostService.insertPost(this.text);
        this.posts = await PostService.getPosts();
        this.text = ''; // Clear the input field after posting
      } catch (err) {
        this.error = err.message;
      }
    },
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.posts {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px;
  margin-bottom: 15px;
}

div.created-at {
  background-color: darkgreen;
  color: white;
  font-size: 13px;
  padding: 5px 15px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
