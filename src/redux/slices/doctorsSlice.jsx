import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { employersApi, barberApi } from "../../api/api"
import { toast } from "react-toastify"

const makeLogin = (name = "") => {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
}

// GET
export const getDoctors = createAsyncThunk(
    "getDoctors",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(employersApi)

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// CREATE
export const createDoctor = createAsyncThunk(
    "createDoctor",
    async (newDoctor, { rejectWithValue }) => {
        try {
            const doctorResponse = await fetch(employersApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDoctor),
            })

            if (!doctorResponse.ok) {
                throw new Error(`Error: ${doctorResponse.status}`)
            }

            const createdDoctor = await doctorResponse.json()

            const barberAccess = {
                employeeId: createdDoctor.id,
                name: createdDoctor.name,
                login: makeLogin(createdDoctor.name),
                password: "barber",
                post: createdDoctor.post,
            }

            const barberResponse = await fetch(barberApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(barberAccess),
            })

            if (!barberResponse.ok) {
                throw new Error(`Barber access error: ${barberResponse.status}`)
            }

            return createdDoctor
        } catch (error) {
            toast.error("Ошибка при добавлении мастера")
            return rejectWithValue(error.message)
        }
    }
)

// UPDATE
export const updateDoctor = createAsyncThunk(
    "updateDoctor",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const doctorResponse = await fetch(`${employersApi}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            })

            if (!doctorResponse.ok) {
                throw new Error(`Error: ${doctorResponse.status}`)
            }

            const updatedDoctor = await doctorResponse.json()

            const barbersResponse = await fetch(barberApi)

            if (!barbersResponse.ok) {
                throw new Error(`Barbers load error: ${barbersResponse.status}`)
            }

            const barbers = await barbersResponse.json()
            const relatedBarber = barbers.find(
                barber => barber.employeeId === updatedDoctor.id
            )

            const barberAccess = {
                employeeId: updatedDoctor.id,
                name: updatedDoctor.name,
                login: makeLogin(updatedDoctor.name),
                password: "barber",
                post: updatedDoctor.post,
            }

            if (relatedBarber) {
                const updateBarberResponse = await fetch(`${barberApi}/${relatedBarber.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(barberAccess),
                })

                if (!updateBarberResponse.ok) {
                    throw new Error(`Barber update error: ${updateBarberResponse.status}`)
                }
            } else {
                const createBarberResponse = await fetch(barberApi, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(barberAccess),
                })

                if (!createBarberResponse.ok) {
                    throw new Error(`Barber create error: ${createBarberResponse.status}`)
                }
            }

            return updatedDoctor
        } catch (error) {
            toast.error("Ошибка при обновлении мастера")
            return rejectWithValue(error.message)
        }
    }
)

// DELETE
export const deleteDoctor = createAsyncThunk(
    "deleteDoctor",
    async (id, { rejectWithValue }) => {
        try {
            const barbersResponse = await fetch(barberApi)

            if (!barbersResponse.ok) {
                throw new Error(`Barbers load error: ${barbersResponse.status}`)
            }

            const barbers = await barbersResponse.json()
            const relatedBarber = barbers.find(
                barber => barber.employeeId === id
            )

            if (relatedBarber) {
                const deleteBarberResponse = await fetch(`${barberApi}/${relatedBarber.id}`, {
                    method: "DELETE",
                })

                if (!deleteBarberResponse.ok) {
                    throw new Error(`Barber delete error: ${deleteBarberResponse.status}`)
                }
            }

            const doctorResponse = await fetch(`${employersApi}/${id}`, {
                method: "DELETE",
            })

            if (!doctorResponse.ok) {
                throw new Error(`Error: ${doctorResponse.status}`)
            }

            return id
        } catch (error) {
            toast.error("Ошибка при удалении мастера")
            return rejectWithValue(error.message)
        }
    }
)

const doctorsSlice = createSlice({
    name: "doctorsSlice",

    initialState: {
        doctors: [],
        loading: false,
        error: null,
    },

    extraReducers: builder => {
        builder
            .addCase(getDoctors.pending, state => {
                state.loading = true
                state.error = null
            })

            .addCase(getDoctors.fulfilled, (state, action) => {
                state.loading = false
                state.doctors = action.payload
                state.error = null
            })

            .addCase(getDoctors.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(createDoctor.pending, state => {
                state.loading = true
                state.error = null
            })

            .addCase(createDoctor.fulfilled, (state, action) => {
                state.loading = false
                state.doctors.push(action.payload)
                state.error = null
                toast.success("Мастер успешно добавлен")
            })

            .addCase(createDoctor.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(updateDoctor.pending, state => {
                state.loading = true
                state.error = null
            })

            .addCase(updateDoctor.fulfilled, (state, action) => {
                state.loading = false

                const index = state.doctors.findIndex(
                    doc => doc.id === action.payload.id
                )

                if (index !== -1) {
                    state.doctors[index] = action.payload
                }

                state.error = null
                toast.success("Мастер успешно обновлён")
            })

            .addCase(updateDoctor.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(deleteDoctor.pending, state => {
                state.loading = true
                state.error = null
            })

            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.loading = false
                state.doctors = state.doctors.filter(
                    doc => doc.id !== action.payload
                )
                state.error = null
                toast.success("Мастер успешно удалён")
            })

            .addCase(deleteDoctor.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default doctorsSlice.reducer
