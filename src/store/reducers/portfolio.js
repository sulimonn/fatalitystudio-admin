// types
import { createSlice } from '@reduxjs/toolkit';

// ==============================|| SLICE - PORTFOLIO ||============================== //

const portfolio = createSlice({
  name: 'portfolio',
  initialState: {
    applications: [],
    webpages: [],
    crm: [],
    developmentDelivery: [],
    design: [],
    seo: []
  },
  reducers: {}
});
