import React from 'react';

export const Title = ({ text }) => <h1>{text}</h1>;

export const Heading = (props) => {
    const { title, subtitle } = props;
    return (
        <div>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
    );
}

export const ImageView = (props) => {
    const { src, caption } = props;
    return (
        <div>
            <img src={src} alt='img' width='100%' />
            <p>{caption}</p>
        </div>
    );
}

export const SimpleGallery = ({ images }) => {
    return (
        <div>
            {images.map((imageSource, index) => {
                return <img src={imageSource} width='100%' alt='img' key={index} />
            })}
        </div>
    );
}

export const TodoItem = (props) => {
    const { title, done } = props;
    const itemStyle = { textDecoration: done ? 'line-through' : 'none' };
    return (
        <div>
            <p style={itemStyle}>{title}</p>
        </div>
    );
}

export const Framer = (props) => {
    const { caption, color, children } = props;
    return (
        <div>
            <div style={{ backgroundColor: 'black', border: '2px solid ' + color + '', color: 'white' }}>
                {children}
            </div>
            <p>{caption}</p>
        </div>
    )
}

export const SimpleCanvas = ({ data }) => {
    return (
        data.map((colorArray, rowIdx) => {
            return (
                <div style={{ display: 'flex' }} key={rowIdx} >
                    {colorArray.map((color, colIdx) => <div style={{ backgroundColor: color, width: '50px', height: '50px' }} key={colIdx} ></div>)}
                </div>
            )
        })
    )
}

export const SpecialButton = (props) => {
    const { onClick, onSpecialClick, children } = props;
    function catchClick(event) {
        const { metaKey, ctrlKey } = event;
        return metaKey || ctrlKey ? onSpecialClick() : onClick();
    }
    return <button onClick={catchClick} >{children}</button>;
}

export const TodoItem2 = (props) => {
    const { title, completed, onRemove } = props;
    const itemStyle = { textDecoration: completed ? 'line-through' : 'none' };
    function catchClick(event) {
        const { metaKey, ctrlKey } = event;
        if (metaKey || ctrlKey) return onRemove();
        else {
            const conformation = window.confirm('Are you sure???');
            if (conformation) return onRemove();
            else return;
        }
    }
    return (
        <div>
            <p style={itemStyle}>{title}</p>
            <button onClick={catchClick}>🗑</button>
        </div>
    );
}

export const SimpleCanvas2 = (props) => {
    const { data, onCellClick } = props;
    return (
        data.map((colorArray, rowIdx) => {
            return (
                <div style={{ display: 'flex' }} key={rowIdx} >
                    {colorArray.map((color, colIdx) => {
                        return <div
                            style={{ backgroundColor: color, width: '50px', height: '50px' }}
                            key={colIdx}
                            onClick={() => onCellClick(rowIdx, colIdx, color)}
                        ></div>
                    })}
                </div>
            )
        })
    )
}

export const TodoApp = (props) => {
    const { items, onRemove, onAddItem } = props;
    return (
        <div>
            <ul>
                {items.map((item, idx) => {
                    return (
                        <li>
                            <p style={{ textDecoration: item.done ? 'line-through' : 'none' }}>{item.title}</p>
                            <button onClick={() => onRemove(idx)}>Remove Item</button>
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => onAddItem(window.prompt('Add new Item:'))}>Add Item</button>
        </div>
    )
}