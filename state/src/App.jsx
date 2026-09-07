import { useState } from 'react';
import './App.css';

const COLORS = ['pink', 'green', 'blue', 'yellow', 'purple'];

function App() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
  const [numberOfChange,setNumberOfChange]=useState(0);

  const onButtonClick = (color) => () => {
    setBackgroundColor(color);
    setNumberOfChange(numberOfChange+1);
  };

  return (
    <section>
    <div
      className="App"
      style={{
        backgroundColor,
      }}
    >
      {COLORS.map((color) => (
        <button
          type="button"
          key={color}
          onClick={onButtonClick(color)}
          className={backgroundColor === color ? 'selected' : ''}
        >
          {color}
        </button>
      ))}
      <h1 className='numberOfChange'>Background color changed: {numberOfChange}</h1>
    </div>
    </section>
  );
}

export default App;
