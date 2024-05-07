import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playerService } from "../../services/Player";

export const addNewPlayer = createAsyncThunk("player/addNew", async (data) => {
    const response = await playerService.postPlayer(data);
    return response.data;
});

export const getOnePlayer = createAsyncThunk("player/getOne", async (id) => {
    const response = await playerService.getPlayer(id);
    return response.data;
});

export const getPlayers = createAsyncThunk("player/getAll", async () => {
    const response = await playerService.getAllPlayers();
    return response.data;
});

export const PlayerSlice = createSlice({
    name: "player",
    initialState: {
        player: null,
        isLoading: false,
        error: null,
        message: "",
        status: "idle",
        players: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewPlayer.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(getPlayers.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(getOnePlayer.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(addNewPlayer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLoading = false;
                state.player = action.payload;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(getPlayers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLoading = false;
                state.players = action.payload;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(getOnePlayer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLoading = false;
                state.player = action.payload;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(addNewPlayer.rejected, (state, action) => {
                state.status = "failed";
                state.isLoading = false;
                state.error = action.error.message || "An error occurred during adding a new player";
                state.player = null;
            })
            .addCase(getOnePlayer.rejected, (state, action) => {
                state.status = "failed";
                state.isLoading = false;
                state.error = action.error.message || "An error occurred during adding a new player";
                state.player = null;
            })
            .addCase(getPlayers.rejected, (state, action) => {
                state.status = "failed";
                state.isLoading = false;
                state.error = action.error.message || "An error occurred during getting players";
                state.players = null;
            });
    },
});

export const selectPlayer = (state) => state.Player.player;
export const selectPlayers = (state) => state.Player.players.players;
export const selectPlayerStatus = (state) => state.Player.status;
export const selectError = (state) => state.Player.error;

export default PlayerSlice.reducer;
