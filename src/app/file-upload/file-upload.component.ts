import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UploadImageService } from '../services/uploadImage.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  bDisplayFilesUploadSection: boolean = true;
  filesBufferArray: any = [];
  filesArray = [];
  nLenghtOfFilesArray: number;
  dParentFolder: string;
  bEnableFilesUploadSupport: boolean = true;
  bEnabledirectoryUploadSupport: boolean = false;
  closeResult: string;

  constructor(private oUploadImageService: UploadImageService, private datePipe: DatePipe, private modalService: NgbModal, private oRouter: Router) { }
  async ngOnInit(): Promise<void> { }

  FileUploadComponent_ToggleFileUploadType(event) 
  {
    const sFileUploadType = event.target.value;
    if (sFileUploadType === "file") 
    {
      this.bEnableFilesUploadSupport = true;
      this.bEnabledirectoryUploadSupport = false;
    }
    else 
    {
      this.bEnableFilesUploadSupport = false;
      this.bEnabledirectoryUploadSupport = true;
    }
    console.log("FileUploadComponent_ToggleFileUploadType : Upload Files ==> ", this.bEnableFilesUploadSupport);
    console.log("FileUploadComponent_ToggleFileUploadType : Upload Directory ==> ", this.bEnabledirectoryUploadSupport);
  }

  FileUploadComponent_DisplayFilesUploadProgressPopUp(fileUploadProgressPopUP: string) 
  {
    let ngbModalOptions: NgbModalOptions = 
    {
      backdrop: 'static',
      size: 'md',
      keyboard: false,
      centered: true,
      windowClass: "popup"
    };
    this.modalService.open(fileUploadProgressPopUP, ngbModalOptions).result.then((result) => 
    {
      console.log("Result ==> ", result);
      this.FileUploadComponent_ResetView();
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => 
    {
      this.closeResult = `Dismissed ${this.FileUploadComponent_GetDismissReason(reason)}`;
      this.FileUploadComponent_ResetView();
    });
  }

  FileUploadComponent_GetDismissReason(reason: ModalDismissReasons): string 
  {
    if (reason === ModalDismissReasons.ESC) 
    {
      return 'by pressing ESC';
    }
    else if (reason === ModalDismissReasons.BACKDROP_CLICK) 
    {
      return 'by clicking on a backdrop';
    }
    else 
    {
      return `with: ${reason}`;
    }
  }
  FileUploadComponent_ResetView() 
  {
    this.bDisplayFilesUploadSection = true;
    this.filesArray = [];
    this.filesBufferArray = [];
    this.bEnableFilesUploadSupport = true;
    this.bEnabledirectoryUploadSupport = false;
  }

  async FileUploadComponent_FileBrowseHandler(event, fileUploadProgressPopUP) 
  {
    let filesToUploadArray = event.target.files;
    console.log("FileUploadComponent_FileBrowseHandler : Files to upload ==> ", filesToUploadArray);
    this.bDisplayFilesUploadSection = false;
    this.nLenghtOfFilesArray = 0;
    //display upload progress popup
    this.FileUploadComponent_DisplayFilesUploadProgressPopUp(fileUploadProgressPopUP);
    //start reading and uploading the files
    for (let i = 0; i < filesToUploadArray.length; i++) 
    {
      let firsLetterOfFile = filesToUploadArray[i].name.charAt(0);
      if (firsLetterOfFile != '.') 
      {
        let file: any = {};
        file.name = filesToUploadArray[i].name;
        file.size = filesToUploadArray[i].size;
        file.type = filesToUploadArray[i].type;
        file.fullPath = undefined;
        this.filesArray.push(file);
        //read file as buffer
        const reader = new FileReader();
        reader.readAsArrayBuffer(filesToUploadArray[i]);
        reader.onload = () => 
        {
          this.filesBufferArray.push(reader.result);
          this.FileUploadComponent_GetSignedUrl(this.filesBufferArray[i], this.filesArray[i].fullPath,this.filesArray[i].name, this.filesArray[i].type, this.filesArray[i].size);
        };
      }
    }
  }
  async FileUploadComponent_GetSignedUrl(sFileBase64Url, sWebkitRelativePath, sFileName, sFileType, sFileSize) 
  {
    let sSubFolderPath;
    if (sWebkitRelativePath) 
    {
      sWebkitRelativePath = sWebkitRelativePath.substring(1);
      sSubFolderPath = sWebkitRelativePath.substr(0, sWebkitRelativePath.lastIndexOf("/") + 1);
    }
    else 
    {
      sWebkitRelativePath = "";
      sSubFolderPath = "";
    }
    let userId = await localStorage.getItem("userId");
    let sRetrieveSignedUrlBody =
    {
      "fileName": sFileName,
      "folderId": "-1",
      "contentType": sFileType,
      "method": "PUT",
      "folderName": "/users/" + userId + "/Home/_upload",
      "subFolder": sSubFolderPath,
    };
    console.log("UploadImageService_RetrieveSignedUrl: sRetrieveSignedUrlBody = ", sRetrieveSignedUrlBody);
    this.oUploadImageService.UploadImageService_RetrieveSignedUrl(sRetrieveSignedUrlBody).subscribe(oRetrieveSignedUrlResponse => 
      {
      console.log("UploadComponent_GetSignedUrl: UploadImageService_SaveFileObject Response =>", oRetrieveSignedUrlResponse);
      this.oUploadImageService.UploadImageService_UploadFileOnSignedUrl(sFileBase64Url, oRetrieveSignedUrlResponse.data.signedUrl).subscribe(oUploadFileOnSignedUrlResponse => 
      {
        console.log("UploadComponent_GetSignedUrl: UploadImageService_SaveFileObject Response =>", oUploadFileOnSignedUrlResponse);
        let sSaveFileObjectBody =
        {
          "className": "",
          "url": "#cloudstorage",
          "contentUrl": "#cloudstorage",
          "provider": "cloudstorage",
          "size": sFileSize,
          "_uniqueness_condition_": null,
          "fileName": sFileName,
          "folderId": "-1",
          "contentType": sFileType,
          "folderName": "/users/" + userId + "/Home/_upload",
          "subFolder": sSubFolderPath
        };
        this.oUploadImageService.UploadImageService_SaveFileObject(sSaveFileObjectBody).subscribe(async oSaveFileObjectResponse => 
        {
          console.log("UploadComponent_GetSignedUrl: UploadImageService_SaveFile Response =>", oSaveFileObjectResponse);
          this.nLenghtOfFilesArray++;
        });
      });
    });
  }

  FileUploadComponent_Logout() {
    localStorage.clear();
    this.oRouter.navigate(["/login"]);
  }
}
