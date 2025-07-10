import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PremioService } from '../../services/premio.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PremioStatus } from '../../enums/premioStatus';
import { Categoria } from '../../enums/categoria.enum';

@Component({
  selector: 'app-criar',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './criar.component.html',
  styleUrl: './criar.component.css'
})
export class CriarComponent implements OnInit {

  form!: FormGroup;
  categoria!: Categoria | number;

  constructor(private PremioService: PremioService, private router : Router){}

  statusOption: {id: number, descricao: string}[] =[]
  categoriaOption: {id: number, descricao: string}[] =[]



  ngOnInit(): void {
   this.statusOption = Object.keys(PremioStatus)
    .filter(key=> isNaN(Number(key)))
    .map(key => ({
      id: PremioStatus [key as keyof typeof PremioStatus],
      descricao: key,
      status: this.statusOption,
      categoria: Categoria
    }));

    this.form = new FormGroup ({
      descricao: new FormControl('', [Validators.required]),
      ordemPremiacao: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    })
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

        this.PremioService.criar(payload).subscribe((response :any)=> {
          this.router.navigate(['/']);
        })
      }
}
