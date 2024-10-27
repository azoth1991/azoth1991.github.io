import { CSSProperties, ReactNode, useEffect, useMemo } from "react";
import Style from "./index.module.css";
import useGame from "./hook/useGame";
import generateColor from "@/util/generateColor";
export const gameConfig = {
  column: 4,
  row: 4,
};
enum Keyboard {
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
}

const initData = Array(gameConfig.row)
  .fill(0)
  .map(() => Array(gameConfig.column).fill(null));

interface GameStyle extends CSSProperties {
  "--cell-width"?: string;
  "--cell-height"?: string;
}
const Game2048 = () => {
  const { grid, moveLeft, moveRight, moveUp, moveDown } = useGame({
    initData,
  });

  const gameStyle: GameStyle = useMemo(() => {
    return {
      "--cell-width": 100 / gameConfig.column + "%",
      "--cell-height": 100 / gameConfig.row + "%",
    };
  }, []);

  const renderGridCell = useMemo(() => {
    return Array(gameConfig.column * gameConfig.row).fill(
      <div className={Style.gridCell}></div>
    );
  }, []);

  const renderNumberCell = useMemo(() => {
    const cellList: ReactNode[] = [];
    grid.forEach((row) => {
      row.forEach((item) => {
        cellList.push(
          <div
            className={
              Style.numberCell + " " + (item === null ? Style.hide : "")
            }
            style={{
              background: generateColor(Number(item)),
            }}
            key={Math.random()}
          >
            {item !== 0 ? item : ""}
          </div>
        );
      });
    });
    return cellList;
  }, [grid]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.code) {
        case Keyboard.ArrowDown:
          moveDown();
          break;
        case Keyboard.ArrowLeft:
          moveLeft();
          break;
        case Keyboard.ArrowUp:
          moveUp();
          break;
        case Keyboard.ArrowRight:
          moveRight();
          break;
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [moveDown, moveLeft, moveRight, moveUp]);

  return (
    <div className={Style.container} style={gameStyle}>
      <div className={Style.header}></div>
      <div className={Style.board}>
        <div className={Style.number}>{renderNumberCell}</div>
        <div className={Style.grid}>{renderGridCell}</div>
      </div>
    </div>
  );
};

export default Game2048;
