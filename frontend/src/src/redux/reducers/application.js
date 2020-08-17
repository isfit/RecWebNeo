import { ADD_POSITION, REMOVE_POSITION, PRIORITIZE_POSITION, DEPRIORITIZE_POSITION } from '../actionTypes';

const initialState = {
    positions: JSON.parse(localStorage.getItem('applicationPositions') || "[]"),
    positionsUpdated: false
};

const Application = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POSITION: {
            console.log("Hello");
            const { positionId, positionName } = action.payload;
            const position = {
                id: positionId,
                content: positionName,
            }
            if (state.positions.length < 3 && !state.positions.some(x => x.id == positionId)) {
                let pos = state.positions;
                pos.push(position)
                localStorage.setItem("applicationPositions", JSON.stringify(pos));
                return {
                    ...state,
                    positions: pos,
                    positionsUpdated: !state.positionsUpdated
                };
            } else {
                return state;
            }
        };

        case PRIORITIZE_POSITION: {
            const { positionId } = action.payload;
            const index = state.positions.findIndex(x => x.id == positionId);
            console.log("Index", index);
            if (index > 0) {
                const newPositionsPri = state.positions;
                const position = newPositionsPri.splice(index, 1)[0];
                newPositionsPri.splice(index-1, 0, position);
                localStorage.setItem("applicationPositions", JSON.stringify(newPositionsPri));
                return {
                    ...state,
                    positions: newPositionsPri,
                    positionsUpdated: !state.positionsUpdated
                };
            }
            return state;
        };

        case DEPRIORITIZE_POSITION: {
            const { positionId } = action.payload;
            const index = state.positions.findIndex(x => x.id == positionId);
            console.log("Index", index);
            if (index < 3) {
                const newPositionsPri = state.positions;
                const position = newPositionsPri.splice(index, 1)[0];
                newPositionsPri.splice(index+1, 0, position);
                localStorage.setItem("applicationPositions", JSON.stringify(newPositionsPri));
                return {
                    ...state,
                    positions: newPositionsPri,
                    positionsUpdated: !state.positionsUpdated
                };
            }
            return state;
        };

        case REMOVE_POSITION: {
            const { positionId } = action.payload;
            if (state.positions.length > 0) {
                let pos = [];
                state.positions.forEach(x => {
                    if (x.id != positionId) {
                        pos.push(x)
                    }
                });
                localStorage.setItem("applicationPositions", JSON.stringify(pos));
                return {
                    ...state,
                    positions: pos,
                    positionsUpdated: !state.positionsUpdated
                };
            } else {
                return state;
            }
        };

        default:
            return state;
    }
}

export default Application;