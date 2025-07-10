import { Categoria } from './../../enums/categoria.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PremioService } from '../../services/premio.service';
import { PremioStatus } from '../../enums/premioStatus';
import { Premio } from '../../interfaces/premio';

@Component({
  selector: 'app-editar',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {

    form!: FormGroup;
    idPremio!: number;

  constructor(private PremioService: PremioService, private router : Router, private route: ActivatedRoute){}

  statusOption: {id: number, descricao: string}[] =[]


  ngOnInit(): void {


    this.idPremio = this.route.snapshot.params['Id'];

    this.statusOption = Object.keys(PremioStatus)
    .filter(key=> isNaN(Number(key)))
    .map(key => ({
      id: PremioStatus [key as keyof typeof PremioStatus],
      descricao: key,
      categoria : Categoria,
      status: this.statusOption,
    }));

    this.form = new FormGroup ({
      descricao: new FormControl('', [Validators.required]),
      ordemPremiacao: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    })

    this.PremioService.buscar(this.idPremio).subscribe((response: Premio)=>{
      this.form.patchValue({
        descricao: response.descricao,
        ordemPremiacao: response.ordemPremiacao,
        categoria: response.categoria,
        status: response.status
      })
    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    const formValue =this.form.value;

    const payload ={
      ...formValue,
      status: Number(formValue.status)
    }

    this.PremioService.atualizar(this.idPremio, payload).subscribe((response:any) => {
      this.router.navigateByUrl('/');
    });
  }
}
