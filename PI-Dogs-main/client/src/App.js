import './App.css';
import { BrowserRouter,Route,Switch} from "react-router-dom";
import Landing from "./components/Landing";
import Home from"./components/Home"
import DogDetail from "./components/DogDetail"
import CreateDog from "./components/CreateDog"
import NotFound from './components/NotFound';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
    <Route exact path = "/" component = {Landing}/>
    <Route exact path = "/home" component = {Home}/>
    <Route exact path="/dogs" component={DogDetail}/>
    <Route exact path ="/createDog" component={CreateDog}/>
    <Route path = "/dogs/:id" component={DogDetail}/>
    <Route exact path="/About" component={About}/>

    <Route component={NotFound}/>
    </Switch>
        
    </div>
    </BrowserRouter>
  );
}

export default App;
