import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { connect } from "react-redux";
import { addPositionToApplication, removePositionFromApplication } from "../redux/actions";
import { getAppliedPositions } from "../redux/selectors";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
    };

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    

    // change background colour if dragging
    background: "lightgrey",

    // styles we need to apply on draggables
    ...draggableStyle
});


const getListStyle = isDraggingOver => ({
    background: "white",
    padding: grid,
    width: 250
});


class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        //const mylist = [{id: 'item-0',content: 'position 0'},{id: 'item-1',content: 'position 1'},{id: 'item-2',content: 'position 2'}];
        this.state = {
          items: props.positions
        };
        this.onDragEnd = this.onDragEnd.bind(this);
      }

      componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.positionsUpdated !== prevProps.positionsUpdated) {
          console.log("The position update prop is updated");
          console.log("The new possitions are then:", this.props.positions);
          this.state = {
            ...this.state,
            items: this.props.positions
          }
        }
        console.log("The stat is:", this.state)
      }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            { console.log("OUTSIDE OF BOUNDS") }
            const items = [...this.state.items];
            var index = result.source.index
            
            if (index !== -1) {
                const item_id = items[index].id;
                items.splice(index, 1);
                this.setState({ items });
                this.props.removePositionFromApplication(item_id);
            }
          console.log("Ferdig");
          return;
        }
    
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items
        });
    }

    positionColumn() {
        return(
            this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div className="rounded"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={ getItemStyle(snapshot.isDragging, provided.draggableProps.style) }
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))
        );
    }

    render(){
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div className="card w-100"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                          <h5 className="page-title border-bottom ml-3 mt-2">My application</h5>
                          <div className="flex-grid">
                            
                            <div className="col-list w-10 pt-3 mr-2 ">
                              <h5>1</h5>
                              <h5 className="pt-4 mt-3">2</h5>
                              <h5 className="pt-4 mt-3">3</h5>
                            </div>
                            <div className="col-list w-100">
                              { this.positionColumn() }
                            </div>
                          </div>
                            {provided.placeholder}
                            <small style={{textAlign:"center"}}>Apply for one, two or three positions</small>
                            <small style={{textAlign:"center"}}>Simply drag to prioritize them</small>
                            <a type="button" className="btn btn-outline-success ml-auto mr-2 mb-2 mt-2" href='/enterapplication'>Continue</a>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }

}

const mapStateToProps = state => {
  console.log("State:", state.application.positionsUpdated);
  return {
    positions: state.application.positions,
    positionsUpdated: state.application.positionsUpdated
  };
};

export default connect(mapStateToProps, { addPositionToApplication, removePositionFromApplication })(ShoppingCart);