import './List.css';
import React, { Component } from 'react'

export default class List extends Component {
    state = {
        list: [],
        filterType: 1,
        isHovered: {},
        checked: {}
    }

    addItem = (event) => {
        if (event.code === "Enter") {
            let list = [...this.state.list]
            list.push({ id: list.length, text: event.target.value, isActive: true, isCompleted: false })
            this.setState({ list })
            event.target.value = ""
        }
    }

    deleteItem = (index) => {
        let list = [...this.state.list]
        list.splice(index, 1)
        this.setState({ list })
    }

    clearCompletedList = () => {
        let list = [...this.state.list]
        let completedItems = []
        list.forEach((item, index) => {
            if (item.isCompleted) {
                completedItems.push(index)
            }
        })
        completedItems.forEach(item => {
            list.splice(item, 1)
        })
        this.setState({list})
    }

    completeTask = (id, value) => {
        let list = [...this.state.list]
        list.forEach(item => {
            if (item.id === id) {
                item.isCompleted = value
                item.isActive = !value
            }
        })
        this.setState(list)
    }

    handleMouseEnter = index => {
        this.setState(prevState => {
            return { isHovered: { ...prevState.isHovered, [index]: true } };
        });
    };

    handleMouseLeave = index => {
        this.setState(prevState => {
            return { isHovered: { ...prevState.isHovered, [index]: false } };
        });
    };

    setFilterType = (filterType) => this.setState({ filterType })

    getActiveCount = () => this.state.list.filter(item => item.isActive === true).length

    getFilterData = () => {
        let {filterType, list} = this.state
        if(filterType === 1) {
            return list 
        }
        else if(filterType === 2) {
            return list.filter(item => item.isActive === true)
        }
        else {
            return list.filter(item => item.isCompleted === true)
        }
    }

    render() {
        return (
            <div className="container flex-box">
                <div className="header">
                    My List
                </div>
                <div className="funs flex-box">
                    <div>{this.getActiveCount()} items remaining</div>
                    <div className="filters">
                        <span className={"hover-color " + (this.state.filterType === 1 ? "active" : "")} onClick={() => {
                            this.setFilterType(1)
                        }}>ALL</span>
                        <span className={"hover-color " + (this.state.filterType === 2 ? "active" : "")} onClick={() => {
                            this.setFilterType(2)
                        }}> ACTIVE</span>
                        <span className={"hover-color " + (this.state.filterType === 3 ? "active" : "")} onClick={() => {
                            this.setFilterType(3)
                        }}>COMPLTED</span>
                    </div>
                    <div className="hover-color" onClick = {this.clearCompletedList}>CLEAR COMPLTED</div>
                </div>
                <div className="list">
                    <input className="list-item" placeholder="What needs to be done?" onKeyDown={this.addItem} />
                    {
                        this.getFilterData().map((item, index) => (
                            <div key={item.id} className="list-item flex-box"
                                onMouseEnter={() => this.handleMouseEnter(index)}
                                onMouseLeave={() => this.handleMouseLeave(index)}>

                                <div>
                                    <label className="checkbox-container">
                                        <input type="checkbox"checked = {item.isCompleted} onChange={(e) => { this.completeTask(item.id, e.target.checked) }} />
                                        <span className="checkmark"></span>
                                    </label>
                                    <div className="list-text">{item.text}</div>
                                </div>
                                {
                                    this.state.isHovered[index] &&
                                    <div className="close-icon" onClick={() => { this.deleteItem(index) }}>x</div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

