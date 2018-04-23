const filters = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter
    }

    return state
}

export default filters