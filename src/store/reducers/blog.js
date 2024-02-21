import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAuth } from 'hooks/use-auth';

export const fetchBlog = createAsyncThunk('blog/fetchBlog', async () => {
  const response = await fetch('/api/blog');
  const data = await response.json();
  return data;
});

export const addArticle = createAsyncThunk('blog/addArticle', async (article) => {
  console.log(article);
  try {
    const { token } = useAuth();
    const response = await axios.post('/api/blog', article, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    status: null,
    error: null
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action) => {
      console.log(state, action);
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return { ...post, ...action.payload };
        }
        return post;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlog.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        addPost(payload);
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  }
});

export const { addPost, removePost, updatePost } = blogSlice.actions;

export default blogSlice.reducer;
