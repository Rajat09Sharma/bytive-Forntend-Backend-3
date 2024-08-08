import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialIdState = { id: "" };
const idSlice = createSlice({
    name: "id",
    initialState: initialIdState,
    reducers: {
        setId(state, action) {
            state.id = action.payload.id;
        }
    }
});

const initialModalState = { isModalOpen: false };
const modalSlice = createSlice({
    name: "modal",
    initialState: initialModalState,
    reducers: {
        showModal(state) {
            state.isModalOpen = true;
        },
        handleOk(state) {
            state.isModalOpen = false;
        },
        handleCancle(state) {
            state.isModalOpen = false
        }
    }
});


const reFetchInitialState = { isReFetching: false }
const reFetchSlice = createSlice({
    name: "reFetch",
    initialState: reFetchInitialState,
    reducers: {
        handleReFetch(state) {
            state.isReFetching = !state.isReFetching;
        }
    }

});

const store = configureStore({
    reducer: {
        id: idSlice.reducer,
        modal: modalSlice.reducer,
        reFetch: reFetchSlice.reducer,
    }
});



export const idActions = idSlice.actions;
export const modalActions = modalSlice.actions;
export const reFetchActions = reFetchSlice.actions;
export default store;