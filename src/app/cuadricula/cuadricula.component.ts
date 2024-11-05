import { Component } from '@angular/core';

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  adjacentMines: number;
}

@Component({
  selector: 'app-cuadricula',
  templateUrl: './cuadricula.component.html',
  styleUrls: ['./cuadricula.component.css']
})
export class CuadriculaComponent {  

  public grid: Cell[] = [];
  public gameOver: boolean = false;
  private totalCells: number = 100;
  private totalMines: number = 15;

  constructor() {
    this.initializeGrid();
    this.placeMines();
    this.calculateAdjacentMines();
  }

  initializeGrid(): void {
    
    this.grid = Array.from({ length: this.totalCells }, () => ({
      isMine: false,
      isRevealed: false,
      adjacentMines: 0,
    }));
  }

  placeMines(): void {
   
    let minesPlaced = 0;
    while (minesPlaced < this.totalMines) {
      const randomIndex = Math.floor(Math.random() * this.totalCells);
      if (!this.grid[randomIndex].isMine) {
        this.grid[randomIndex].isMine = true;
        minesPlaced++;
      }
    }
  }

  calculateAdjacentMines(): void {

    for (let i = 0; i < this.totalCells; i++) {
      if (!this.grid[i].isMine) {
        this.grid[i].adjacentMines = this.countAdjacentMines(i);
      }
    }
  }

  countAdjacentMines(index: number): number {
    const adjacentIndices = this.getAdjacentIndices(index);
    return adjacentIndices.reduce((count, i) => count + (this.grid[i].isMine ? 1 : 0), 0);
  }

  getAdjacentIndices(index: number): number[] {
    const row = Math.floor(index / 10);
    const col = index % 10;
    const adjacent = [];


    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10 && (i !== 0 || j !== 0)) {
          adjacent.push(newRow * 10 + newCol);
        }
      }
    }
    return adjacent;
  }

  revealCell(index: number): void {
    const cell = this.grid[index];
    if (cell.isRevealed || this.gameOver) return;

    cell.isRevealed = true;
    if (cell.isMine) {
      this.gameOver = true;
      alert('GAME OVER');
      return;
    }

    
    if (cell.adjacentMines === 0) {
      this.revealAdjacentCells(index);
    }
  }

  revealAdjacentCells(index: number): void {
    const toReveal = [index];
    const visited = new Set<number>();

    while (toReveal.length > 0) {
      const currentIndex = toReveal.pop();
      if (currentIndex === undefined || visited.has(currentIndex)) continue;
      visited.add(currentIndex);

      const cell = this.grid[currentIndex];
      cell.isRevealed = true;

      if (cell.adjacentMines === 0) {
        const adjacentIndices = this.getAdjacentIndices(currentIndex);
        adjacentIndices.forEach(adj => {
          if (!visited.has(adj) && !this.grid[adj].isMine) {
            toReveal.push(adj);
          }
        });
      }
    }
  }
}
