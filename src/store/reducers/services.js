import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await fetch('/api/service');
  const data = await response.json();
  return data;
});

const services = createSlice({
  name: 'services',
  initialState: {
    services: [
      {
        id: '1',
        title: 'Разработка приложений',
        text: 'Специализируемся на создании пользовательских мобильных приложений, обеспечивая надежность и высокую производительность для удовлетворения ваших потребностей.',
        svg: 'webdev1.svg',
        type: 'app'
      },
      {
        id: '2',
        title: 'Разработка сайтов',
        text: 'Наша команда создает современные веб-сайты с адаптивным дизайном, обеспечивая высокую производительность и привлекательность для посетителей.',
        svg: null,
        type: 'website'
      },
      {
        id: '3',
        title: 'Разработка агрегаторов доставки',
        text: 'Предоставляем решения, которые объединяют рестораны, магазины и курьеров в удобной платформе для заказов еды и товаров с минимумом усилий.',
        svg: null,
        type: 'delivery'
      },
      {
        id: '4',
        title: 'Дизайн',
        text: 'Создаем визуальные концепции, подчеркивающие уникальный стиль вашей компании, включая логотипы, брендинг и веб-дизайн.',
        svg: null,
        type: 'design'
      },
      {
        id: '5',
        title: 'CRM системы',
        text: 'Наши CRM-системы автоматизируют процессы продаж, управление клиентской базой данных и улучшают обслуживание клиентов, помогая вашей компании укрепить отношения и увеличить прибыль.',
        svg: 'crmsystems.svg',
        type: 'crm'
      },
      {
        id: '6',
        title: 'Реклама и Seo',
        text: 'Предоставляем решения, которые объединяют рестораны, магазины и курьеров в удобной платформе для заказов еды и товаров с минимумом усилий',
        svg: null,
        type: 'seo'
      }
    ]
  },
  reducers: {
    reviewRequest(state, action) {
      const request = state.find((request) => request.id === action.payload);
      state.find((request) => request.id === action.payload).reviewed = !request.reviewed;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.services = action.payload;
    });
  }
});

export const { reviewRequest } = services.actions;

export default services.reducer;
