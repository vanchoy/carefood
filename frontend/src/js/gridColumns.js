import { grid_col_3bg, grid_col_4sm, grid_col_4bg, grid_col_6sm } from '../constants/styles';

const gridColumns = (data, gridColLayout, id) => {
  let grid_col, gridColumnsCopy = [], i = 0, gridColumnsId = 0;

  switch (gridColLayout) {
  case 1:
    grid_col = grid_col_4sm;         
    break;
  case 2:
    grid_col = grid_col_4bg;  
    break;
  case 3:
    grid_col = grid_col_6sm;  
    break;
  case 4:
    grid_col = grid_col_3bg;
    break;    
  default:
    grid_col = grid_col_4sm;
    break;
  };
    
  for (i; i < data.length; i++) {    
    if (gridColumnsId === grid_col.length) {
      gridColumnsId = 0;
    };
  
    gridColumnsCopy.push(gridColumnsId);
        
    gridColumnsId++;
  };

  return grid_col[gridColumnsCopy[id]];
}

export default gridColumns;