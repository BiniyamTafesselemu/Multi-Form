import { Provider } from 'react-redux';
import { store } from './store';
import MultiStepForm from './components/MultiStepForm';
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div style={{ backgroundColor: 'hsl(217, 100%, 97%)' }} className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <MultiStepForm />
        </div>
      </div>
    </Provider>
  );
}

export default App;
