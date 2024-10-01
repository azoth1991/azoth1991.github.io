import { useCallback, useEffect, useState } from "react";
import { gameConfig } from "..";

type CellType = Array<number | null>;
type useGameType = (props: { initData: CellType[] }) => {
  grid: CellType[];
  moveLeft: () => void;
  moveRight: () => void;
  moveUp: () => void;
  moveDown: () => void;
};

const useGame: useGameType = () => {
  const initData = Array(gameConfig.row)
    .fill(0)
    .map(() => Array(gameConfig.column).fill(null));
  const [grid, setGrid] = useState(initData);
  const SIZE = initData.length;
  const [score, setScore] = useState(0);
  const createEmptyGrid = () => {
    return Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(null));
  };

  const addNumber = useCallback(() => {
    const emptyCells = [];
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (grid[row][col] === null) {
          emptyCells.push({ row, col });
        }
      }
    }
    if (emptyCells.length > 0) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      setGrid((grid) => {
        const newGrid = [...grid];

        newGrid[randomCell.row][randomCell.col] = Math.random() > 0.9 ? 4 : 2;

        return newGrid;
      });
    }
  }, [SIZE, grid]);

  const slide = (row: CellType) => {
    const arr = row.filter((val) => val); // 删除空格
    const missing = SIZE - arr.length;
    const zeros = Array(missing).fill(null);
    return [...arr, ...zeros];
  };

  const combine = (row: CellType) => {
    for (let i = 0; i < SIZE - 1; i++) {
      if (row[i] && row[i] === row[i + 1]) {
        row[i]! *= 2;
        row[i + 1] = null;
        setScore((prev) => prev + row[i]!);
      }
    }
    return row;
  };

  const moveLeft = () => {
    const newGrid = grid.map((row) => slide(combine(slide(row))));
    setGrid(newGrid);
    addNumber();
  };

  const rotateGrid = (grid: CellType[]) => {
    const newGrid = createEmptyGrid();
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        newGrid[col][SIZE - 1 - row] = grid[row][col];
      }
    }
    return newGrid;
  };

  const moveRight = () => {
    setGrid((prevGrid) => {
      let newGrid = prevGrid.map((row) => row.reverse());
      newGrid = newGrid.map((row) => slide(combine(slide(row))));
      newGrid = newGrid.map((row) => row.reverse());
      return newGrid;
    });
    addNumber();
  };

  const moveDown = () => {
    setGrid((prevGrid) => {
      let newGrid = rotateGrid(prevGrid);
      newGrid = newGrid.map((row) => slide(combine(slide(row))));
      newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
      return newGrid;
    });
    addNumber();
  };

  const moveUp = () => {
    setGrid((prevGrid) => {
      let newGrid = rotateGrid(prevGrid);
      newGrid = newGrid.map((row) => row.reverse());
      newGrid = newGrid.map((row) => slide(combine(slide(row))));
      newGrid = newGrid.map((row) => row.reverse());
      newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
      return newGrid;
    });
    addNumber();
  };

  useEffect(() => {
    addNumber();
  }, []);

  return { grid, moveLeft, moveRight, moveUp, moveDown, score };
};

export default useGame;
