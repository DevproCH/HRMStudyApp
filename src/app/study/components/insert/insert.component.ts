import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DataManagerService } from './../../../core/services/data-manager.service';
import { VocabularyTrainer } from './../../../core/models/vocabulary-trainer';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertifyService } from './../../../core/services/alertify.service';
import { InsertFormData } from '../../models/insert-form-data';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent implements AfterViewInit {
  constructor(private dataService: DataManagerService,
    private fb: UntypedFormBuilder,
    private alertify: AlertifyService) {
    this.vocabularyData = dataService.getVocabularyData();

    this.setFormData();

    this.dataSource = new MatTableDataSource(this.insertFormData);

    this.updateLanguageForm = this.fb.group({
      language1: ['', Validators.required],
      language2: ['', Validators.required]
    });


    this.updateLanguageForm.patchValue({language1: this.vocabularyData.language1Name});
    this.updateLanguageForm.patchValue({language2: this.vocabularyData.language2Name});
  }

  dataSource: MatTableDataSource<InsertFormData> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'language1':
          return item.word1;
        case 'language2':
          return item.word2;
        default:
          return 0;
      }
    };
  }

  vocabularyData: VocabularyTrainer;
  updateLanguageForm: UntypedFormGroup;
  displayedColumns: string[] = ['language1', 'language2','options'];
  insertFormData: InsertFormData[] = [];
  insertForm = new FormGroup({
    word1: new FormControl('', Validators.required),
    word2: new FormControl('', Validators.required)
  });

  editForm = new FormGroup({
    word1: new FormControl('', Validators.required),
    word2: new FormControl('', Validators.required)
  });


  /*
    Called when the user submits the form. This functions creates a new word pair and saves it. It uses the values from the insertForm
  */
  insertPair() : void {
    if (this.insertForm.value.word1 === "") {
      this.alertify.error("The first field may not be empty");
      return;
    }
    if (this.insertForm.value.word2 === "") {
      this.alertify.error("The second field may not be empty");
      return;
    }

    let id = this.vocabularyData.insertWordPair(this.insertForm.value.word1 ?? "", this.insertForm.value.word2 ?? "");
    this.insertFormData.push({
      word1: this.insertForm.value.word1 ?? "",
      word2: this.insertForm.value.word2 ?? "",
      id: id,
      modification: false
    });
    this.dataService.setVocabularyData(this.vocabularyData);
    this.dataSource.data = this.insertFormData;
    this.insertForm.reset();
    this.alertify.success("Added new Word");

  }

  /*
    This function changes the names of the languages. It uses the values from the updateLangaugeForm
  */
  updateLanguage() : void {
    if (this.vocabularyData.setLanguageNames(this.updateLanguageForm.value.language1, this.updateLanguageForm.value.language2)) {
      this.alertify.success("Changed Language");
      this.dataService.setVocabularyData(this.vocabularyData);
    }
    else {
      this.alertify.error("Could not change the language");
    }
  }

  /*
    This function changes the words of a word pair.
  */
  saveWord(element: InsertFormData) : void {
    if (element.word1 === "") {
      this.alertify.error("The first field may not be empty");
      return;
    }
    if (element.word2 === "") {
      this.alertify.error("The second field may not be empty");
      return;
    }
    this.vocabularyData.editWordPair(element.id, element.word1, element.word2);
    this.alertify.success("Data has been updated")
    this.saveAndLoad();
  }


  /*
    This functions switches the mode of a row.
  */
  toggleDetails(element: InsertFormData) : void {
    //Deactivate all rows
    this.dataSource.data.forEach(d => {
      d.modification = false;
    });


    // Activate one row
    this.dataSource.data.forEach(d => {
      if (d.id == element.id) {
        d.modification = true;
      }
    });
  }

  /*
    This function deletes the word with the given id
  */
  deleteWord(id: string) : void {
    this.vocabularyData.deleteWordPair(id);
    this.alertify.success("Data has been deleted")
    this.saveAndLoad();
  }

  /*
    This function saves the vocabularyData in the local storrage and updates the table
  */
  private saveAndLoad() : void {
    this.dataService.setVocabularyData(this.vocabularyData);
    this.setFormData();
    this.dataSource.data = this.insertFormData;
  }


  /*
    Sets the value of the insert form
  */
  private setFormData() : void {
    this.insertFormData = [];
    this.vocabularyData.wordPairs.forEach(e => {
      this.insertFormData.push({
        word1: e.word1,
        word2: e.word2,
        id: e.id,
        modification: false
      });
    });
  }
}
