export const NEW_HEXAGON_STATE = "new_hexagon_state";

export interface NewHexagonState {
  type: typeof NEW_HEXAGON_STATE;
  payload: {
    id: string;
    newState: string;
  }
}

export type Actions = NewHexagonState;