import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  // console.log(state, action)
  if (action.type==='VOTE') {
    const old = state.filter(a => a.id !==action.id)
    const voted = state.find(a => a.id === action.id)

    return [...old, { ...voted} ]
  }
  if (action.type === 'CREATE') {
    return [...state, action.data]
  }
  if (action.type === 'INIT_ANECDOTES'){
    return action.data
  }

  return state
}
export const createAnecdote = (data) => {

  return async (dispatch) => {
    const anecdotes = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      data: anecdotes
    })

  }
}
export const anecdoteInitialization = (data) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
    
  }
}
export const voteCreator = (data) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.addVote(data)
    dispatch({
      type: 'VOTE',
      data: anecdote,
      id: anecdote.id
    })
  }
}

export default reducer