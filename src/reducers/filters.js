export default function filters(state = "SHOW_ALL", action) {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
    }

    return state
}