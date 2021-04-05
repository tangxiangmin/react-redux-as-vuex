import ReduxDemo from './reduxDemo'
import VuexDemo from './vuexDemo'
import ToolkitDemo from './toolkitDemo'

function App() {
    return (
        <div className="App">
            <h1>redux demo</h1>
            <ReduxDemo/>
            <h1>redux as vuex</h1>
            <VuexDemo/>
            <h1>toolkit demo</h1>
            <ToolkitDemo/>
        </div>
    );
}

export default App;
