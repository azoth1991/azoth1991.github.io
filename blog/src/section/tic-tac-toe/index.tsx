import { CSSProperties, useMemo } from "react";
import Style from "./index.module.css";

interface CustomStyle extends CSSProperties {
  "--ticTacToe-item-width": string;
}

const config = {
  row: 3,
  column: 3,
};

const TicTacToe = () => {
  const itemWidth = (1 / config.row) * 100 + "%";
  const itemHeight = (1 / config.column) * 100 + "%";
  const containerStyle: CustomStyle = useMemo(() => {
    return {
      "--ticTacToe-item-width": itemWidth,
      "--ticTacToe-item-height": itemHeight,
    };
  }, [itemHeight, itemWidth]);
  const renderBoard = useMemo(() => {
    return Array(config.column * config.row).fill(
      <div className={Style.ticTacToe}></div>
    );
  }, []);

  const renderResult = useMemo(() => {
    return Array(config.column * config.row).fill(
      <div className={Style.ticTacToeRes} >1</div>
    );
  }, []);
  return (
    <div className={Style.container} style={containerStyle}>
      {renderBoard}
      <div className={Style.result}>{renderResult}</div>
    </div>
  );
};

export default TicTacToe;
