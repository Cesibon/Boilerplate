import { Component } from 'react'

import '@styles/App.css'
import '@styles/scrollbar.css'


interface IAppProps {

}

interface IAppState {

}

class App extends Component<IAppProps, IAppState> {

  unsubscribers: (() => void)[] = []

  constructor(props: IAppProps) {
    super(props)

    this.state = {}

  }

  render() {

    return (
      <div className="App font-sans h-screen w-screen overflow-hidden">
        APP
      </div>
    )
  }

}

export default App
