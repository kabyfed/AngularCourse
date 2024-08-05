import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Notify } from 'notiflix';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  isEditMode = false;
  recipeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: [''],
      timeCooking: ['', [Validators.required, Validators.min(1)]],
      foodValue: this.fb.group({
        calories: ['', Validators.min(0)],
        fats: ['', Validators.min(0)],
        carbohydrates: ['', Validators.min(0)],
        proteins: ['', Validators.min(0)]
      }),
      cookingSteps: this.fb.array([]),
      ingredients: this.fb.array([])
    });

    this.route.paramMap.subscribe(params => {
      this.recipeId = params.get('id');
      if (this.recipeId) {
        this.isEditMode = true;
        this.loadRecipe(this.recipeId);
      } else {
        this.addStep();
        this.addIngredient();
      }
    });
  }

  get cookingSteps(): FormArray {
    return this.recipeForm.get('cookingSteps') as FormArray;
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addStep() {
    this.cookingSteps.push(this.fb.group({
      action: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  removeStep(index: number) {
    this.cookingSteps.removeAt(index);
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  private loadRecipe(recipeId: string) {
    this.recipeService.getRecipe(recipeId).subscribe(recipe => {
      this.recipeForm.patchValue(recipe);

      this.setCookingSteps(recipe.cookingSteps);
      this.setIngredients(recipe.ingredients);
    });
  }

  private setCookingSteps(steps: any[]) {
    const cookingStepsArray = this.recipeForm.get('cookingSteps') as FormArray;
    steps.forEach(step => {
      cookingStepsArray.push(this.fb.group({
        action: [step.action, Validators.required],
        description: [step.description, Validators.required]
      }));
    });
  }

  private setIngredients(ingredients: any[]) {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    ingredients.forEach(ingredient => {
      ingredientsArray.push(this.fb.group({
        title: [ingredient.title, Validators.required],
        description: [ingredient.description, Validators.required]
      }));
    });
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      Notify.warning('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    if (this.isEditMode && this.recipeId) {
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value).subscribe({
        next: () => {
          Notify.success('Рецепт успешно обновлен!');
          this.router.navigate(['/admin/recipes']);
        }
      });
    } else {
      this.recipeService.createRecipe(this.recipeForm.value).subscribe({
        next: () => {
          Notify.success('Рецепт успешно отправлен!');
          this.resetForm();
        },
      });
    }
  }

  resetForm() {
    this.recipeForm.reset();
    this.cookingSteps.clear();
    this.ingredients.clear();
    this.addStep();
    this.addIngredient();
  }
}
