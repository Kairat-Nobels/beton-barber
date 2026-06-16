import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { barberApi } from '../../api/api'

const savedBarber = localStorage.getItem('currentBarber')

export const getBarbers = createAsyncThunk(
    'barber/getBarbers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(barberApi)

            if (!res.ok) {
                throw new Error('Ошибка загрузки барберов')
            }

            return await res.json()
        } catch (err) {
            toast.error('Ошибка загрузки барберов')
            return rejectWithValue(err.message)
        }
    }
)

export const createBarber = createAsyncThunk(
    'barber/createBarber',
    async (barberData, { rejectWithValue }) => {
        try {
            const res = await fetch(barberApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(barberData),
            })

            if (!res.ok) {
                throw new Error('Ошибка создания барбера')
            }

            const data = await res.json()
            toast.success('Доступ барбера создан')

            return data
        } catch (err) {
            toast.error('Ошибка создания доступа барбера')
            return rejectWithValue(err.message)
        }
    }
)

export const updateBarber = createAsyncThunk(
    'barber/updateBarber',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${barberApi}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })

            if (!res.ok) {
                throw new Error('Ошибка обновления барбера')
            }

            const data = await res.json()
            toast.success('Доступ барбера обновлён')

            return data
        } catch (err) {
            toast.error('Ошибка обновления доступа барбера')
            return rejectWithValue(err.message)
        }
    }
)

export const deleteBarber = createAsyncThunk(
    'barber/deleteBarber',
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${barberApi}/${id}`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                throw new Error('Ошибка удаления барбера')
            }

            toast.success('Доступ барбера удалён')

            return id
        } catch (err) {
            toast.error('Ошибка удаления доступа барбера')
            return rejectWithValue(err.message)
        }
    }
)

export const loginBarber = createAsyncThunk(
    'barber/login',
    async ({ login, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(barberApi)

            if (!res.ok) {
                throw new Error('Ошибка сервера')
            }

            const data = await res.json()

            const barber = data.find(
                b => b.login === login && b.password.toString() === password
            )

            if (!barber) {
                toast.error('Неверный логин или пароль')
                return rejectWithValue('Неверные данные')
            }

            toast.success('Успешный вход!')

            localStorage.setItem('barber', 'true')
            localStorage.setItem('currentBarber', JSON.stringify(barber))

            return barber
        } catch (err) {
            toast.error('Ошибка сервера')
            return rejectWithValue(err.message)
        }
    }
)

export const outBarber = createAsyncThunk(
    'barber/logout',
    async () => {
        localStorage.removeItem('barber')
        localStorage.removeItem('currentBarber')
        toast.success('Вы вышли из кабинета барбера')
        return false
    }
)

const barberSlice = createSlice({
    name: 'barber',

    initialState: {
        valid: localStorage.getItem('barber') === 'true',
        currentBarber: savedBarber ? JSON.parse(savedBarber) : null,

        barbers: [],

        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(getBarbers.pending, state => {
                state.loading = true
                state.error = null
            })

            .addCase(getBarbers.fulfilled, (state, action) => {
                state.loading = false
                state.barbers = action.payload
                state.error = null
            })

            .addCase(getBarbers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(createBarber.pending, state => {
                state.loading = true
                state.error = null
            })

            .addCase(createBarber.fulfilled, (state, action) => {
                state.loading = false
                state.barbers.push(action.payload)
                state.error = null
            })

            .addCase(createBarber.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(updateBarber.pending, state => {
                state.loading = true
                state.error = null
            })

            .addCase(updateBarber.fulfilled, (state, action) => {
                state.loading = false
                state.barbers = state.barbers.map(barber =>
                    barber.id === action.payload.id ? action.payload : barber
                )

                if (state.currentBarber?.id === action.payload.id) {
                    state.currentBarber = action.payload
                    localStorage.setItem(
                        'currentBarber',
                        JSON.stringify(action.payload)
                    )
                }

                state.error = null
            })

            .addCase(updateBarber.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(deleteBarber.pending, state => {
                state.loading = true
                state.error = null
            })

            .addCase(deleteBarber.fulfilled, (state, action) => {
                state.loading = false
                state.barbers = state.barbers.filter(
                    barber => barber.id !== action.payload
                )

                if (state.currentBarber?.id === action.payload) {
                    state.currentBarber = null
                    state.valid = false
                    localStorage.removeItem('barber')
                    localStorage.removeItem('currentBarber')
                }

                state.error = null
            })

            .addCase(deleteBarber.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(loginBarber.pending, state => {
                state.loading = true
                state.error = null
            })

            .addCase(loginBarber.fulfilled, (state, action) => {
                state.loading = false
                state.valid = true
                state.currentBarber = action.payload
                state.error = null
            })

            .addCase(loginBarber.rejected, (state, action) => {
                state.loading = false
                state.valid = false
                state.currentBarber = null
                state.error = action.payload
            })

            .addCase(outBarber.fulfilled, state => {
                state.valid = false
                state.currentBarber = null
                state.loading = false
                state.error = null
            })
    },
})

export default barberSlice.reducer
