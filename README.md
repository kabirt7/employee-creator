# employee-creator

## MVP / Recommendations

We need a web application to create, list, modify and delete employees. The application should consist of a spring RESTful API and a React Typescript frontend. The schema for the employee is left to the criteria of the candidate.

The list can be a local database, CSV, TXT file or even in memory
Implementing an API logging strategy.
Implementing error handling strategy.
At least 3 endpoints are required:
To create an employee
To get a list of existing employees
To delete an employee

React Redux is recommended.
Typescript is recommended.
React hooks are recommended.
React create app is a good starting point.
You can include any other open source NPM library.
Feel free to use your favorite CSS framework.
Feel free to use your favorite middleware.
Add some basic validations on the form like required and max length validations.
The site should be responsive.

## Redux

- React Redux seems to function similarly to useContext React Hook. The application will still be built in TSX with vite. I think I'll need to use Middleware with RR?
- users a new concept of reducers to mutate the state of the Redux 'client-side DB'
- "Context does not automatically optimize re-renders in the same way Redux does. When using Context, components that consume the context will re-render whenever the context value changes, regardless of whether the relevant state actually changed. Redux, on the other hand, employs optimizations such as shallow comparisons to only trigger re-renders when necessary, which can lead to better performance in larger applications."

IMPLEMENTATION
1. ``` install @reduxjs/toolkit react-redux ```
2. Configure store in store.js file. Create global store object. Register your reducers
```js
export const store = configureStore({
reducer: {
pizza: pizzaReducer,
},
});
```
3. 'Provide' the store in App.jsx in a similar way to Context Hook
```jsx
<Provider store={store}>
<App />
</Provider>
```
4. Create a 'slice' with defined reducer logic. Reducers take old state and an action and then define logic required to change the state
```js
export const pizzaSlice = createSlice({
name: 'pizza',
reducers: {
 toggleGluten: (state) => {
state.gluten = !state.gluten
},
addTopping: (state, action) => {
state.toppings = [...state.toppings, action.payload]
},
},
})

export const {toggleGluten, addTopping} = pizzaSlice.actions;

export default pizzaSlice.reducer;
```
5. Add them into a UI component. Need to define useDispatch hook to be able to update the state. DevTools exist for visualisation and debugging.
```jsx
const pizza = useSelector(state => state.pizza);
const dispatch = useDispatch();

return (
<>
<h1>Pizza</h1>

{pizza.toppings.map etc...

<button onClick={() => dispatch(addTopping('pepperoni))}
```

## Planning 

- API has: create employee, list of existing employees, delete employee
- Front-end has: View Employee List (with delete option), Add Employee Form. Routed.

