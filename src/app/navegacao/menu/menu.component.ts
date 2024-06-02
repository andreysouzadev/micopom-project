import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { categoryService } from 'src/app/category.service';

export interface Categorias {
  id_categoria: number;
  no_categoria: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  categorias: Categorias[] = []

  constructor(private CategoryService: categoryService) {}

  ngOnInit() {
    this.CategoryService.getCategories().subscribe(
      (data: Categorias[]) => {
        console.log(data)
        this.categorias = data;
      },
      (error: any) => {
        console.error('Erro ao buscar categorias', error)
      }
    )

  }

  // export class MenuComponent {
  //   constructor(
  //     private router: Router
  //   ) {}
  //   @Input() categorias!: Categorias;
  
  //   }
}
