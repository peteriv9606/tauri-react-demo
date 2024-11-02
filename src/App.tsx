import { useState } from 'react';
import './App.css';
import { useWindowEventListener } from './hooks/useWindowEventListener.hook';

type MathAction = 'add' | 'sub';

interface IData {
  action: MathAction;
  number: string;
}

const extractDataFromUrl = (url: string): IData => {
  const data: IData = {} as IData;
  // the url is in the format <app-name>:///?queryParam1=value1&queryParam2=value2..
  const valuablePart = url.split('?')[1]; // this will return ['<app-name>:///', 'queryParam1=value1&queryParam2=value2..', ...]

  if (valuablePart) {
    const queries = valuablePart.split('&'); // this will return ['queryParam1=value', 'queryParam2=value2', ...]

    if (queries.length) {
      // some queries have been passed - determine which ones
      queries.forEach((query) => {
        const [key, value] = query.split('='); // this will return ['queryParam1', 'value1'], 2nd loop - ['queryParam2', 'value2']

        if (['action', 'number'].includes(key)) {
          Object.assign(data, { [key]: value });
        }
      });
    }
  }

  return data;
};

function App() {
  const [total, setTotal] = useState(0);
  const [lastAction, setLastAction] = useState<MathAction | 'none'>('none');
  const [lastNumber, setLastNumber] = useState<string>('-');

  useWindowEventListener('single-instance', async (event) => {
    console.log('single-instance emit detected..');

    const { args: urlArgs } = event.payload as { args: string[] };
    const { action, number } = extractDataFromUrl(urlArgs[1]); // [1] is app arguments (eg '<app-name>://?arg1=one&arg2=two..')

    console.log('current (total):', total, ' incomming action: ', action, ' number: ', number);

    if (!action || !number) {
      console.log('no action or number provided');
      return;
    }

    if (action !== 'add' && action !== 'sub') {
      console.log('incorrect action provided');
      return;
    }

    try {
      const numericInput = Number(number);

      if (action === 'add') {
        setTotal(total + numericInput);
      } else {
        setTotal(total - numericInput);
      }
      setLastAction(action);
    } catch (error) {
      console.log('cannot parse number to a valid numeric value');
      return;
    }
  });

  return (
    <main className="container">
      <p>Total: {total}</p>
      <p>Last action: {lastAction}</p>
      <p>Last number: {lastNumber}</p>
      <button onClick={() => setTotal(0)}>Reset total</button>
      <button onClick={() => setLastAction('none')}>Reset last action</button>
      <button onClick={() => setLastNumber('-')}>Reset last number</button>
    </main>
  );
}

export default App;
