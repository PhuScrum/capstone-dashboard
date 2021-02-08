import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe.component';
@NgModule({
    declarations: [
        SafePipe
    ],
    exports: [
        SafePipe
    ]
})
export class SafePipeModule {
}
