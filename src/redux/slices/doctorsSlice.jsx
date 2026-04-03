import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { employersApi } from "../../api/api";
import { toast } from "react-toastify";

// GET
export const getDoctors = createAsyncThunk(
    "getDoctors",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(employersApi);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// CREATE
export const createDoctor = createAsyncThunk(
    "createDoctor",
    async (newDoctor, { rejectWithValue }) => {
        try {
            const response = await fetch(employersApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDoctor),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            toast.error("Ошибка при добавлении мастера");
            return rejectWithValue(error.message);
        }
    }
);

// UPDATE (через PATCH)
export const updateDoctor = createAsyncThunk(
    "updateDoctor",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${employersApi}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            toast.error("Ошибка при обновлении мастера");
            return rejectWithValue(error.message);
        }
    }
);

// DELETE
export const deleteDoctor = createAsyncThunk(
    "deleteDoctor",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${employersApi}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return id;
        } catch (error) {
            toast.error("Ошибка при удалении мастера");
            return rejectWithValue(error.message);
        }
    }
);

const doctorsSlice = createSlice({
    name: "doctorsSlice",
    initialState: {
        doctors: [],
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            // GET
            .addCase(getDoctors.pending, state => {
                state.loading = true;
            })
            .addCase(getDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = action.payload;
            })
            .addCase(getDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // CREATE
            .addCase(createDoctor.fulfilled, (state, action) => {
                state.doctors.push(action.payload);
                toast.success("Мастер успешно добавлен");
            })

            // UPDATE
            .addCase(updateDoctor.fulfilled, (state, action) => {
                const index = state.doctors.findIndex(doc => doc.id === action.payload.id);
                if (index !== -1) {
                    state.doctors[index] = action.payload;
                }
                toast.success("Мастер успешно обновлён");
            })

            // DELETE
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.doctors = state.doctors.filter(doc => doc.id !== action.payload);
                toast.success("Мастер успешно удалён");
            })

            // Общая ошибка
            .addMatcher(
                action => action.type.endsWith("rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export default doctorsSlice.reducer;
