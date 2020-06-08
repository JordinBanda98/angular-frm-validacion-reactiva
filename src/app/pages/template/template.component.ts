import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  nombre: string;
  persona = {
    nombre: '',
    apellido: '',
    correo: '',
    cliente: '',
    vacaciones: false
  };
  clientes: string[] = ['Claro', 'Entel', 'BCP', 'BBVA', 'interbank'];
  constructor() { }

  ngOnInit(): void {
  }
  enviarDatos(formulario : NgForm){
    if (formulario.form.invalid){
       console.log('El formulario es invalido');
       return;
    } else {
      console.log('El formulario es valido');
    }
    console.log(formulario);
  }
}
