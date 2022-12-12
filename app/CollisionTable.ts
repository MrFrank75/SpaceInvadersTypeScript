
class CollisionTable {
    private table: HTMLTableElement;
    private _rows : number;
    private _columns : number;

    constructor(outerspace: HTMLDivElement, rows : number, columns : number) {
        this.table = outerspace.ownerDocument.createElement('table');
        this.table.className = 'collisionMatrix';

        this._rows = rows;
        this._columns = columns;
        outerspace.appendChild(this.table);
    }

    generateTable(){
        for (let row = 0; row < this._rows; row++) {
            var hrow = <HTMLTableRowElement> this.table.insertRow();
            let cellStyleA : string = 'collisionMatrixCellA';
            let cellStyleB : string = 'collisionMatrixCellB';
            if (row%2==1)
                {
                    cellStyleA = 'collisionMatrixCellB';
                    cellStyleB = 'collisionMatrixCellA';
                }

            for (let column = 0; column < this._columns; column++) {
                var cell = hrow.insertCell();

                if (column%2==1)
                    cell.className = cellStyleA;
                else
                    cell.className = cellStyleB;
                cell.innerHTML = "&nbsp;";
            }
        }
    }

    highlight(row:number, column:number){
        let htmlCells = this.table.rows[row];
        let singleCell = htmlCells.cells[column];
        singleCell.className = 'collisionMatrixHighlight'
    }
  }