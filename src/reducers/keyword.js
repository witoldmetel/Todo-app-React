const keyword = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_TASK':
            return action.payload
    }

    return state
}

export default keyword