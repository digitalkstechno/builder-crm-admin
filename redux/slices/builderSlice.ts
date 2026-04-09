import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  _id: string;
  fullName?: string;
  email: string;
  phone: string;
  status: string;
}

export interface Subscription {
  _id: string;
  planId: string;
  planName: string;
  startDate: string;
  endDate: string;
  amountPaid: number;
  noOfStaff: number;
  noOfSites: number;
  noOfWhatsapp: number;
  status: 'active' | 'upcoming' | 'expired' | 'cancelled';
}

export interface Builder {
  _id: string;
  userId: User;
  companyName?: string;
  address?: string;
  currentLimits: {
    noOfStaff: number;
    noOfSites: number;
    noOfWhatsapp: number;
  };
  subscriptions: Subscription[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BuilderState {
  builders: Builder[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  } | null;
}

const initialState: BuilderState = {
  builders: [],
  loading: false,
  error: null,
  pagination: null,
};

export const fetchAllBuilders = createAsyncThunk(
  'builder/fetchAllBuilders',
  async ({ page = 1, search = '' }: { page?: number; search?: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/builder/all?page=${page}&search=${search}&limit=10`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch builders');
    }
  }
);

export const createBuilder = createAsyncThunk(
  'builder/createBuilder',
  async (builderData: {
    fullName?: string;
    email: string;
    phone: string;
    password?: string;
    companyName?: string;
    address?: string;
    planId: string;
    amountPaid?: number;
  }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/builders`,
        builderData,
        {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create builder');
    }
  }
);

export const updateBuilder = createAsyncThunk(
  'builder/updateBuilder',
  async ({
    id,
    builderData
  }: {
    id: string;
    builderData: Partial<{
      fullName: string;
      email: string;
      phone: string;
      companyName: string;
      address: string;
      isActive: boolean;
      planId: string;
      amountPaid: number;
    }>;
  }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/builders/${id}`,
        builderData,
        {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update builder');
    }
  }
);

export const deleteBuilder = createAsyncThunk(
  'builder/deleteBuilder',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/builders/${id}`,
        {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
        }
      );
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete builder');
    }
  }
);

export const getBuilderById = createAsyncThunk(
  'builder/getBuilderById',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/builders/${id}`,
        {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch builder');
    }
  }
);

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBuilders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBuilders.fulfilled, (state, action) => {
        state.loading = false;
        state.builders = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllBuilders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createBuilder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBuilder.fulfilled, (state, action) => {
        state.loading = false;
        state.builders.unshift(action.payload.data);
        if (state.pagination) {
          state.pagination.totalItems += 1;
        }
      })
      .addCase(createBuilder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBuilder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBuilder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.builders.findIndex(b => b._id === action.payload.data._id);
        if (index !== -1) {
          state.builders[index] = action.payload.data;
        }
      })
      .addCase(updateBuilder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBuilder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBuilder.fulfilled, (state, action) => {
        state.loading = false;
        state.builders = state.builders.filter(b => b._id !== action.payload);
        if (state.pagination) {
          state.pagination.totalItems -= 1;
        }
      })
      .addCase(deleteBuilder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default builderSlice.reducer;
