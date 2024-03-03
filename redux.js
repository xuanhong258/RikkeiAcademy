// import { createStore } from 'https://cdn.skypack.dev/redux';

//////////////////////// MY REDUX ///////////////////////////////////////

function createStore(reducer) {
    let state = reducer(undefined,{});
    const subscribers = [];
    return {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            subscribers.forEach(subscriber => subscriber());
        },
        subscribe(subscriber) {
            subscribers.push(subscriber);
        }
    }
}




//////////////////////// APP ///////////////////////////////////////
const initState = 0;

// Reducer
function reducer(state = initState, action) {
    switch (action.type) {
        case 'DESPOSITE':
            return state + action.payload;
        case 'WITHDRAW':
            return state - action.payload;
        default:
            return state;
    }
}


//Store

const store = window.store = createStore(reducer);


// Action
function acttionDeposit(payload){
    return {
        type: 'DESPOSITE',
        payload
    }
}

function acttionWithdraw(payload){
    return {
        type: 'WITHDRAW',
        payload
    }
}

// Render
function render() {
    const output = document.querySelector('#output');
    output.innerText = store.getState();
}
render(store.getState());

// Event DOM
const depositeBtn = document.querySelector('#deposite');
const withdrawBtn = document.querySelector('#withdraw');

// Event Handler
depositeBtn.onclick = function() {
    store.dispatch(acttionDeposit(10));
}

withdrawBtn.onclick = function() {
    store.dispatch(acttionWithdraw(10));
}

store.subscribe(() => {
    render();
})

