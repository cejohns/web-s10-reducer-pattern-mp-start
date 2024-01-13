import React, { useReducer } from 'react';

const CHANGE_INPUT = 'CHANGE_INPUT';
const RESET_FORM = 'RESET_FORM';

const initialState = {
  authorName: '',
  quoteText: '',
};

// 👇 create your reducer function here
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};




export default function TodoForm({ createQuote = () => { } }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: CHANGE_INPUT, payload: { name, value } });
  };
  
  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };
  
  const onNewQuote = (e) => {
    e.preventDefault();
    createQuote({ authorName: state.authorName, quoteText: state.quoteText });
    resetForm();
  };
  

  // 👇 some props are missing in the JSX below:
  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
    <h3>New Quote Form</h3>
    <label><span>Author:</span>
      <input
        type='text'
        name='authorName'
        placeholder='type author name'
        value={state.authorName}
        onChange={onChange}
      />
    </label>
    <label><span>Quote text:</span>
      <textarea
        name='quoteText'
        placeholder='type quote'
        value={state.quoteText}
        onChange={onChange}
      />
    </label>
    <button type='submit'>DO IT!</button>
  </form>
  )
}
