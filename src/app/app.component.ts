import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    projectForm: FormGroup;
    statuses: Array<string> = ['Stable', 'Finished', 'Critical'];
    deprecatedProjectNames: Array<string> = ['test'];

    ngOnInit(): void {
        this.projectForm = new FormGroup({
            'projectData': new FormGroup({
                // // Non-async project name validator.
                // 'name': new FormControl(
                //     null,
                //     [Validators.required, this.validateProjectName.bind(this)]),
                'name': new FormControl(
                    null,
                    [Validators.required],
                    [this.validateProjectNameAsync]),
                'email': new FormControl(null, [Validators.required, Validators.email]),
                'status': new FormControl('Finished', [Validators.required]),
            }),
        });
    }

    onSubmit(): void {
        console.log(this.projectForm.value);
    }

    validateProjectName(control: FormControl): { [str: string]: boolean } {
        if (this.deprecatedProjectNames.indexOf(String(control.value).toLowerCase()) !== -1) {
            return { 'deprecatedProjectName': true };
        }
        return null;
    }

    validateProjectNameAsync(control: FormControl): Promise<any> | Observable<any> {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (String(control.value).toLowerCase() === 'test') {
                    resolve({ 'deprecatedProjectName': true });
                } else {
                    resolve(null);
                }
            }, 100);
        });
    }
}
