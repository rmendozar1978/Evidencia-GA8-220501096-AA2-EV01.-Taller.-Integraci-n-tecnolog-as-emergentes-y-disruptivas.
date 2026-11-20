import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';
import { Empleado } from '../../models/empleado';

declare var M: any;

@Component({
    selector: 'app-empleados',
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.css'],
    providers: [EmpleadoService]
})
export class EmpleadosComponent implements OnInit {

    constructor(public empleadoService: EmpleadoService) { }

    ngOnInit(): void {
        this.getEmpleados();
    }

    getEmpleados() {
        this.empleadoService.getEmpleados().subscribe(res => {
            this.empleadoService.empleados = res as Empleado[];
        });
    }

    agregarEmpleado(form?: NgForm) {
        if (form?.value._id) {
            this.empleadoService.putEmpleado(form.value)
                .subscribe(res => {
                    this.resetForm(form);
                    M.toast({ html: 'Empleado Actualizado' });
                    this.getEmpleados();
                });
        } else {
            this.empleadoService.postEmpleado(form?.value)
                .subscribe(res => {
                    this.resetForm(form);
                    M.toast({ html: 'Guardado satisfactoriamente' });
                    this.getEmpleados();
                });
        }
    }

    editarEmpleado(empleado: Empleado) {
        this.empleadoService.selectedEmpleado = Object.assign({}, empleado);
    }

    eliminarEmpleado(_id: string) {
        if (confirm('¿Está seguro de eliminar este registro de empleado?')) {
            this.empleadoService.deleteEmpleado(_id)
                .subscribe(res => {
                    this.getEmpleados();
                    M.toast({ html: 'Empleado Eliminado' });
                });
        }
    }

    resetForm(form?: NgForm) {
        if (form) {
            form.reset();
            this.empleadoService.selectedEmpleado = new Empleado();
        }
    }
}
