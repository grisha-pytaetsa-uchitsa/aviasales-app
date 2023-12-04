/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

export const fetchGetTickets = createAsyncThunk('filter/fetchGetTickets', async (_, { rejectWithValue, dispatch }) => {
  if (!localStorage.getItem('searchId')) {
    const response = await fetch('https://aviasales-test-api.kata.academy/search');
    await response.json().then((res) => localStorage.setItem('searchId', ...Object.values(res)));
  }

  const { searchId } = localStorage;

  const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Warning! Error, reload this page! Nadeus i seychas status 500, a ne cho-to postrashnee');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(rejectWithValue(err.message));
    dispatch(fetchGetTickets());
  }
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: [
      { label: 'Все', active: false, id: nanoid() },
      { label: 'Без пересадок', active: false, id: nanoid() },
      { label: '1 пересадка', active: false, id: nanoid() },
      { label: '2 пересадки', active: false, id: nanoid() },
      { label: '3 пересадки', active: false, id: nanoid() },
    ],
    sortingBtn: [
      { label: 'самый дешевый', active: true, id: nanoid() },
      { label: 'самый быстрый', active: false, id: nanoid() },
      { label: 'оптимальный', active: false, id: nanoid() },
    ],
    tickets: [],
    status: null,
    error: null,
    stop: 0,
  },
  reducers: {
    toggleCheckbox(state, action) {
      const toggledCheckbox = state.filter.find((el) => el.id === action.payload.id);
      if (toggledCheckbox.label === 'Все' && !toggledCheckbox.active) {
        state.filter.forEach((el) => (el.active = true));
      } else if (toggledCheckbox.label === 'Все' && toggledCheckbox.active) {
        state.filter.forEach((el) => (el.active = false));
      } else if (state.filter[0].active && toggledCheckbox.label !== 'Все') {
        state.filter[0].active = false;
        toggledCheckbox.active = !toggledCheckbox.active;
      } else {
        toggledCheckbox.active = !toggledCheckbox.active;
      }
      if (state.filter[1].active && state.filter[2].active && state.filter[3].active && state.filter[4].active) {
        state.filter[0].active = true;
      }
    },
    toggleTab(state, action) {
      state.sortingBtn.forEach((el) => (el.active = false));
      const toggledTab = state.sortingBtn.find((el) => el.id === action.payload.id);
      toggledTab.active = !toggledTab.active;
    },
  },
  extraReducers: {
    [fetchGetTickets.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchGetTickets.fulfilled]: (state, action) => {
      state.status = 'resolved';
      try {
        state.tickets.push(...action.payload.tickets);
        if (!action.payload.stop) {
          state.stop += 1;
        } else {
          state.stop = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    [fetchGetTickets.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { toggleCheckbox, toggleTab } = filterSlice.actions;

export default filterSlice.reducer;
