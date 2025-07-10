import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Premio } from '../../interfaces/premio';
import { PremioService } from '../../services/premio.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-principal',
  imports: [MatTableModule, RouterModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit{
  Premios = new MatTableDataSource<Premio>();

  displayedColumns: string[] = ['id','descricao', 'ordemPremiacao', 'categoria', 'status'];


  constructor(private premioService: PremioService){ }

  ngOnInit(): void {
    this.obterPremios();
  }

  obterPremios(){
    this.premioService.getAll().subscribe(response => {
      this.Premios.data = response;
      console.log(response)
    });
  }
  apagarPremio(idPremio: number){
    this.premioService.apagar(idPremio).subscribe(res => {
      console.log(res);
    });
  }


}
