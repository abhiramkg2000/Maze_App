import {
  SELECTED_BOX_COLOR,
  PATH_BOX_COLOR,
  DEFAULT_BOX_COLOR,
} from "../constants/constants";
import { BoxItemType } from "../types/types";

export const createGrid = (gridSize: number): BoxItemType[][] => {
  let gridArray: BoxItemType[][] = [];
  for (let i = 0; i < gridSize; i++) {
    gridArray[i] = [];
    for (let j = 0; j < gridSize; j++) {
      gridArray[i][j] = {
        i: i,
        j: j,
        clicked: false,
        color: DEFAULT_BOX_COLOR,
      };
    }
  }
  return gridArray;
};

export const findPath = (
  gridBoxes: BoxItemType[][],
  seletedBoxes: BoxItemType[]
) => {
  if (seletedBoxes.length === 2) {
    let path: BoxItemType[] = [];

    const startingRow = seletedBoxes[0].i;
    const startingColumn = seletedBoxes[0].j;
    const endingRow = seletedBoxes[1].i;
    const endingColumn = seletedBoxes[1].j;

    let r = startingRow;
    let c = startingColumn;

    path.push(gridBoxes[startingRow][startingColumn]);

    while (r != endingRow || c != endingColumn) {
      // main diagonal
      if (r < endingRow && c < endingColumn) {
        r = r + 1;
        c = c + 1;
        path.push({ ...gridBoxes[r][c], color: PATH_BOX_COLOR });
      }
      // antidiagonal
      else if (r > endingRow && c > endingColumn) {
        r = r - 1;
        c = c - 1;
        path.push({ ...gridBoxes[r][c], color: PATH_BOX_COLOR });
      }
      // top to bottom
      else if (r < endingRow && c === endingColumn) {
        r = r + 1;
        path.push({ ...gridBoxes[r][c], color: PATH_BOX_COLOR });
      }
      // bottom to top
      else if (r > endingRow && c === endingColumn) {
        r = r - 1;
        path.push({ ...gridBoxes[r][c], color: PATH_BOX_COLOR });
      }
      // left to right
      else if (r === endingRow && c < endingColumn) {
        c = c + 1;
        path.push({ ...gridBoxes[r][c], color: PATH_BOX_COLOR });
      }
      // right to left
      else if (r === endingRow && c > endingColumn) {
        c = c - 1;
        path.push({ ...gridBoxes[r][c], color: PATH_BOX_COLOR });
      }
      // r < endingRow && c > endingColumn
      else if (r < endingRow && c > endingColumn) {
        c = c - 1;
        r = r + 1;
        path.push({ ...gridBoxes[r][c], color: PATH_BOX_COLOR });
      }
      // r > endingRow && c < endingColumn
      else if (r > endingRow && c < endingColumn) {
        c = c + 1;
        r = r - 1;
        path.push({ ...gridBoxes[r][c], color: PATH_BOX_COLOR });
      }
    }
    // To change the last box color to SELECTED_BOX_COLOR
    if (r === endingRow && c === endingColumn) {
      path[path.length - 1] = {
        ...path[path.length - 1],
        color: SELECTED_BOX_COLOR,
      };
    }
    return path;
  }
};
