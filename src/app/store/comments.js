import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentAdd: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemove: (state, action) => {
            state.entities = state.entities.filter(comment => comment._id !== action.payload);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentAdd,
    commentRemove
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const addComments = (userId, data) => async (dispatch, getState) => {
    const { auth: { userId: currentUserId } } = getState().users;
    const comment = {
        ...data,
        _id: nanoid(),
        pageId: userId,
        created_at: Date.now(),
        userId: currentUserId
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentAdd(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const removeComment = (id) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commentRemove(id));
        }
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
