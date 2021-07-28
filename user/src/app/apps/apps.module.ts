import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FeatherModule } from 'angular-feather';
import { AppsRoutes } from './apps.routing';
// rxjs
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CountdownModule } from 'ngx-countdown';
import { NgxTimerModule } from 'ngx-timer';
import { AngularResizedEventModule } from 'angular-resize-event';
import { DicomViewerModule } from 'ng-dicomviewer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DocumentsUploadComponent } from './documents-upload/documents-upload.component';

@NgModule({
    imports: [
        CommonModule,
        CountdownModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgbModalModule,
        NgxTimerModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        QuillModule.forRoot(),
        RouterModule.forChild(AppsRoutes),
        PerfectScrollbarModule,
        Ng2SearchPipeModule,
        DragDropModule,
        FlatpickrModule.forRoot(),
        HttpClientModule,
        FeatherModule,
        AutocompleteLibModule,
        NgxDatatableModule,
        BsDatepickerModule.forRoot(),
        AngularResizedEventModule,
        MatProgressSpinnerModule,
        DicomViewerModule

    ],
    declarations: [
        DocumentsUploadComponent,
        
    ],
    providers: [
        DatePipe,
        DecimalPipe,
    ]
})
export class AppsModule { }
