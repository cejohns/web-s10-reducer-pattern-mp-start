import React, { useReducer } from 'react'  // 👈 you'll need the reducer hook
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'


// 👇 these are the types of actions that can change state
const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY' // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'     // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'             // 👈 toggles whether to show all or only non-apocryphal

let id = 1
const getNextId = () => id++ // 👈 this is a helper to create new quotes



// 👇 create your initial state object here
// Initial state
const initialState = {
 
  displayAllQuotes: true,    // Whether to show all quotes or only non-apocryphal
  highlightedQuote: 1,    // ID of the currently highlighted quote or null 
  quotes: [ {
    id: getNextId(),
    quoteText: "Don't cry because it's over, smile because it happened.",
    authorName: "Dr. Seuss",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "So many books, so little time.",
    authorName: "Frank Zappa",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "Be yourself; everyone else is already taken.",
    authorName: "Oscar Wilde",
    apocryphal: false,
  },]       // Initial array of quotes
};


const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_QUOTE: {
      const newQuote = {
        id: getNextId(),
        quoteText: action.payload.quoteText,
        authorName: action.payload.authorName,
        apocryphal: false,
      };
      return {
        ...state,
        quotes: [...state.quotes, newQuote],
      };
    } // Added closing brace here

    case DELETE_QUOTE:
      return {
        ...state,
        quotes: state.quotes.filter((quote) => quote.id !== action.payload.id),
      };

    case EDIT_QUOTE_AUTHENTICITY:
      return {
        ...state,
        quotes: state.quotes.map((quote) =>
          quote.id === action.payload.id
            ? { ...quote, apocryphal: !quote.apocryphal }
            : quote
        ),
      };

    case SET_HIGHLIGHTED_QUOTE:
      return {
        ...state,
        highlightedQuoteId: state.highlightedQuoteId === action.payload.id ? null : action.payload.id,
      };

    case TOGGLE_VISIBILITY:
      return {
        ...state,
        showApocryphal: !state.showApocryphal,
      };

    default:
      return state;
  }
};


export default function App() {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  const createQuote = ({ authorName, quoteText }) => {
    dispatch({
      type: CREATE_QUOTE,
      payload: { id: getNextId(), quoteText, authorName, apocryphal: false }
    });
  };
  
  const deleteQuote = (id) => {
    dispatch({ type: DELETE_QUOTE, payload: { id } });
  };
  
  const editQuoteAuthenticity = (id) => {
    dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload: { id } });
  };
  
  const setHighlightedQuote = (id) => {
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: { id } });
  };
  
  const toggleVisibility = () => {
    dispatch({ type: TOGGLE_VISIBILITY });
  };
  return (
    <div id="mp">
      <h2>Module Project</h2>
      {/* Button to toggle visibility */}
      <button onClick={toggleVisibility}>Toggle Visibility of Apocryphal Quotes</button>
      <Quotes
  quotes={state.quotes}
  highlightedQuote={state.highlightedQuote}
  displayAllQuotes={state.displayAllQuotes}
  deleteQuote={deleteQuote}
  editQuoteAuthenticity={editQuoteAuthenticity}
  setHighlightedQuote={setHighlightedQuote}
  toggleVisibility={toggleVisibility}
/>

      <QuoteForm
        createQuote={createQuote}
      />
    </div>
  )
}
