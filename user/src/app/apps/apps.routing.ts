import { Routes } from '@angular/router';
import { DocumentsUploadComponent } from './documents-upload/documents-upload.component';
export const AppsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'documents-upload',
                component: DocumentsUploadComponent,
                data: {
                    title: '',
                    urls: [

                    ]
                }
            },
            {
                path: '',
                redirectTo: 'documents-upload',
                pathMatch: 'full'
            }
        ]
    }
];
