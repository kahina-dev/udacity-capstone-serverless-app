import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.scss']
})
export class NewImageComponent implements OnInit {

  fileName = '';
  file: File;

  constructor(private recipeService: RecipeService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any) {

        const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            this.file=file;

        }
      }

      onUplodFile(){
        const id = this.route.snapshot.params['id'];
        let url: string;
        this.recipeService.getUploadUrl(id).subscribe(
          (response) => {
            this.recipeService.uploadFile(response.uploadUrl, this.file);
            this.router.navigate(['/recipes']);
          },
          (error) => {
            console.error(
              `Backend returned code ${error.status}, body was: `, error.error);
          }
        );
      }
    }

