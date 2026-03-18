import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// CREATE
export const submitRequestToBackend = createAsyncThunk(
    "emoSupportSubmit",
    async (requestData) =>{
        const res = await fetch("http://10.132.112.108:9090/api/requests",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(requestData),
        });
        return res.json();
    }
);

// FETCH
export const fetchRequests = createAsyncThunk(
    "emoSupport/fetch",
    async () =>{
        const res = await fetch("http://10.132.112.108:9090/api/requests");
        return res.json();
    }
);

// DELETE
export const deleteRequestFromBackend = createAsyncThunk(
    "emoSupport/delete",
    async (id) =>{
        await fetch(`http://10.132.112.108:9090/api/requests/${id}`, {
            method:"DELETE",
        })
        return id;
    }
);

// UPDATE STATUS
export const updateRequestStatus = createAsyncThunk(
    "emoSupport/updateStatus",
    async({id, status, acceptedBy})=>{
        const res = await fetch(
            `http://10.132.112.108:9090/api/requests/${id}/status`,
            {
                method:"PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, acceptedBy }),
            }
        );
        if (!res.ok) {
            throw new Error("Failed to update status");
        }
        return res.json();
        
    }
)

// FETCH USER WHO ACCEPTED REQUESTS
export const fetchUserRequests = createAsyncThunk(
  "emoSupport/fetchUserRequests",
  async (username) => {
    const res = await fetch(
      `http://10.132.112.108:9090/api/requests/user/${username}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user requests");
    }

    return res.json();
  }
);

const FeedSlice = createSlice({
    name:"Feed",
    initialState:{
        feed: [],
        filteredFeed:[],
        userFeed:[], // accepted request of logged user
        loading:false,
        requestNotFound:false,
        error: null,
        deletePopId:null,
        isRequestFormOpen:false,
        isrequestButtonShrunk:false,
        lastScrollY:0,

        requestForm:{
            category:"",
            name:"",
            image:"",
            description:"",
            helpingCost:"",
        },
    }, 
    reducers:{
        openRequestForm:(state)=>{
            state.isRequestFormOpen=true;
        },

        closeRequestForm:(state)=>{
            state.isRequestFormOpen=false;
        },

        // handle input change
        updateRequestForm:(state,action)=>{
            const {field, value} = action.payload;
            state.requestForm[field] = value;
        },

        // deleteRequest
        openDeletePopup:(state,action)=>{
            state.deletePopId = action.payload;
        },
        closeDeletePopup:(state)=>{
            state.deletePopId = null;
        },
        requestButtonShrunk:(state)=>{
            state.isrequestButtonShrunk=true;

        },
        // request Button Shrunk on scroll down
        updateScrollState:(state,action)=>{
            const currentScrollY = action.payload;
            if(currentScrollY>state.lastScrollY && currentScrollY>50){
                state.isrequestButtonShrunk=true;
            }else{
                state.isrequestButtonShrunk=false;
            }
            state.lastScrollY=currentScrollY;
        },
        // search request according to description
        searchReqAccToDesc:(state,action)=>{
            const searchText = action.payload.toLowerCase();
            if(searchText===""){
                state.filteredFeed = state.feed;
            } else{
                state.filteredFeed = state.feed.filter(
                (item)=> item.description.toLowerCase().includes(searchText));
            }  
        },
        // search request by category
        searchReqAccToCategory:(state,action)=>{
            const category = action.payload;
            if(category==="All"){
                state.filteredFeed = state.feed;
            } else{
                state.filteredFeed = state.feed.filter((item)=>item.category.toLowerCase().includes(category.toLowerCase()));
            }
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchRequests.fulfilled, (state, action) =>{
            state.loading = false;
            state.feed = Array.isArray(action.payload) ? action.payload : [];
            state.filteredFeed = state.feed;
        })
        .addCase(fetchRequests.rejected, (state,action)=>{
            state.loading = false;
            state.requestNotFound=true;
            state.error = action.payload;
            state.feed = [];
        })
        .addCase(fetchRequests.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(submitRequestToBackend.fulfilled, (state, action) =>{
            state.feed.unshift(action.payload);
            state.filteredFeed = state.feed;
            state.isRequestFormOpen = false;
            state.requestForm = {
                category:"",
                name:"",
                image:"",
                description:"",
            };
        })
        .addCase(submitRequestToBackend.rejected, (state)=>{
            state.isRequestFormOpen = false;
            state.requestNotFound = true;
        })
        .addCase(deleteRequestFromBackend.fulfilled,(state, action)=>{
            state.feed = state.feed.filter(
                (item)=> item.id!==action.payload
            );
            state.deletePopId=null;
        })
        //update request status
        .addCase(updateRequestStatus.fulfilled, (state,action)=>{
            const updatedRequest =action.payload;
            const index = state.feed.findIndex(
                (item)=>item.id===updatedRequest.id
            );
            if(index!==-1){
                state.feed[index]=updatedRequest 
            }
        })
        // FETCH USER WHO ACCEPTED REQUEST
        .addCase(fetchUserRequests.pending, (state) => {
           state.loading = true;
        })
        .addCase(fetchUserRequests.fulfilled, (state, action) => {
           state.loading = false;
           state.userFeed = action.payload;
        })
        .addCase(fetchUserRequests.rejected, (state) => {
           state.loading = false;
           state.error = "Failed to load user requests";
        })
    },
});

export const {
    openRequestForm,
    closeRequestForm,
    updateRequestForm,
    openDeletePopup,
    closeDeletePopup,
    updateScrollState,
    searchReqAccToDesc,
    searchReqAccToCategory
} = FeedSlice.actions;
export default FeedSlice.reducer;