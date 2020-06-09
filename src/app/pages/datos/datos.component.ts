import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormArray } from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {
  forma : FormGroup;
  clientes : string[] = ['Claro','Entel','BCP','BBVA','Interbank'];
  rangos : string[] = ['administrador','usuario'];
  constructor() { 
    this.forma = new FormGroup({
      nombreCompleto : new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(4), this.noJordin]),
        apellido: new FormControl('', [Validators.required, Validators.minLength(3)])
      }),
      usuario: new FormControl('', [Validators.required], this.existe),
      pass : new FormControl('',Validators.required),
      pass2 : new FormControl('',[Validators.required]),
      cliente : new FormControl('',Validators.required),
      rango : new  FormControl('',[Validators.required,this.noUsuario]),
      foto: new FormControl('', [Validators.required], this.permitido),
      vacaciones : new FormControl(false,Validators.required),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      intereses: new FormArray([
        new FormControl('', Validators.required)
      ])
    });

    this.forma.controls.pass2.setValidators([
      Validators.required,
      this.noIgual.bind(this.forma) // this.forma = this
    ]);
  }

  ngOnInit(): void {
  }
  guardar(){
    console.log(this.forma);
  }
  agregarIntereses(){
    const intereses = this.forma.controls.intereses as FormArray;
    intereses.push(new FormControl('',Validators.required));
  }

  noJordin(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Jordin') {
      return { noJordin: true };
    }
  }

  noIgual(control: FormControl): {[s: string] : boolean}{
    const forma : any = this; // this = this.form
    if (control.value !== forma.controls.pass.value) {
      return {noIgual : true};
    }
  }

  noUsuario(control : FormControl): {[s : string] : boolean}{
    if (control.value === 'usuario') {
      return{ noUsuario : true}
    }
  }

  existe(control: FormControl): Promise<any> | Observable<any> {
    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'jordin') {
            resolve({ existe: true });
          } else {
            resolve(null);
          }
        }, 3000);
      }
    );
    return promesa;
  }
  

  permitido(control : FormControl) : Promise<any> | Observable<any>{
    const promesa_file = new Promise(
      (resolve,reject) => {
        setTimeout(() => {
          const file = control.value;
          if (file) {
            console.log(file)
            var extension = file.substring(file.lastIndexOf('.') + 1).toLowerCase();
            console.log(extension)
            if (extension != 'png' || extension != 'jpg') {
              resolve({ permitido: true })
            } else {
              resolve(null);
            }
          }
        },3000)
      }
    );
    return promesa_file;
  }
}
