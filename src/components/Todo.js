import React, { useState, useEffect } from 'react';
import './style.css';

const getlocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

const Todo = () => {
    const [inputData, setinputData] = useState("");
    const [items, setItems] = useState(getlocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toogleBtn, setToogleBtn] = useState(false);

    const addItem = () => {
        if (!inputData) {
            alert("Please Fill the Data");
        } else if (inputData && toogleBtn) {
            setItems(
                items.map((currentElement) => {
                    if (currentElement.id === isEditItem) {
                        return { ...currentElement, name: inputData }
                    }
                    return currentElement;
                })
            )
            setinputData("");
            setIsEditItem("");
            setToogleBtn(false);
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items, myNewInputData]);
            setinputData("");
        }
    };

    const editItem = (index) => {
        const item_todo_edited = items.find((currentElement) => {
            return currentElement.id === index;
        });
        setinputData(item_todo_edited.name);
        setIsEditItem(index);
        setToogleBtn(true);
    };

    const deleteItem = (index) => {
        const updatedItems = items.filter((currentElement) => {
            console.log(currentElement.id !== index);
            return currentElement.id !== index;
        });
        setItems(updatedItems);
    };

    const removeAll = () => {
        setItems([]);
    };

    // Adding LocalStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todoLogo" />
                        <figcaption>Add your List Here ✌️</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" className='form-control' placeholder='✍️ Add Item' value={inputData} onChange={(event) => { setinputData(event.target.value) }} />
                        {toogleBtn ? (
                            <i className="far fa-solid fa-edit add-btn" onClick={addItem} ></i>
                        ) : (
                            <i className="fa fa-solid fa-plus add-btn" onClick={addItem} ></i>
                        )
                        }
                    </div>

                    {/* Show our Items */}
                    <div className="showItems">
                        {items.map((currentItem) => {
                            return (
                                <div className="eachItem" key={currentItem.id}>
                                    <h3>{currentItem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-solid fa-edit add-btn" onClick={() => editItem(currentItem.id)} ></i>
                                        <i className="far fa-solid fa-trash-alt add-btn" onClick={() => deleteItem(currentItem.id)} ></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll} >
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Todo;