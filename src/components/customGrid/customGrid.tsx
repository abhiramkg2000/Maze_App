import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import CustomBox from "../customBox/customBox";
import CustomButton from "../customButton/customButton";
import CustomSlider from "../customSlider/customSlider";
import MetaData from "../metaData/metaData";

import {
  DEFAULT_GRID_SIZE,
  DEFAULT_BOX_COLOR,
} from "../../constants/constants";
import { BoxItemType } from "../../types/types";

import { createGrid, findPath } from "../../helpers/helpers";

import "./customGrid.css";

const CustomGrid = () => {
  const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);
  const [gridBoxes, setGridBoxes] = useState<BoxItemType[][]>([]);
  const [selectedBoxes, setSelectedBoxes] = useState<BoxItemType[]>([]);
  const [pathArray, setPathArray] = useState<BoxItemType[]>([]);

  const handleClear = () => {
    setGridBoxes((prev) => {
      const formattedArray = prev.map((row) => {
        return row.map((item) => ({
          ...item,
          clicked: false,
          color: DEFAULT_BOX_COLOR,
        }));
      });
      return formattedArray;
    });
    setSelectedBoxes([]);
    setPathArray([]);
  };

  const handleStart = () => {
    setPathArray(findPath(gridBoxes, selectedBoxes) || []);
  };

  useEffect(() => {
    const gridArray = createGrid(gridSize);
    setGridBoxes(gridArray);
    setSelectedBoxes([]);
    setPathArray([]);
  }, [gridSize]);

  return (
    <Box>
      <Box className="slider_group">
        <CustomSlider setGridSize={setGridSize} />
      </Box>
      <Box className="meta_data_group">
        <MetaData />
      </Box>
      <Box className="grid">
        <Grid container columns={gridSize} className="grid_container">
          {gridBoxes?.map((row, i) =>
            row.map((item, j) => (
              <CustomBox
                key={parseInt(i + "" + j)}
                index={parseInt(i + "" + j)}
                item={item}
                setGridBoxes={setGridBoxes}
                gridSize={gridSize}
                selectedBoxes={selectedBoxes}
                setSelectedBoxes={setSelectedBoxes}
                pathArray={pathArray}
              />
            ))
          )}
        </Grid>
      </Box>
      <Box className="button_group">
        <CustomButton handleClick={handleStart}>start</CustomButton>
        <CustomButton handleClick={handleClear}>clear</CustomButton>
      </Box>
    </Box>
  );
};

export default CustomGrid;
