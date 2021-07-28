import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/DataService';
import { UploadImageService } from '../services/uploadImage.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  bDisplayFilesUploadSection : boolean = true;
  newArray: any = [];
  filesArray = [];
  nLenghtOfFilesArray: number;
  dParentFolder: string;
  bEnableFilesUploadSupport : boolean = true;
  bEnabledirectoryUploadSupport : boolean = false;
  closeResult: string;

  constructor(private oUploadImageService: UploadImageService,private dataService: DataService,private datePipe: DatePipe,private modalService: NgbModal, private oRouter : Router) {}
  async ngOnInit(): Promise<void> {}

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
    console.log("FileUploadComponent_ToggleFileUploadType : Upload Files ==> ",this.bEnableFilesUploadSupport);
    console.log("FileUploadComponent_ToggleFileUploadType : Upload Directory ==> ",this.bEnabledirectoryUploadSupport);
  }
 
  FileUploadComponent_DisplayFilesUploadProgressPopUp(fileUploadProgressPopUP: string) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      size : 'md',
      keyboard : false,
      centered: true,
      windowClass : "popup"
  };
    this.modalService.open(fileUploadProgressPopUP, ngbModalOptions).result.then((result) => 
    {
      console.log("Result ==> ",result);
      this.FileUploadComponent_ResetView();
      this.closeResult = `Closed with: ${result}`;
    }, 
    (reason) => 
    {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.FileUploadComponent_ResetView();
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string 
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
    this.newArray = [];
    this.bEnableFilesUploadSupport=true;
    this.bEnabledirectoryUploadSupport=false;
  }

  FileUploadComponent_FileBrowseHandler(event,fileUploadProgressPopUP) 
  {
    let filesToUploadArray = event.target.files;
    console.log("FileUploadComponent_FileBrowseHandler : Files to upload ==> ",filesToUploadArray);
    for (let i = 0; i < filesToUploadArray.length; i++) 
      {
        let firsLetterOfFile = filesToUploadArray[i].name.charAt(0);
        if (firsLetterOfFile != '.') {
          this.filesArray.push(filesToUploadArray[i]);
          const reader = new FileReader();
          reader.readAsArrayBuffer(filesToUploadArray[i]);
          reader.onload = () => 
          {
            this.newArray.push(reader.result);
          };
        }
      }
    this.FileUploadComponent_UploadFiles(fileUploadProgressPopUP);
  }
  
  async FileUploadComponent_UploadFiles(fileUploadProgressPopUP) 
  {
      this.bDisplayFilesUploadSection = false;
      this.nLenghtOfFilesArray = 0;
      let dateTime = new Date();
      this.dParentFolder = this.datePipe.transform(dateTime, 'YYYYmmdd-HHmmss')
      this.dParentFolder = 'DCM' + this.dParentFolder;
      this.callRequests();
      //display upload progress pop up
      this.FileUploadComponent_DisplayFilesUploadProgressPopUp(fileUploadProgressPopUP);
  }

  callRequests() 
  {
      this.FileUploadComponent_GetSignedUrl(this.newArray[this.nLenghtOfFilesArray], this.filesArray[this.nLenghtOfFilesArray].fullPath, this.nLenghtOfFilesArray, this.filesArray[this.nLenghtOfFilesArray].name, this.filesArray[this.nLenghtOfFilesArray].type, this.filesArray[this.nLenghtOfFilesArray].size).then(async (value) => {
        console.log('FileUploadComponent_GetSignedUrl : Final Responce =====> ', value);
      if(value) 
      {
        this.nLenghtOfFilesArray++;
        if (this.nLenghtOfFilesArray < this.filesArray.length) 
        {
          this.callRequests();
        } 
        else 
        {
          let userName = await localStorage.getItem("username");
          this.dataService.DataService_SendFolderName({ "uploadFolder": "/users/" + userName + "/Home/_upload/" + this.dParentFolder }).subscribe((result: any) => 
          {
          console.log('DataService_SendFolderName : ==> ', result);
          });
        }
      }
       // expected output: "Success!"
    });
  }
  async FileUploadComponent_GetSignedUrl(sFileBase64Url, sWebkitRelativePath, nFileIndex, sFileName, sFileType, sFileSize): Promise<any> 
  {
    var promise = new Promise(async (resolve, reject) => 
    {
      let sSubFolderPath = '';
      if (sWebkitRelativePath) 
      {
        sSubFolderPath = sWebkitRelativePath;
        sSubFolderPath = sSubFolderPath.substring(1);
      }
      sSubFolderPath = this.dParentFolder + '/' + sSubFolderPath
      console.log("UploadComponent_GetSignedUrl: FileSize = ", sFileSize);
      let userName = await localStorage.getItem("username");
  
      let sRetrieveSignedUrlBody =
      {
        "fileName": sFileName,
        "folderId": "-1",
        "contentType": sFileType,
        "method": "PUT",
        "folderName": "/users/" + userName + "/Home/_upload",
        "subFolder": sSubFolderPath,
      };
      console.log("Retrieve signed url body ==> ",sRetrieveSignedUrlBody);
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
            "folderName": "/users/" + userName + "/Home/_upload",
            "subFolder": sSubFolderPath,
          };
          this.oUploadImageService.UploadImageService_SaveFileObject(sSaveFileObjectBody).subscribe(async oSaveFileObjectResponse => 
          {
            console.log("UploadComponent_GetSignedUrl: UploadImageService_SaveFile Response =>", oSaveFileObjectResponse);
            return resolve(true);
          });
        });
      });
    }).then((value) => 
    {
      return Promise.resolve(true);
    });
    return promise;
  }
  FileUploadComponent_Logout()
  {
    localStorage.clear();
    this.oRouter.navigate(["/login"]);
  }
}
