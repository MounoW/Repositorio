//import { Person } from './types';
import './firebase.ts';

import './App.scss';

interface AppProps {
    value: string;
}

function App({ value }: AppProps) {
    //let p = { name: 'Fábio', age: 21, address: 'abc' } as Person;

    return <div>Hello World! {value}</div>;
}

export default App;
