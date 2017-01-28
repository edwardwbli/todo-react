var gun = Gun(location.origin + '/gun'); /*location.origin will be host name, such as http://localhost:8080/*/

var PopBox = React.createClass({
  getInitialState() {
    var board = gun.get('board');
    return {board:board};
  },
  onSubmit(e) {
    console.log(this.item.value);
    this.state.board.path(this.item.value).put(this.item.value);
  },
  render() {
    return (
      <div id="popup1" className="overlay">
        <div className="popup">
          <h2>Here i am</h2>
          <a className="close" href="#">&times;</a>
          <div className="content">
            <form onSubmit={this.onSubmit}>
              <label>BoardName:
                <input type="text" ref={(item)=>{this.item = item;}}></input>
              </label>
            </form>

          </div>
        </div>
      </div>
    );
  }
});

var Tdkbapp = React.createClass({
  getInitialState(){
    var board = gun.get('board');
    return {board:board,items:{}}
  },
  componentDidMount(){
    console.log(this.board);
    this.state.board.map((value,id) => {
      let items = Object.assign({}, this.state.items, {[id]: value});
      this.setState({items: items});
    });
  },
  render(){
    let items = Object.keys(this.state.items).map(i =>
      this.state.items[i] ? (
        <div className="boarditems" key={i}>
          <h2>{this.state.items[i]}</h2>
          <br/>
        </div> ): ''

      );
      return (
        <div className="container">
          <div className="box">
            <a className="btn btn-default btn-lg" href="#popup1">+Add Board</a>
          </div>
          {items}
        </div>
      );
    }
  }
);


var todo = gun.get('todo');

var TodoElem = React.createClass({
  getInitialState(){ return {items: {}} },
  componentDidMount(){
    todo.map((value,id) => {
      let items = Object.assign({}, this.state.items, {[id]: value});
      this.setState({items: items});
    });
  },
  onSubmit(e){
    e.preventDefault();
    todo.path(Gun.text.random()).put(this.item.value);
    console.log('adding', this.item.value);
    this.item.value = "";
  },
  onClick(i) {
    console.log('delete ' + i);
    todo.path(i).put(null);

  },
  /*
  onClick(e) {
  console.log('delete ' + e.currentTarget.id )
  todo.path(e.currentTarget.id).put(nul)
  },
  */
  render() {
    /*bind event of this, then the handler can get the corresponding element and its argv*/
    /*React component methods may only be bound to the component instance. in this case onClick is React
    component methods,
    /*there is alternative which is using e.currentTarget.id in onClick method to refer to current DOM node's id
    , without bind for this.onClick, for example :

    this.state.items[i] ?
    React.createElement("li", {key: i}, this.state.items[i],
    React.createElement("span", {id: i, onClick: this.onClick}, " X" )) : ''

    */
    let items = Object.keys(this.state.items).map(i =>
      this.state.items[i] ? (
        <li key={i}>{this.state.items[i]}
          <span id={i} onClick={this.onClick.bind(this,i)}>X</span>
        </li>) : ''

      );
      /*ref: will help to create a reference to element itself, e.g. */
      return (
        <div className="todocontent">
          <h1>TODO</h1>
          <form onSubmit={this.onSubmit}>
            <input ref={(item)=>{this.item =item;}}></input>
            <input type="submit" value="add"></input>
            <ul>
              {items}
            </ul>
          </form>
        </div>

      );
    }
  });


  var inprogress = gun.get('inprogress');

  var InprogressElem = React.createClass({
    getInitialState(){ return {items: {}} },
    componentDidMount(){
      inprogress.map((value,id) => {
        let items = Object.assign({}, this.state.items, {[id]: value});
        this.setState({items});
      });
    },
    onSubmit(e){
      e.preventDefault();
      inprogress.path(Gun.text.random()).put(this.item.value);
      console.log('adding', this.item.value);
    },
    onClick(i) {
      console.log('inprogrss delete ' + i);
      inprogress.path(i).put(null);

    },
    render(){
      let items = Object.keys(this.state.items).map(i =>
        this.state.items[i] ?
        (
          <li key={i}>{this.state.items[i]}
            <span id={i} onClick={this.onClick.bind(this,i)}>X</span>

          </li>
        ) : ''


      );
      return (
        <div className="inprogresscontent">
          <h1>In Progress</h1>
          <form onSubmit={this.onSubmit}>
            <input ref={(item)=>{this.item =item;}}></input>
            <input type="submit" value="add"></input>
            <ul>
              {items}
            </ul>
          </form>
        </div>);
      }
    });


    ReactDOM.render(
      <div id="root">
        <PopBox />
        <Tdkbapp />
      </div>
      ,
      document.getElementById("tdkb")
    );
