export const Initial_State = {
    token: '',
    auth: sessionStorage.getItem('token'),
    dados: []
}
export const UserReducer = (state, action ) => {
   

    switch(action.type) {

    case 'SETdados':
        return {
            ...state,
            dados: action.payload.dados
        }
        case 'SETauth':
            return {
                ...state,
                auth: action.payload.auth
            }
            case 'SETtoken':
                return {
                ...state,
                token: action.payload.token
                }
                default:
                    return state
    }
}