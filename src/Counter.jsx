import { useState } from 'react';
function Counter() {
  // создаём state: count = текущее значение, setCount = функция для изменения
  const [count, setCount] = useState(0);
 const [count1, setCount1] = useState(0);
  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={() => setCount(c => c + 5)}>Увеличить</button><br />
       <button onClick={() => setCount(c => c - 5)}>Ументшить</button>
        <p>Вы нажали {count1} раз </p>
         <button onClick={() => setCount1(c => c + 1)}>Нажми меня</button><br />
         <button onClick={() => {setCount(0); setCount1(0)} }>RESET</button>
    </div>
  );
}

export default Counter;
