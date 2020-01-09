import React, { Component } from 'react';

export class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    increment = () => {
        this.setState(state => {
            return { count: state.count + 1 }
        })
    }

    decrement = () => {
        this.setState(state => {
            return { count: state.count - 1 }
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.increment}>+</button>
                <p>Count: {this.state.count}</p>
                <button onClick={this.decrement}>-</button>
            </div>
        )
    }
}



export class Gallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [
                'https://i.ytimg.com/vi/MCn9lL94sxQ/maxresdefault.jpg',
                'http://i.imgur.com/iJoG4Ks.jpg'
            ]
        }
    }

    addImage = () => {
        const imageUrl = window.prompt('Add new image url:');
        this.setState(state => {
            const images = state.images.concat(imageUrl);
            return {
                images
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ width: '200px' }}>
                    {this.state.images.map((imageSrc, idx) => <img src={imageSrc} alt='img' style={{ width: '100%' }} key={idx} />)}
                </div>
                <button onClick={this.addImage}>Add image</button>
            </React.Fragment>
        )
    }
}



export class Canvasv2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colorsPallette: ['red', 'white', 'gray', 'orange', 'green', 'yellow', 'purple'],
            colorMtrx: [
                ['red', 'white', 'gray', 'orange'],
                ['green', 'yellow', 'gray', 'purple'],
                ['red', 'white', 'yellow', 'green'],
                ['red', 'green', 'gray', 'purple']
            ]
        }
    }

    changeColor = (rowIdx, colIdx, color) => {
        this.setState(state => {
            const colorIdx = state.colorsPallette.findIndex(item => item === color);
            const newColor = colorIdx + 1 === state.colorsPallette.length ? state.colorsPallette[0] : state.colorsPallette[colorIdx + 1];
            const colorMtrx = Array.from(state.colorMtrx);
            colorMtrx[rowIdx][colIdx] = newColor;

            return {
                colorMtrx
            }

        });
    }

    render() {
        return (
            this.state.colorMtrx.map((colorArray, rowIdx) => {
                return (
                    <div style={{ display: 'flex' }} key={rowIdx} >
                        {colorArray.map((color, colIdx) => {
                            return (
                                <div
                                    style={{ backgroundColor: color, width: '50px', height: '50px' }}
                                    key={rowIdx.toString() + '' + colIdx.toString()}
                                    onClick={() => this.changeColor(rowIdx, colIdx, color)}
                                ></div>
                            )
                        })}
                    </div>
                )
            })
        )
    }
}



export class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                bySelect: 'all',
                byText: ''
            },
            items: [
                { title: 'Reach 1M', done: true },
                { title: 'Reach 5M', done: false },
                { title: 'Some Todo', done: true }
            ],
            filteredItems: [],
            newItemText: ''
        }
    }

    removeItem = (idx) => {
        this.setState(state => {
            const items = state.items.filter((item, index) => index !== idx);
            console.log(items)
            return {
                items
            }
        })
    }

    toggleItem = (idx) => {
        this.setState(state => {
            const items = Array.from(state.items);
            items[idx].done = !items[idx].done;
            return {
                items
            }

        })
    }


    addSelectFilter = (e) => {
        const filter = e.target.value;
        this.setState(state => {
            return {
                filter: {
                    bySelect: filter,
                    byText: state.filter.byText
                }
            }
        })
    }

    addtextFilter = (e) => {
        const filter = e.target.value;
        this.setState(state => {
            return {
                filter: {
                    byText: filter,
                    bySelect: state.filter.bySelect
                }
            }
        })
    }

    filterItems = () => {
        this.setState(state => {
            const filteredItems = state.items
                .filter(item => {
                    if (state.filter.bySelect === 'complete') return item.done;
                    else if (state.filter.bySelect === 'incomplete') return !item.done;
                    else return item;
                })
                .filter(item => {
                    if (state.filter.byText) return item.title.toLowerCase().includes(state.filter.byText.toLowerCase());
                    else return item;
                })
            return { filteredItems }
        })
    }

    addNewItem = (e) => {
        this.setState(state => {
            const newItem = {
                title: state.newItemText,
                done: false
            }
            const items = [...state.items, newItem]
            return {
                items,
                newItemText: ''
            }
        })
    }

    handleNewItemText = (e) => {
        const newItemText = e.target.value;
        this.setState({ newItemText })
    }

    componentDidMount() {
        this.filterItems();
    }

    componentDidUpdate(props, prevState) {
        if (prevState.filter !== this.state.filter || prevState.items !== this.state.items) this.filterItems();
    }


    render() {
        return (
            <div>
                search for task:
                <input type='text' onChange={this.addtextFilter} />
                filter by completion:
                <select onChange={this.addSelectFilter} >
                    <option value='all'>All</option>
                    <option value='complete'>Complete</option>
                    <option value='incomplete'>Incomplete</option>
                </select>
                <div style={{ margin: '10px' }}>
                    <input type='text' value={this.state.newItemText} onChange={this.handleNewItemText} />
                    <button onClick={this.addNewItem} >Add Todo</button>
                </div>
                <ul style={{ listStyleType: 'none' }}>
                    {this.state.filteredItems.map((item, idx) => {
                        return <li key={idx} >
                            <p onClick={() => this.toggleItem(idx)}
                                style={{ textDecoration: item.done ? 'line-through' : 'none', display: 'inline-block', marginRight: '10px', cursor: 'pointer' }}
                            >{item.title}
                            </p>
                            <button onClick={() => this.removeItem(idx)} >X</button>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}